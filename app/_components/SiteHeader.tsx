'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { href: '#services', label: '事業内容' },
  { href: '#about', label: '私たちについて' },
  { href: '#profile', label: '代表' },
  { href: '#contact', label: 'お問い合わせ' },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="YottaByte ホーム" onClick={close}>
        <Image
          className="brand-mark"
          src="/yottabyte_logo-removebg-preview.png"
          alt=""
          width={500}
          height={500}
          priority
        />
        <span>YottaByte</span>
      </Link>

      <nav
        className={`site-nav${isOpen ? ' site-nav--open' : ''}`}
        aria-label="メインナビゲーション"
      >
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="menu-button menu-button--close" type="button" onClick={close}>
          <Image src="/close.svg" alt="メニューを閉じる" width={24} height={24} priority />
        </button>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-label="メニューを開く"
        onClick={() => setIsOpen(true)}
      >
        <Image src="/menu.svg" alt="" width={24} height={24} priority />
      </button>
    </header>
  );
}
