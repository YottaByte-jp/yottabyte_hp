'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { navigation } from '@/app/_data/site';
import { Icon } from './TemplateParts';
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const open = isOpen || pathname === '/navigation/';
  const trigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const close = () => {
    setIsOpen(false);
    if (pathname === '/navigation/') router.replace('/');
  };
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousTrigger = trigger.current;
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (pathname === '/navigation/') router.replace('/');
      }
      if (event.key === 'Tab') {
        const focusable = drawer.current?.querySelectorAll<HTMLElement>('a[href],button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keydown);
      previousTrigger?.focus();
    };
  }, [open, pathname, router]);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="YottaByte ホーム" onClick={close}>
            <span className="brand-mark" aria-hidden="true" />
            YOTTABYTE
          </Link>
          <nav className="desktop-nav" aria-label="メインナビゲーション">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname.startsWith(item.href) ? 'active' : ''}
                aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link className="header-pill header-pill--black" href="/contact/#form">
              協業相談
              <Icon name="external" />
            </Link>
            <Link className="header-pill" href="/contact/">
              お問い合わせ
              <Icon name="mail" />
            </Link>
          </nav>
          <button
            className="menu-trigger"
            aria-label="メニューを開く"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            type="button"
            onClick={() => setIsOpen(true)}
            ref={trigger}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {open ? (
        <div className="menu-overlay">
          <button
            className="menu-backdrop"
            type="button"
            aria-label="メニューを閉じる"
            onClick={close}
            tabIndex={-1}
          />
          <div
            className="menu-drawer"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="メニュー"
            ref={drawer}
          >
            <button className="menu-close" aria-label="閉じる" type="button" onClick={close}>
              ×
            </button>
            <nav>
              <Link href="/" onClick={close}>
                ホーム
              </Link>
              {navigation.map((item) => (
                <Link href={item.href} key={item.href} onClick={close}>
                  {item.label}
                </Link>
              ))}
              <Link
                className="header-pill header-pill--black"
                href="/contact/#form"
                onClick={close}
              >
                協業相談
                <Icon name="external" />
              </Link>
              <Link className="header-pill" href="/contact/" onClick={close}>
                お問い合わせ
                <Icon name="mail" />
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
