'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteNavigation, businessLinks } from './navigation';
import { ActionLink, MotionText } from './ReferenceParts';
import { ITPerson } from './ScrollScenery';
import styles from './shonan.module.css';

export function MobileNavigation({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  return (
    <div className={styles.menuPanel}>
      <div className={styles.menuBrand}>
        <Image src="/yottabyte_logo-removebg-preview.png" alt="" width={25} height={25} />
        <p id={titleId}>合同会社YottaByte</p>
      </div>
      <button
        className={styles.closeButton}
        type="button"
        aria-label="メニューを閉じる"
        onClick={onClose}
      >
        ×
      </button>
      <nav aria-label="モバイルナビゲーション">
        <Link href="/" onClick={onClose}>
          TOP
        </Link>
        {siteNavigation.map((item) => (
          <Fragment key={item.href}>
            <Link href={item.href} onClick={onClose}>
              {item.label}
            </Link>
            {item.href === '/service/'
              ? businessLinks.map((service) => (
                  <Link href={service.href} onClick={onClose} key={service.href}>
                    事業紹介：{service.title}
                  </Link>
                ))
              : null}
          </Fragment>
        ))}
      </nav>
      <div className={styles.menuContact} onClick={onClose}>
        <ActionLink href="/contact/" text="お問い合わせ" />
      </div>
    </div>
  );
}

export function CornerArrow({ className = '' }: { className?: string }) {
  return (
    <span className={`${styles.cornerArrow} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="m5 5 10 10m0-9v9H6" />
        <path d="m5 5 10 10m0-9v9H6" />
      </svg>
    </span>
  );
}

export function BusinessMenuCards({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className={mobile ? styles.mobileBusinessCards : styles.businessCards}>
      {businessLinks.map((item, i) => (
        <Link href={item.href} key={item.href} onClick={onNavigate}>
          <span className={styles.menuCardPerson} aria-hidden="true">
            <svg viewBox="0 0 60 60" className={styles.menuCardGround}>
              <path d="M8 14C19 4 49 8 52 24S48 55 34 51 0 26 8 14Z" />
            </svg>
            <ITPerson pose={i ? 'laptop' : 'tablet'} />
          </span>
          <span className={styles.menuCardLabel}>{item.title}</span>
          <CornerArrow />
        </Link>
      ))}
    </div>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const pill = useRef<HTMLDivElement>(null);
  const business = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null);

  function activate(element: HTMLElement, isBusiness: boolean) {
    const bounds = element.getBoundingClientRect();
    const parent = pill.current?.getBoundingClientRect();
    if (parent) setHighlight({ left: bounds.left - parent.left, width: bounds.width });
    setOpen(isBusiness);
  }

  return (
    <nav className={styles.navigation} aria-label="メインナビゲーション">
      <div
        ref={pill}
        className={styles.navPill}
        data-menu-open={open}
        data-highlight={Boolean(highlight)}
        onPointerLeave={() => {
          if (pill.current?.contains(document.activeElement)) return;
          setOpen(false);
          setHighlight(null);
        }}
        onBlurCapture={(event) => {
          if (event.currentTarget.contains(event.relatedTarget)) return;
          setOpen(false);
          setHighlight(null);
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Escape' || !open) return;
          event.preventDefault();
          business.current?.focus();
          setOpen(false);
          setHighlight(null);
        }}
        style={
          {
            '--nav-left': `${highlight?.left ?? 0}px`,
            '--nav-width': `${highlight?.width ?? 0}px`,
          } as CSSProperties
        }
      >
        <span className={styles.navHighlight} aria-hidden="true" />
        {siteNavigation.map((item) => {
          const isBusiness = item.href === '/service/';
          const active = pathname?.startsWith(item.href);
          return (
            <div
              key={item.href}
              className={styles.navGroup}
              data-business={isBusiness || undefined}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') activate(event.currentTarget, isBusiness);
              }}
              onFocusCapture={(event) => activate(event.currentTarget, isBusiness)}
            >
              <Link
                ref={isBusiness ? business : undefined}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                aria-expanded={isBusiness ? open : undefined}
                aria-controls={isBusiness ? 'business-menu' : undefined}
                onKeyDown={(event) => {
                  if (!isBusiness || event.key !== 'ArrowDown') return;
                  event.preventDefault();
                  setOpen(true);
                  requestAnimationFrame(() => {
                    pill.current?.querySelector<HTMLAnchorElement>('#business-menu a')?.focus();
                  });
                }}
              >
                <MotionText text={item.label} />
              </Link>
              {isBusiness ? (
                <div
                  id="business-menu"
                  className={styles.navDropdown}
                  data-open={open}
                  inert={!open}
                  aria-label="事業の詳細"
                >
                  <BusinessMenuCards />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <ActionLink href="/contact/" text="お問い合わせ" />
    </nav>
  );
}
