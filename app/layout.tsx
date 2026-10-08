import type { Metadata, Viewport } from 'next';
import { Lato, Noto_Sans_JP } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/app/_components/SiteFooter';
import { SiteHeader } from '@/app/_components/SiteHeader';
import { RevealController } from '@/app/_components/Interactions';
import { GoogleAnalytics } from '@/app/_components/GoogleAnalytics';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});
const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yottabyte.jp'),
  title: {
    default: '合同会社YottaByte | システム開発・業務改善・AI活用',
    template: '%s | 合同会社YottaByte',
  },
  description:
    '合同会社YottaByteは、システム開発、業務改善・自動化、AI・LLM活用、技術設計を通じて事業の課題解決を支援します。',
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
    siteName: 'YottaByte',
    title: '合同会社YottaByte | システム開発・業務改善・AI活用',
    description:
      '合同会社YottaByteは、システム開発、業務改善・自動化、AI・LLM活用、技術設計を通じて事業の課題解決を支援します。',
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
    <html lang="ja" className={`${notoSansJp.variable} ${lato.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        <SiteHeader />
        <RevealController />
        {children}
        <SiteFooter />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
