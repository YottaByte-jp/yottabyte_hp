import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/app/_components/GoogleAnalytics';
import { siteDescription, siteName, siteTitle } from '@/app/_lib/seo';
import './corporate-fonts.css';
import './globals.css';

// Preserve the previous latin-subset preloads and font binaries without a build-time API request.
const fontPreloads = [
  '/fonts/corporate/4de1fea1a954a5b6-s.p.woff2',
  '/fonts/corporate/55c20a7790588da9-s.p.woff2',
  '/fonts/corporate/6d664cce900333ee-s.p.woff2',
  '/fonts/corporate/7ff6869a1704182a-s.p.woff2',
  '/fonts/corporate/fea9bcfa8bc9e724-s.p.woff2',
];

export const metadata: Metadata = {
  metadataBase: new URL('https://yottabyte.jp'),
  title: {
    default: siteTitle,
    template: '%s | 合同会社YottaByte',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/yottabyte_logo-removebg-preview.png',
    apple: '/yottabyte_logo-removebg-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://yottabyte.jp',
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/yottabyte_logo.png',
        width: 1254,
        height: 1254,
        alt: 'YottaByte',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        {fontPreloads.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
