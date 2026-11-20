'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { SiteNavigation, MobileNavigation } from './SiteNavigation';
import shared from './shonan.module.css';
import styles from './inner.module.css';

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function InnerExperience({
  children,
  footer,
  fontClass,
}: {
  children: ReactNode;
  footer: ReactNode;
  fontClass: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const priorOverflow = useRef<string | null>(null);
  const pathname = usePathname();
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, () => false);

  function closeMenu() {
    menu.current?.close();
  }
  function restoreMenu() {
    if (priorOverflow.current !== null) document.body.style.overflow = priorOverflow.current;
    priorOverflow.current = null;
    menuTrigger.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const scroll = () => {
      if (root.current) root.current.dataset.scrolled = String(window.scrollY > 160);
    };
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', scroll);
      if (priorOverflow.current !== null) document.body.style.overflow = priorOverflow.current;
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    const start = async () => {
      await document.fonts.ready;
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const all = element.querySelectorAll(
          '[data-inner-title-glyph],[data-inner-jp],[data-inner-panel],[data-inner-frame],[data-inner-copy],[data-inner-image],[data-inner-part],[data-inner-bubble],[data-inner-circle],[data-inner-flow-row],[data-inner-legs],[data-business-part],[data-footer-content],[data-footer-glyph]',
        );
        const lines = element.querySelectorAll('[data-inner-line]');
        if (reduced) {
          gsap.set(all, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
            clipPath: 'none',
            filter: 'none',
          });
          gsap.set(lines, { strokeDasharray: 100, strokeDashoffset: 0 });
          element.dataset.innerMotion = 'complete';
          return;
        }
        const title = element.querySelectorAll('[data-inner-title-glyph]');
        gsap.fromTo(
          title,
          { y: 80, clipPath: 'inset(0% -15% 100% 0%)', autoAlpha: 0 },
          {
            y: 0,
            clipPath: 'inset(0% -15% 0% 0%)',
            autoAlpha: 1,
            duration: 1.6,
            ease: 'quint.inOut',
            stagger: { amount: 0.65 },
            force3D: false,
          },
        );
        gsap.fromTo(
          element.querySelectorAll('[data-inner-jp]'),
          { x: 12, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.55, delay: 0.3, ease: 'power1.out' },
        );
        for (const section of element.querySelectorAll('[data-inner-section]')) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          });
          const animate = (
            selector: string,
            from: gsap.TweenVars,
            to: gsap.TweenVars,
            at: number,
          ) => {
            const nodes = [
              ...(section.matches(selector) ? [section] : []),
              ...section.querySelectorAll(selector),
            ].filter((node) => node.closest('[data-inner-section]') === section);
            if (nodes.length) timeline.fromTo(nodes, from, { ...to, force3D: false }, at);
          };
          animate(
            '[data-inner-panel]',
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12 },
            0,
          );
          animate(
            '[data-inner-bubble]',
            { x: 16, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' },
            0.1,
          );
          animate(
            '[data-inner-frame]',
            { x: -10, clipPath: 'inset(0 100% 0 0)' },
            { x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.2, stagger: 0.1, ease: 'quint.inOut' },
            0.2,
          );
          animate(
            '[data-inner-copy]',
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
            0.25,
          );
          animate(
            '[data-inner-image]',
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'quint.inOut' },
            0.25,
          );
          animate(
            '[data-inner-part]',
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.3)' },
            0.4,
          );
          animate(
            '[data-business-part]',
            { y: 25, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.075, ease: 'back.out(1.3)' },
            0.45,
          );
          animate(
            '[data-inner-flow-row]',
            { y: 10, autoAlpha: 0, filter: 'brightness(0.75)' },
            { y: 0, autoAlpha: 1, filter: 'brightness(1)', duration: 0.4, ease: 'power1.out' },
            0,
          );
          animate(
            '[data-inner-legs]',
            { yPercent: -50, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
            0.1,
          );
          animate(
            '[data-inner-circle]',
            { scale: 0, transformOrigin: '50% 50%' },
            { scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(1.4)' },
            0.3,
          );
          animate(
            '[data-inner-line]',
            { strokeDasharray: 100, strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 1, stagger: 0.15, ease: 'power1.out' },
            0.5,
          );
        }
        const footerElement = element.querySelector('[data-scene-footer]');
        if (footerElement) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: footerElement,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
          timeline
            .fromTo(
              element.querySelector('[data-footer-content]'),
              { y: 45, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8 },
              0,
            )
            .fromTo(
              element.querySelectorAll('[data-footer-glyph]'),
              { y: 80, clipPath: 'inset(0 -10% 100% 0)' },
              {
                y: 0,
                clipPath: 'inset(0 -10% 0% 0)',
                duration: 1.4,
                stagger: 0.035,
                ease: 'quint.inOut',
              },
              0.1,
            );
        }
        element.dataset.innerMotion = 'playing';
        ScrollTrigger.refresh();
      }, element);
    };
    void start();
    return () => {
      disposed = true;
      context?.revert();
    };
  }, [pathname, reduced]);

  return (
    <div
      ref={root}
      className={`${shared.page} ${styles.site} ${fontClass}`}
      data-yottabyte-site
      data-entry="complete"
      data-paused={reduced}
      data-inner-motion="waiting"
    >
      <noscript>
        <style>{`[data-inner-title-glyph],[data-inner-jp]{opacity:1!important;visibility:visible!important;transform:none!important;clip-path:none!important}`}</style>
      </noscript>
      <header className={shared.header}>
        <Link href="/" className={shared.brand} aria-label="合同会社YottaByte ホーム">
          <Image src="/yottabyte_logo-removebg-preview.png" alt="" width={29} height={29} />
          <span>
            合同会社<strong>YottaByte</strong>
          </span>
        </Link>
        <SiteNavigation />
        <button
          ref={menuTrigger}
          type="button"
          className={shared.menuTrigger}
          aria-label="メニューを開く"
          aria-haspopup="dialog"
          onClick={() => {
            if (!menu.current || menu.current.open) return;
            priorOverflow.current = document.body.style.overflow;
            menu.current.showModal();
            document.body.style.overflow = 'hidden';
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      {footer}
      <a href="#main-content" className={shared.backTop} aria-label="ページの先頭へ">
        <span aria-hidden="true">↑</span>
        <svg viewBox="0 0 30 12" fill="none" aria-hidden="true">
          <path d="M2 2c4 10 22 10 26 0" stroke="currentColor" />
        </svg>
      </a>
      <dialog
        ref={menu}
        className={shared.menuDialog}
        aria-labelledby="inner-menu-title"
        onClose={restoreMenu}
        onClick={(e) => {
          if (e.currentTarget === e.target) closeMenu();
        }}
      >
        <MobileNavigation titleId="inner-menu-title" onClose={closeMenu} />
      </dialog>
    </div>
  );
}
