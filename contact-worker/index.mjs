const topics = new Set([
  'システム開発・業務改善について',
  'AI・技術設計について',
  '協業について',
  'その他',
]);
const recipient = 'contact@yottabyte.jp';
const maxBytes = 20000;

function reply(status, data, origin, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      Vary: 'Origin',
      ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}),
      ...extraHeaders,
    },
  });
}

function field(data, name, max, required = true) {
  if (!required && data[name] == null) return '';
  if (typeof data[name] !== 'string') return null;
  const value = data[name].trim();
  if (
    (required && !value) ||
    value.length > max ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)
  )
    return null;
  return value;
}

export async function handleRequest(request, env, send = fetch) {
  const url = new URL(request.url);
  const allowedOrigins = (env.ALLOWED_ORIGINS || 'https://yottabyte.jp,https://www.yottabyte.jp')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const origin = request.headers.get('Origin');
  if (!origin || !allowedOrigins.includes(origin))
    return reply(403, { error: '送信元を確認できませんでした。' });
  if (url.pathname !== '/contact') return reply(404, { error: 'ページが見つかりません。' }, origin);
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '600',
        Vary: 'Origin',
      },
    });
  }
  if (request.method !== 'POST')
    return reply(405, { error: '送信方法を確認してください。' }, origin, {
      Allow: 'POST, OPTIONS',
    });
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return reply(415, { error: '入力内容を確認してください。' }, origin);
  }
  if (!env.RESEND_API_KEY || !env.CONTACT_RATE_LIMITER) {
    return reply(
      503,
      { error: '現在フォームをご利用いただけません。メールでご連絡ください。' },
      origin,
    );
  }
  const sender = env.RESEND_FROM || 'contact@mail.yottabyte.jp';
  if (!['contact@mail.yottabyte.jp', 'onboarding@resend.dev'].includes(sender)) {
    return reply(
      503,
      { error: '現在フォームをご利用いただけません。メールでご連絡ください。' },
      origin,
    );
  }
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip) return reply(403, { error: '送信元を確認できませんでした。' }, origin);
  const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: `contact:${ip}` });
  if (!success)
    return reply(
      429,
      { error: '送信が集中しています。少し時間をおいてからお試しください。' },
      origin,
      { 'Retry-After': '60' },
    );
  if (Number(request.headers.get('Content-Length')) > maxBytes)
    return reply(413, { error: '入力内容が長すぎます。' }, origin);
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: '入力内容を確認してください。' }, origin);
    const chunks = [];
    let bytes = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        return reply(413, { error: '入力内容が長すぎます。' }, origin);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    data = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return reply(400, { error: '入力内容を確認してください。' }, origin);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data))
    return reply(400, { error: '入力内容を確認してください。' }, origin);
  if (data.website) return reply(400, { error: '入力内容を確認してください。' }, origin);
  const organization = field(data, 'organization', 120);
  const name = field(data, 'name', 80);
  const email = field(data, 'email', 160);
  const phone = field(data, 'phone', 40, false);
  const message = field(data, 'message', 3000);
  const topic = field(data, 'topic', 80);
  const requestId = field(data, 'requestId', 36);
  if (
    !organization ||
    !name ||
    !email ||
    phone === null ||
    !message ||
    !topics.has(topic) ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    data.consent !== true ||
    !requestId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)
  ) {
    return reply(
      400,
      { error: '必須項目、メールアドレス、同意の内容を確認してください。' },
      origin,
    );
  }
  const text = `ホームページからのお問い合わせ\n\nご相談内容：${topic}\n法人名・団体名：${organization}\nお名前：${name}\nメールアドレス：${email}\n電話番号：${phone || '未記入'}\n\nお問い合わせ詳細\n${message}`;
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `yottabyte-contact/${requestId}`,
      },
      body: JSON.stringify({
        from: `YottaByte お問い合わせ <${sender}>`,
        to: [recipient],
        reply_to: email,
        subject: `【YottaByte】${topic}`,
        text,
      }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== 'string' || !result.id) {
      return reply(
        502,
        {
          error:
            '送信を完了できませんでした。入力内容は残っています。時間をおいて再度お試しください。',
        },
        origin,
      );
    }
    return reply(200, { ok: true, id: result.id }, origin);
  } catch {
    return reply(
      502,
      { error: '送信結果を確認できませんでした。入力内容を変えずに再度お試しください。' },
      origin,
    );
  }
}

const worker = {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
export default worker;
