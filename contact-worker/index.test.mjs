import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from './index.mjs';

const valid = {
  topic: 'その他',
  organization: 'テスト株式会社',
  name: 'テスト担当者',
  email: 'sender@example.com',
  phone: '',
  message: 'フォーム検証用の日本語\n改行あり',
  consent: true,
  website: '',
  requestId: '11111111-1111-4111-8111-111111111111',
};
const env = {
  RESEND_API_KEY: 'test-only-not-a-real-key',
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};
function request(body = valid, origin = 'https://yottabyte.jp', method = 'POST') {
  return new Request('https://worker.example/contact', {
    method,
    headers: {
      Origin: origin,
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '192.0.2.1',
    },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}
const neverSend = async () => {
  throw new Error('Must not call Resend');
};
test('only the corporate or explicitly configured Resend test sender is allowed', async () => {
  const denied = await handleRequest(
    request(),
    { ...env, RESEND_FROM: 'other@example.com' },
    neverSend,
  );
  assert.equal(denied.status, 503);
  let from;
  const accepted = await handleRequest(
    request(),
    { ...env, RESEND_FROM: 'onboarding@resend.dev' },
    async (_url, options) => {
      from = JSON.parse(options.body).from;
      return Response.json({ id: 'mock-test-id' });
    },
  );
  assert.equal(accepted.status, 200);
  assert.equal(from, 'YottaByte お問い合わせ <onboarding@resend.dev>');
});

test('notification has a fixed recipient, visitor Reply-To and a retry-safe key', async () => {
  let sent;
  const response = await handleRequest(
    request({ ...valid, to: ['attacker@example.com'], from: 'attacker@example.com' }),
    env,
    async (url, options) => {
      sent = { url, options, body: JSON.parse(options.body) };
      return Response.json({ id: 'mock-email-id' });
    },
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, id: 'mock-email-id' });
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.deepEqual(sent.body.to, ['contact@yottabyte.jp']);
  assert.equal(sent.body.from, 'YottaByte お問い合わせ <contact@mail.yottabyte.jp>');
  assert.equal(sent.body.reply_to, valid.email);
  assert.ok(sent.body.text.includes(valid.message));
  assert.equal(sent.options.headers['Idempotency-Key'], `yottabyte-contact/${valid.requestId}`);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://yottabyte.jp');
});
test('unapproved origins cannot use the form or receive permissive CORS headers', async () => {
  const response = await handleRequest(request(valid, 'https://attacker.example'), env, neverSend);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
});
test('allowed preflight does not call Resend', async () => {
  const response = await handleRequest(
    request(valid, 'https://yottabyte.jp', 'OPTIONS'),
    {},
    neverSend,
  );
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Methods'), 'POST, OPTIONS');
});
test('missing secrets or the limiter fail closed', async () => {
  assert.equal((await handleRequest(request(), {}, neverSend)).status, 503);
  assert.equal((await handleRequest(request(), { RESEND_API_KEY: 'test' }, neverSend)).status, 503);
});
test('invalid data, missing consent, honeypot and header injection never send', async () => {
  for (const changes of [
    { consent: false },
    { email: 'fake\nBcc:attacker@example.com' },
    { message: '' },
    { organization: 'a'.repeat(121) },
    { website: 'bot' },
    { requestId: '' },
    { phone: {} },
  ]) {
    assert.equal(
      (await handleRequest(request({ ...valid, ...changes }), env, neverSend)).status,
      400,
    );
  }
});
test('oversized input is rejected without an email', async () => {
  assert.equal(
    (await handleRequest(request({ ...valid, message: 'a'.repeat(22000) }), env, neverSend)).status,
    413,
  );
});
test('rate limit rejects requests before sending', async () => {
  const response = await handleRequest(
    request(),
    { ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } },
    neverSend,
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
});
test('Resend rejection and uncertain response are errors, never false success', async () => {
  for (const send of [
    async () => Response.json({ message: 'bad secret' }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new Error('timeout');
    },
  ]) {
    const response = await handleRequest(request(), env, send);
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, undefined);
    assert.equal(JSON.stringify(body).includes(env.RESEND_API_KEY), false);
  }
});
