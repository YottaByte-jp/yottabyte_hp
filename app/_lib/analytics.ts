const analyticsHosts = ['yottabyte.jp', 'www.yottabyte.jp'];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function createAnalyticsScript(measurementId: string): string {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return '';
  return `
    (function () {
      if (!${JSON.stringify(analyticsHosts)}.includes(window.location.hostname)) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ${JSON.stringify(measurementId)}, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      if (window.dispatchEvent) window.dispatchEvent(new Event('yb-analytics-ready'));
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(measurementId)};
      document.head.appendChild(tag);
      if (document.addEventListener) document.addEventListener('click', function (event) {
        var anchor = event.target && event.target.closest && event.target.closest('a[href]');
        if (!anchor) return;
        try {
          var target = new URL(anchor.href, window.location.origin);
          if (target.origin !== window.location.origin || !/^\\/contact\\/?$/.test(target.pathname)) return;
          var path = window.location.pathname;
          if (/^\\/(?:blog|case|service|strengths|company|news)(?:\\/[a-z0-9-]+)*\\/?$|^\\/$/i.test(path)) {
            window.sessionStorage.setItem('yb_contact_entry', JSON.stringify({ path: path, time: Date.now() }));
          }
        } catch (_) { /* Optional attribution must never block navigation. */ }
      }, true);
    })();
  `;
}

export const contactFields = [
  'topic',
  'organization',
  'name',
  'email',
  'phone',
  'message',
  'consent',
] as const;
export const contactTopicCodes = [
  'system_ai',
  'automation',
  'mobile_app',
  'website',
  'partnership',
  'other',
] as const;
export const contactErrorTypes = [
  'required',
  'format',
  'too_long',
  'invalid',
  'configuration',
  'http_4xx',
  'http_5xx',
  'rate_limited',
  'invalid_response',
  'network',
  'timeout',
] as const;
export const contactEventNames = [
  'contact_form_view',
  'contact_form_start',
  'contact_field_complete',
  'contact_validation_error',
  'contact_form_submit',
  'contact_submit_error',
  'contact_form_leave',
  'generate_lead',
] as const;
type ContactDetails = {
  form_field?: string;
  form_error_type?: string;
  contact_topic?: string;
  form_entry_page?: string;
};
type ContactEventName = (typeof contactEventNames)[number];

export function safeContactEntryPage(value: unknown): string {
  if (typeof value !== 'string' || value.length > 160) return '';
  return /^\/(?:blog|case|service|strengths|company|news)(?:\/[a-z0-9-]+)*\/?$|^\/$/i.test(value)
    ? value
    : '';
}

export function readContactEntryPage(): string {
  if (typeof window === 'undefined') return '';
  try {
    const stored = JSON.parse(window.sessionStorage.getItem('yb_contact_entry') || 'null');
    window.sessionStorage.removeItem('yb_contact_entry');
    if (
      stored &&
      typeof stored.time === 'number' &&
      Date.now() - stored.time >= 0 &&
      Date.now() - stored.time < 30 * 60 * 1000
    ) {
      const path = safeContactEntryPage(stored.path);
      if (path) return path;
    }
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin
      ? safeContactEntryPage(referrer.pathname)
      : '';
  } catch {
    return '';
  }
}

export function trackContactEvent(event: ContactEventName, details: ContactDetails = {}): boolean {
  if (
    typeof window === 'undefined' ||
    !analyticsHosts.includes(window.location.hostname) ||
    typeof window.gtag !== 'function'
  )
    return false;
  if (!contactEventNames.includes(event)) return false;
  const params: Record<string, string> = { form_id: 'contact' };
  if (contactFields.some((field) => field === details.form_field))
    params.form_field = details.form_field!;
  if (contactErrorTypes.some((type) => type === details.form_error_type))
    params.form_error_type = details.form_error_type!;
  if (contactTopicCodes.some((topic) => topic === details.contact_topic))
    params.contact_topic = details.contact_topic!;
  const entry = safeContactEntryPage(details.form_entry_page);
  if (entry) params.form_entry_page = entry;
  try {
    window.gtag('event', event, params);
    return true;
  } catch {
    // Analytics failures must not interfere with a successful inquiry.
    return false;
  }
}

export function trackContactSubmission(details: ContactDetails = {}): void {
  trackContactEvent('generate_lead', details);
}

export function createContactTracker(details: ContactDetails = {}) {
  const metadata = {
    contact_topic: details.contact_topic,
    form_entry_page: details.form_entry_page,
  };
  let viewed = false;
  let started = false;
  let completed = false;
  let left = false;
  const fields = new Set<string>();
  const invalid = new Set<string>();
  const view = () => {
    if (!viewed) viewed = trackContactEvent('contact_form_view', metadata);
    return viewed;
  };
  return {
    view,
    topic(value: string) {
      metadata.contact_topic = value;
    },
    start() {
      view();
      if (!started) started = trackContactEvent('contact_form_start', metadata);
    },
    field(field: string) {
      if (!contactFields.some((name) => name === field) || fields.has(field)) return;
      if (trackContactEvent('contact_field_complete', { ...metadata, form_field: field }))
        fields.add(field);
    },
    invalid(field: string, type: string) {
      if (
        !contactFields.some((name) => name === field) ||
        !contactErrorTypes.some((name) => name === type)
      )
        return;
      const key = field + ':' + type;
      if (
        !invalid.has(key) &&
        trackContactEvent('contact_validation_error', {
          ...metadata,
          form_field: field,
          form_error_type: type,
        })
      )
        invalid.add(key);
    },
    submit() {
      view();
      if (!started) started = trackContactEvent('contact_form_start', metadata);
      trackContactEvent('contact_form_submit', metadata);
    },
    error(type: string) {
      trackContactEvent('contact_submit_error', { ...metadata, form_error_type: type });
    },
    success() {
      if (!completed) {
        trackContactSubmission(metadata);
        completed = true;
      }
    },
    leave() {
      if (started && !completed && !left) left = trackContactEvent('contact_form_leave', metadata);
    },
  };
}
