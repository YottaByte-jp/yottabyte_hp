import Script from 'next/script';
import { createAnalyticsScript } from '@/app/_lib/analytics';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (process.env.NODE_ENV !== 'production' || !measurementId) return null;
  const script = createAnalyticsScript(measurementId);
  if (!script) return null;
  return (
    <Script id="yottabyte-google-analytics" strategy="afterInteractive">
      {script}
    </Script>
  );
}
