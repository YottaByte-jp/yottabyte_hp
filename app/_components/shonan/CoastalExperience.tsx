'use client';

import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { CoastalTown } from './CoastalTown';
import { HeroStories } from './HeroStories';
import { SiteNavigation, MobileNavigation } from './SiteNavigation';
import styles from './shonan.module.css';
import { useBusinessMotion } from './useBusinessMotion';
import { useScrollScenes } from './useScrollScenes';

function subscribePreference(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function preference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CoastalExperience({
  children,
  footer,
  fontClass,
}: {
  children: ReactNode;
  footer: ReactNode;
  fontClass: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const storyOpen = useRef(false);
  const onStoryOpenChange = useCallback((open: boolean) => {
    storyOpen.current = open;
  }, []);
  const opener = useRef<HTMLElement | null>(null);
  const priorOverflow = useRef<string | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useSyncExternalStore(subscribePreference, preference, () => false);
  useBusinessMotion(reduced, false);
  useScrollScenes(reduced, false);

  function openDialog(dialog: HTMLDialogElement | null | undefined, trigger: HTMLElement) {
    if (!dialog || dialog.open) return;
    opener.current = trigger;
    priorOverflow.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  function restoreDialog() {
    if (priorOverflow.current !== null) document.body.style.overflow = priorOverflow.current;
    priorOverflow.current = null;
    opener.current?.focus({ preventScroll: true });
    opener.current = null;
  }

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const element = root.current;
    const scene = world.current;
    if (!element || !scene) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    const images = [...scene.querySelectorAll<HTMLImageElement>('img')];
    const start = async () => {
      await Promise.all([
        document.fonts.ready,
        ...images.map((img) => img.decode().catch(() => undefined)),
      ]);
      if (disposed) return;
      context = gsap.context(() => {
        const header = element.querySelector('header');
        const title = element.querySelector(`.${styles.heroTitle}`);
        const glyphs = element.querySelectorAll('[data-hero-glyph]');
        const japanese = element.querySelectorAll('[data-hero-japanese]');
        const grounds = scene.querySelectorAll('[data-town-ground]');
        const parts = scene.querySelectorAll('[data-town-part]');
        const prompts = element.querySelectorAll('[data-story-prompt]');
        const waves = scene.querySelectorAll(`.${styles.smallWave},.${styles.smallWaveTwo}`);
        const aircraft = scene.querySelector(`.${styles.flyingPlane}`);
        const sky = element.querySelector(`.${styles.heroSky}`);
        const all = [
          ...parts,
          ...grounds,
          ...glyphs,
          ...japanese,
          ...prompts,
          ...waves,
          header,
          aircraft,
          sky,
        ].filter(Boolean);
        if (reduced) {
          gsap.set(all, { autoAlpha: 1, x: 0, y: 0, clipPath: 'none' });
          element.dataset.entry = 'complete';
          return;
        }
        const tl = gsap.timeline({
          paused: true,
          onComplete: () => {
            element.dataset.entry = 'complete';
          },
        });
        const architecture = (side: 'left' | 'right') => {
          const town = scene.querySelector(`[data-town="${side}"]`);
          if (!town) return;
          const distance = (44 * window.innerWidth) / 1440;
          const offset = side === 'left' ? -distance * 0.85 : distance;
          gsap.set(town.querySelectorAll('[data-town-part]'), {
            autoAlpha: 0,
            x: offset,
            y: offset,
          });
          const sequence = gsap.timeline();
          for (const step of [1, 2, 3]) {
            const nodes = town.querySelectorAll(`[data-step="${step}"]`);
            const at =
              step === 1
                ? 0
                : Math.max(0, sequence.duration() - 0.93 * (side === 'left' ? 0.8 : 0.89));
            sequence
              .to(
                nodes,
                {
                  x: 0,
                  y: 0,
                  duration: 0.93,
                  ease: 'power4.out',
                  stagger: side === 'left' ? 0.085 : 0.075,
                  force3D: false,
                },
                at,
              )
              .to(
                nodes,
                {
                  autoAlpha: 1,
                  duration: 0.1,
                  ease: 'none',
                  stagger: side === 'left' ? 0.085 : 0.075,
                },
                at,
              );
          }
          tl.add(sequence, 0.2);
          const people = town.querySelectorAll('[data-kind="person"]');
          gsap.set(people, { x: 0, y: town.clientWidth * 0.04, autoAlpha: 0 });
          tl.to(
            people,
            { y: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1, force3D: false },
            0.8,
          ).to(people, { autoAlpha: 1, duration: 0.11, ease: 'power1.in', stagger: 0.1 }, 0.8);
          const ground = town.querySelector('[data-town-ground]');
          gsap.set(ground, {
            autoAlpha: 0,
            x: side === 'left' ? -12 : 12,
            y: side === 'left' ? -12 : 12,
          });
          tl.to(ground, { autoAlpha: 1, duration: 0.3, ease: 'power1.in' }, 1.5).to(
            ground,
            { x: 0, y: 0, duration: 1, ease: 'power1.out', force3D: false },
            1.5,
          );
          gsap.set(town, { x: side === 'left' ? -20 : 20, y: side === 'left' ? -20 : 20 });
          tl.to(town, { x: 0, y: 0, duration: 2.8, ease: 'power2.out', force3D: false }, 0.2);
        };
        architecture('left');
        architecture('right');
        gsap.set(sky, { autoAlpha: 0 });
        tl.to(sky, { autoAlpha: 1, duration: 0.3, ease: 'power1.in' }, 1.5);
        gsap.set(title, { y: 70 });
        tl.to(title, { y: 0, duration: 2, ease: 'back.out(1.4)', force3D: false }, 0.5);
        gsap.set(glyphs, {
          autoAlpha: 1,
          y: 130,
          clipPath: 'inset(0% -18% 100% 0%)',
          color: '#006734',
        });
        tl.to(
          glyphs,
          {
            y: 0,
            clipPath: 'inset(0% -18% 0% 0%)',
            duration: 1.5,
            ease: 'quint.inOut',
            stagger: { amount: 0.6 },
            force3D: false,
          },
          0.5,
        ).to(
          glyphs,
          { color: '#1a1a1a', duration: 0.4, ease: 'none', stagger: { amount: 0.5 } },
          1.4,
        );
        gsap.set(japanese, { autoAlpha: 0, x: 12, color: '#006734' });
        tl.to(
          japanese,
          {
            autoAlpha: 1,
            x: 0,
            color: '#1a1a1a',
            duration: 0.45,
            ease: 'power1.out',
            stagger: { amount: 0.4 },
          },
          1.1,
        );
        gsap.set(header, { autoAlpha: 0, y: -40 });
        tl.to(header, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, 2.75);
        gsap.set(aircraft, { autoAlpha: 0, x: 60, y: -60 });
        tl.to(aircraft, { autoAlpha: 1, x: 0, y: 0, duration: 1.2, ease: 'power1.out' }, 1);
        gsap.set(waves, { autoAlpha: 0 });
        tl.to(waves, { autoAlpha: 1, duration: 0.3, stagger: 0.15, ease: 'power1.in' }, 1.5);
        gsap.set(prompts, { autoAlpha: 0, y: 18 });
        tl.to(
          prompts,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.4)',
            stagger: 0.14,
            force3D: false,
          },
          2.2,
        );
        const inspect = new URLSearchParams(window.location.search).get('motion-frame');
        element.dataset.entry = inspect === null ? 'playing' : 'inspection';
        if (inspect !== null && Number.isFinite(Number(inspect)))
          tl.seek(Math.max(0, Math.min(Number(inspect), tl.duration())), false).pause();
        else tl.play(0);
      }, element);
    };
    void start();
    return () => {
      disposed = true;
      context?.revert();
    };
  }, [reduced]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    element.dataset.ready = 'true';
    const scroll = () => {
      element.dataset.scrolled = String(window.scrollY > 200);
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
    const ribbon = element?.querySelector<HTMLElement>('[data-ribbon]');
    const group = ribbon?.querySelector<HTMLElement>(`.${styles.workGroup}`);
    if (!element || !ribbon || !group) return;
    let frame = 0;
    let last = 0;
    let heroVisible = true;
    let ribbonVisible = false;
    let x = 0;
    let y = 0;
    let focus = false;
    let held = false;
    let resumeAfter = 0;
    let position = ribbon.scrollLeft;
    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === world.current) heroVisible = entry.isIntersecting;
        if (entry.target === ribbon) ribbonVisible = entry.isIntersecting;
      }
      element.dataset.heroIdle = String(!heroVisible);
    });
    if (world.current) visibility.observe(world.current);
    visibility.observe(ribbon);
    const onFocus = () => {
      focus = true;
    };
    const onBlur = () => {
      focus = false;
    };
    const onDown = () => {
      held = true;
    };
    const onUp = () => {
      held = false;
      resumeAfter = performance.now() + 1600;
    };
    const onWheel = () => {
      resumeAfter = performance.now() + 1600;
    };
    ribbon.addEventListener('focusin', onFocus);
    ribbon.addEventListener('focusout', onBlur);
    ribbon.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    ribbon.addEventListener('wheel', onWheel, { passive: true });
    function tick(now: number) {
      const dt = Math.min(now - (last || now), 40);
      last = now;
      const active = !reduced && !document.hidden && element?.dataset.entry !== 'inspection';
      if (active && heroVisible && !storyOpen.current && world.current) {
        x += (pointer.current.x - x) * 0.05;
        const desktop = window.innerWidth >= 968;
        const heroHeight = sceneHeight();
        y = desktop ? Math.min(window.scrollY / heroHeight, 1) * 120 : 0;
        if (!desktop) x = 0;
        world.current.parentElement?.style.setProperty('--look-x', `${x.toFixed(2)}px`);
        world.current.parentElement?.style.setProperty('--look-y', `${y.toFixed(2)}px`);
      }
      if (active && ribbonVisible && !focus && !held && now > resumeAfter && ribbon && group) {
        const span = group.getBoundingClientRect().width;
        position += dt * 0.03;
        if (span > 0 && position >= span) position -= span;
        ribbon.scrollLeft = position;
      } else if (ribbon) {
        position = ribbon.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    }
    function sceneHeight() {
      return element?.querySelector(`.${styles.hero}`)?.clientHeight || window.innerHeight;
    }
    if (!reduced) frame = requestAnimationFrame(tick);
    else {
      world.current?.parentElement?.style.setProperty('--look-x', '0px');
      world.current?.parentElement?.style.setProperty('--look-y', '0px');
    }
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      ribbon.removeEventListener('focusin', onFocus);
      ribbon.removeEventListener('focusout', onBlur);
      ribbon.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      ribbon.removeEventListener('wheel', onWheel);
    };
  }, [reduced]);

  return (
    <div
      ref={root}
      className={`${styles.page} ${fontClass}`}
      data-paused={reduced}
      data-entry="waiting"
      data-yottabyte-site
      data-business-motion="waiting"
      data-scroll-motion="waiting"
    >
      <noscript>
        <style>{`[data-yottabyte-site] [data-town-part],[data-yottabyte-site] [data-town-ground],[data-yottabyte-site] [data-entry-part],[data-yottabyte-site] [data-business-panel],[data-yottabyte-site] [data-business-legs],[data-yottabyte-site] [data-business-part],[data-yottabyte-site] [data-heading-glyph],[data-yottabyte-site] [data-subheading-glyph],[data-yottabyte-site] [data-intro-card],[data-yottabyte-site] [data-intro-person],[data-yottabyte-site] [data-sign-panel],[data-yottabyte-site] [data-footer-content],[data-yottabyte-site] [data-footer-glyph]{opacity:1!important;visibility:visible!important;transform:none!important;clip-path:none!important}[data-yottabyte-site] [data-hero-stories]{display:none!important}`}</style>
      </noscript>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="合同会社YottaByte ホーム">
          <Image src="/yottabyte_logo-removebg-preview.png" alt="" width={29} height={29} />
          <span>
            合同会社<strong>YottaByte</strong>
          </span>
        </Link>
        <SiteNavigation />
        <button
          type="button"
          className={styles.menuTrigger}
          aria-label="メニューを開く"
          aria-haspopup="dialog"
          onClick={(e) => openDialog(menu.current, e.currentTarget)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section
          className={styles.hero}
          aria-labelledby="hero-title"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse') return;
            pointer.current = {
              x:
                window.innerWidth >= 968
                  ? (e.clientX / window.innerWidth - 0.5) * -window.innerWidth * 0.08
                  : 0,
              y: 0,
            };
          }}
          onPointerLeave={() => {
            pointer.current = { x: 0, y: 0 };
          }}
        >
          <div className={styles.heroSky} />
          <div
            className={styles.world}
            ref={world}
            aria-label="海岸線、砂浜、岬とヨットのある湘南の海辺に、開発の仕事場が広がるイラスト"
          >
            <CoastalTown side="left" className={styles.townLeft} entrance />
            <CoastalTown side="right" className={styles.townRight} entrance />
            <div className={styles.heroPlaneTravel} data-hero-flight>
              <svg
                className={styles.flyingPlane}
                viewBox="0 0 120 85"
                fill="none"
                aria-hidden="true"
              >
                <g className={styles.aircraftFloat}>
                  <path d="M7 35L110 7 72 76 51 50Z" fill="#fffaf0" stroke="#252525" />
                  <path d="M110 7L51 50l4 23 17-20M51 50l59-43" stroke="#252525" />
                  <path d="M20 60c-28 10 2 19 9 8" stroke="#e43200" strokeDasharray="3 4" />
                </g>
              </svg>
            </div>
            <svg className={styles.smallWave} viewBox="0 0 70 12" fill="none" aria-hidden="true">
              <path d="M2 6q6-7 13 0t13 0t13 0t13 0t13 0" stroke="#252525" strokeWidth="1" />
            </svg>
            <svg className={styles.smallWaveTwo} viewBox="0 0 70 12" fill="none" aria-hidden="true">
              <path d="M2 6q6-7 13 0t13 0t13 0t13 0t13 0" stroke="#252525" strokeWidth="1" />
            </svg>
          </div>
          <HeroStories still={reduced} onOpenChange={onStoryOpenChange} />
          <div className={styles.heroTitle}>
            <p className={styles.heroEnglish} aria-hidden="true">
              {['LET’S', 'BUILD IT.'].map((word) => (
                <span className={styles.heroWord} key={word}>
                  {[...word].map((letter, i) => (
                    <span key={i} className={styles.heroGlyph} data-hero-glyph>
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <h1 id="hero-title" aria-label="湘南の街に、ITの力を">
              {[...'湘南の街に、ITの力を'].map((letter, i) => (
                <span
                  key={i}
                  data-hero-japanese
                  aria-hidden="true"
                  className={styles.heroJapaneseGlyph}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </section>
        {children}
      </main>
      {footer}
      <a href="#main-content" className={styles.backTop} aria-label="ページの先頭へ">
        <span aria-hidden="true">↑</span>
        <svg viewBox="0 0 30 12" fill="none" aria-hidden="true">
          <path d="M2 2c4 10 22 10 26 0" stroke="currentColor" />
        </svg>
      </a>
      <dialog
        ref={menu}
        className={styles.menuDialog}
        aria-labelledby="menu-title"
        onClose={restoreDialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <MobileNavigation titleId="menu-title" onClose={() => menu.current?.close()} />
      </dialog>
    </div>
  );
}
