import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { createAnalyticsScript, trackContactSubmission } from '../app/_lib/analytics.ts';

function browser(hostname) {
  const tags = [];
  const window = { location: { hostname } };
  const document = {
    createElement: () => ({}),
    head: { appendChild: (tag) => tags.push(tag) },
  };
  return { window, document, tags };
}

test('preview hosts do not load the tag or queue analytics', () => {
  const context = browser('localhost');
  vm.runInNewContext(createAnalyticsScript('G-TESTONLY00'), context);
  assert.equal(context.tags.length, 0);
  assert.equal(context.window.dataLayer, undefined);
});

test('production queues config before loading the correct tag with advertising disabled', () => {
  const context = browser('yottabyte.jp');
  vm.runInNewContext(createAnalyticsScript('G-TESTONLY00'), context);
  const events = context.window.dataLayer.map((event) => Array.from(event));
  assert.equal(events[0][0], 'js');
  assert.equal(events[1][0], 'config');
  assert.equal(events[1][1], 'G-TESTONLY00');
  assert.equal(events[1][2].allow_google_signals, false);
  assert.equal(events[1][2].allow_ad_personalization_signals, false);
  assert.equal(context.tags[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TESTONLY00');
  assert.equal(context.tags[0].async, true);
  assert.equal(createAnalyticsScript('G-"</script>'), '');
});

test('inquiry metrics carry no form data and unavailable analytics never disrupt inquiries', () => {
  const calls = [];
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { location: { hostname: 'yottabyte.jp' }, gtag: (...args) => calls.push(args) },
  });
  try {
    trackContactSubmission({ email: 'private@example.test', message: 'private inquiry' });
    assert.deepEqual(calls, [['event', 'generate_lead', { form_id: 'contact' }]]);
    window.gtag = () => {
      throw new Error('analytics blocked');
    };
    assert.doesNotThrow(() => trackContactSubmission());
    delete window.gtag;
    assert.doesNotThrow(() => trackContactSubmission());
    window.location.hostname = 'localhost';
    window.gtag = (...args) => calls.push(args);
    trackContactSubmission();
    assert.equal(calls.length, 1);
  } finally {
    delete globalThis.window;
  }
});
