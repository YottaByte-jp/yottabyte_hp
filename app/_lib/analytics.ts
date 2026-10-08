const analyticsHosts = ['yottabyte.jp', 'www.yottabyte.jp'];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(measurementId)};
      document.head.appendChild(tag);
    })();
  `;
}

export function trackContactSubmission(): void {
  if (
    typeof window === 'undefined' ||
    !analyticsHosts.includes(window.location.hostname) ||
    typeof window.gtag !== 'function'
  )
    return;
  try {
    window.gtag('event', 'generate_lead', { form_id: 'contact' });
  } catch {
    // Analytics failures must not interfere with a successful inquiry.
  }
}
