import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const html = readFileSync(
  new URL('../public/integrations/wordpress-authorization.html', import.meta.url),
  'utf8',
);
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

test('credential helper is self-contained, noindex, and denies network/form submissions', () => {
  const hash = createHash('sha256').update(script).digest('base64');
  assert.ok(html.includes(`script-src 'sha256-${hash}'`));
  assert.ok(html.includes("connect-src 'none'"));
  assert.ok(html.includes("form-action 'none'"));
  assert.ok(html.includes('content="noindex,nofollow"'));
  assert.doesNotMatch(html, /<(?:script|link|iframe|img)[^>]+(?:src|href)=/i);
  assert.doesNotMatch(
    script,
    /localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest|console\./,
  );
});

test('only an explicit user action copies a valid Basic header; raw input and page state can be cleared', async () => {
  const elements = new Map();
  const windowEvents = {};
  const clipboard = [];
  for (const id of ['app-password', 'authorization', 'copy', 'status', 'converter', 'clear']) {
    elements.set('#' + id, {
      value: '',
      textContent: '',
      disabled: true,
      events: {},
      addEventListener(name, fn) {
        this.events[name] = fn;
      },
    });
  }
  runInNewContext(script, {
    document: { querySelector: (selector) => elements.get(selector) },
    window: {
      addEventListener: (name, fn) => {
        windowEvents[name] = fn;
      },
    },
    navigator: {
      clipboard: {
        writeText: async (text) => {
          clipboard.push(text);
        },
      },
    },
    btoa: (text) => Buffer.from(text, 'binary').toString('base64'),
  });
  const input = elements.get('#app-password');
  const output = elements.get('#authorization');
  const submit = elements.get('#converter').events.submit;
  let prevented = false;
  input.value = 'not-an-application-password';
  submit({
    preventDefault: () => {
      prevented = true;
    },
  });
  assert.ok(prevented);
  assert.equal(output.value, '');
  assert.equal(clipboard.length, 0);
  // Fixed disposable fixture, never a real credential.
  input.value = 'aaaa bbbb cccc dddd eeee ffff';
  submit({ preventDefault() {} });
  assert.equal(
    Buffer.from(output.value.slice(6), 'base64').toString(),
    'muse_publisher:aaaabbbbccccddddeeeeffff',
  );
  assert.equal(input.value, '');
  assert.equal(clipboard.length, 0);
  await elements.get('#copy').events.click();
  assert.equal(clipboard.length, 1);
  assert.equal(clipboard[0], output.value);
  elements.get('#clear').events.click();
  assert.equal(output.value, '');
  assert.equal(elements.get('#copy').disabled, true);
  input.value = 'aaaa bbbb cccc dddd eeee ffff';
  submit({ preventDefault() {} });
  windowEvents.pagehide();
  assert.equal(input.value, '');
  assert.equal(output.value, '');
});
