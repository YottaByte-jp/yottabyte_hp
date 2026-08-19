import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/app/_components/SiteFooter';
import { SiteHeader } from '@/app/_components/SiteHeader';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yottabyte.jp'),
  title: 'YottaByte | Freelance Engineer',
  description:
    'YottaByteは、フリーランスエンジニアとしてWeb開発、業務改善、AI活用、技術設計を支援する屋号です。',
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
    title: 'YottaByte | Freelance Engineer',
    description:
      'YottaByteは、フリーランスエンジニアとしてWeb開発、業務改善、AI活用、技術設計を支援する屋号です。',
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
    <html lang="ja" className={notoSansJp.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
