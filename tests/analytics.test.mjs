import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {
  createAnalyticsScript,
  trackContactSubmission,
  trackContactEvent,
  createContactTracker,
  safeContactEntryPage,
  readContactEntryPage,
} from '../app/_lib/analytics.ts';

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

function withAnalytics(run) {
  const calls = [];
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { hostname: 'yottabyte.jp', origin: 'https://yottabyte.jp' },
      gtag: (...args) => calls.push(args),
    },
  });
  try {
    run(calls);
  } finally {
    delete globalThis.window;
  }
}

test('form journey records ordered stages, deduplicates one-time stages and never counts a successful form as a leave', () => {
  withAnalytics((calls) => {
    const form = createContactTracker({
      contact_topic: 'website',
      form_entry_page: '/blog/example/',
    });
    form.view();
    form.view();
    form.start();
    form.start();
    form.field('email');
    form.field('email');
    form.invalid('email', 'format');
    form.invalid('email', 'format');
    form.submit();
    form.error('network');
    form.submit();
    form.success();
    form.success();
    form.leave();
    assert.deepEqual(
      calls.map((event) => event[1]),
      [
        'contact_form_view',
        'contact_form_start',
        'contact_field_complete',
        'contact_validation_error',
        'contact_form_submit',
        'contact_submit_error',
        'contact_form_submit',
        'generate_lead',
      ],
    );
    assert.equal(calls[3][2].form_field, 'email');
    assert.equal(calls[3][2].form_error_type, 'format');
  });
});

test('autofill submission and leaving an unfinished form produce the appropriate stage events once', () => {
  withAnalytics((calls) => {
    const form = createContactTracker();
    form.submit();
    form.leave();
    form.leave();
    assert.deepEqual(
      calls.map((event) => event[1]),
      ['contact_form_view', 'contact_form_start', 'contact_form_submit', 'contact_form_leave'],
    );
  });
});

test('arbitrary parameters, unknown field names and personal URL content are excluded from analytics', () => {
  withAnalytics((calls) => {
    trackContactEvent('contact_validation_error', {
      form_field: 'private@example.test',
      form_error_type: 'private error text',
      contact_topic: 'private message',
      form_entry_page: '/blog/example/?email=private@example.test',
      email: 'private@example.test',
      message: 'private message',
    });
    assert.deepEqual(calls[0], ['event', 'contact_validation_error', { form_id: 'contact' }]);
    const form = createContactTracker();
    form.invalid('private@example.test', 'required');
    form.field('unknown');
    assert.equal(calls.length, 1);
    assert.equal(safeContactEntryPage('/blog/example/'), '/blog/example/');
    for (const path of [
      '/contact/?token=private',
      '/blog/private@example.test/',
      'https://other.test/',
      '/blog/%40private/',
    ])
      assert.equal(safeContactEntryPage(path), '');
  });
});

test('internal entry-page attribution expires and is consumed instead of being reused on later direct visits', () => {
  withAnalytics(() => {
    let stored = JSON.stringify({ path: '/blog/example/', time: Date.now() });
    window.sessionStorage = {
      getItem: () => stored,
      removeItem: () => {
        stored = null;
      },
    };
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { referrer: '' } });
    try {
      assert.equal(readContactEntryPage(), '/blog/example/');
      assert.equal(readContactEntryPage(), '');
      stored = JSON.stringify({ path: '/blog/example/', time: Date.now() - 31 * 60 * 1000 });
      assert.equal(readContactEntryPage(), '');
    } finally {
      delete globalThis.document;
    }
  });
});

test('blocked analytics does not throw from any form lifecycle operation', () => {
  withAnalytics(() => {
    window.gtag = () => {
      throw new Error('blocked');
    };
    const form = createContactTracker();
    assert.doesNotThrow(() => {
      form.view();
      form.start();
      form.field('email');
      form.invalid('email', 'format');
      form.submit();
      form.error('timeout');
      form.success();
      form.leave();
    });
  });
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
