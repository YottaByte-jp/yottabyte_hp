'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const hiddenScreen = 'polygon(0% -10%, 100% -10%, 150% -50%, 50% 0%, -50% -50%)';
const visibleScreen = 'polygon(0% -10%, 100% -10%, 150% 60%, 50% 110%, -50% 60%)';

export function useBusinessMotion(reduced: boolean, paused: boolean) {
  const stopped = useRef(paused);
  const active = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    stopped.current = paused;
    if (paused) active.current?.progress(1).pause();
  }, [paused]);

  useEffect(() => {
    const element = document.querySelector<HTMLDivElement>('[data-yottabyte-site]');
    const area = element?.querySelector<HTMLElement>('[data-business-area]');
    if (!element || !area) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    let media: gsap.MatchMedia | undefined;

    const prepare = async () => {
      await Promise.all([
        document.fonts.ready,
        ...[...area.querySelectorAll('img')].map((img) => img.decode().catch(() => undefined)),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const all = area.querySelectorAll(
          '[data-business-panel], [data-business-legs], [data-business-part]',
        );
        if (reduced) {
          gsap.set(all, { autoAlpha: 1, x: 0, y: 0, yPercent: 0, clipPath: 'none' });
          area.dataset.businessState = 'complete';
          return;
        }
        media = gsap.matchMedia();
        media.add({ desktop: '(min-width: 968px)', mobile: '(max-width: 967px)' }, (match) => {
          const mobile = match.conditions?.mobile === true;
          area.dataset.businessState = 'hidden';
          const tl = gsap.timeline({
            paused: true,
            onStart: () => {
              area.dataset.businessState = 'playing';
            },
            onComplete: () => {
              area.dataset.businessState = 'complete';
            },
            onReverseComplete: () => {
              area.dataset.businessState = 'hidden';
            },
          });
          active.current = tl;
          const boards = area.querySelectorAll('[data-business-board]');
          boards.forEach((board, index) => {
            const start = index === 0 ? 0 : mobile ? 0.95 : 0.15;
            const panel = board.querySelector('[data-business-panel]');
            const legs = board.querySelector('[data-business-legs]');
            const frames = board.querySelectorAll('[data-business-part="frame"]');
            const interfaces = board.querySelectorAll('[data-business-part="interface"]');
            const ground = board.querySelectorAll('[data-business-part="ground"]');
            const people = board.querySelectorAll('[data-business-part="person"]');
            const details = board.querySelectorAll('[data-business-part="detail"]');
            tl.fromTo(
              panel,
              { autoAlpha: 0, y: 120 },
              { autoAlpha: 2, y: 0, duration: 1, ease: 'back.out(2)', force3D: false },
              start,
            ).fromTo(
              legs,
              { yPercent: -50, visibility: 'hidden' },
              { yPercent: 0, visibility: 'visible', duration: 0.8, ease: 'power1.out' },
              start + 0.1,
            );
            gsap.set(frames, { visibility: 'hidden', clipPath: hiddenScreen });
            tl.fromTo(
              frames,
              { y: 100, clipPath: hiddenScreen },
              {
                visibility: 'visible',
                y: 0,
                clipPath: visibleScreen,
                duration: 1.1,
                ease: 'back.out(1.4)',
                stagger: 0.1,
                force3D: false,
              },
              start + 0.3,
            )
              .fromTo(
                ground,
                { autoAlpha: 0, y: 80 },
                { autoAlpha: 1.5, y: 0, duration: 0.75, ease: 'back.out(1.4)', force3D: false },
                start + 0.3,
              )
              .fromTo(
                interfaces,
                { autoAlpha: 0, y: 35 },
                {
                  autoAlpha: 1.5,
                  y: 0,
                  duration: 0.75,
                  ease: 'back.out(1.4)',
                  stagger: 0.1,
                  force3D: false,
                },
                start + 0.45,
              )
              .fromTo(
                people,
                { autoAlpha: 0, y: 60 },
                {
                  autoAlpha: 1.5,
                  y: 0,
                  duration: 0.5,
                  ease: 'back.out(2)',
                  stagger: 0.15,
                  force3D: false,
                },
                start + 0.7,
              );
            if (details.length)
              tl.fromTo(
                details,
                { autoAlpha: 0, x: 50, y: -50 },
                { autoAlpha: 2, x: 0, y: 0, duration: 0.5, ease: 'power1.out', force3D: false },
                start + (index === 0 ? 1.2 : 1),
              );
          });

          const frame = new URLSearchParams(window.location.search).get('business-frame');
          let trigger: ScrollTrigger | undefined;
          if (stopped.current) tl.progress(1).pause();
          if (frame !== null && Number.isFinite(Number(frame))) {
            if (!stopped.current)
              tl.seek(Math.max(0, Math.min(Number(frame), tl.duration())), false).pause();
            area.dataset.businessState = 'inspection';
          } else {
            trigger = ScrollTrigger.create({
              trigger: area,
              start: 'top 85%',
              onEnter: () => {
                if (stopped.current) tl.progress(1).pause();
                else tl.restart();
              },
              onLeaveBack: () => {
                if (stopped.current) return;
                area.dataset.businessState = 'reversing';
                tl.reverse();
              },
            });
          }
          return () => {
            trigger?.kill();
            if (active.current === tl) active.current = null;
          };
        });
      }, element);
      element.dataset.businessMotion = 'ready';
      if (!reduced) ScrollTrigger.refresh();
    };
    void prepare();
    return () => {
      disposed = true;
      media?.revert();
      context?.revert();
      active.current = null;
    };
  }, [reduced]);
}
