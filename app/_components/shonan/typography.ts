import localFont from 'next/font/local';

const display = localFont({
  src: '../../../public/fonts/shonan-reference/BBHBartle-Regular.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-bartle',
});
const jp = localFont({
  src: [
    {
      path: '../../../public/fonts/shonan-reference/ZenKakuGothicNew-Regular.woff2',
      weight: '400',
    },
    { path: '../../../public/fonts/shonan-reference/ZenKakuGothicNew-Medium.woff2', weight: '500' },
    { path: '../../../public/fonts/shonan-reference/ZenKakuGothicNew-Bold.woff2', weight: '700' },
    { path: '../../../public/fonts/shonan-reference/ZenKakuGothicNew-Black.woff2', weight: '900' },
  ],
  display: 'swap',
  variable: '--font-zen',
  fallback: ['YottaByte Zen Full', 'Noto Sans JP', 'sans-serif'],
});
const english = localFont({
  src: '../../../public/fonts/shonan-reference/InstrumentSans-Variable.woff2',
  display: 'swap',
  variable: '--font-instrument',
});

export const shonanFonts = `${display.variable} ${jp.variable} ${english.variable}`;
