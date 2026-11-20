'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// All scroll scenes share one lifecycle so pause, resize and navigation restore
// the same complete composition. Hero and business illustration timelines own
// their separate parts and are intentionally excluded here.
export function useScrollScenes(reduced: boolean, paused: boolean) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-yottabyte-site]');
    if (!root) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    let media: gsap.MatchMedia | undefined;

    const prepare = async () => {
      await document.fonts.ready;
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const all = root.querySelectorAll(
          '[data-intro-heading], [data-intro-card], [data-intro-person], [data-person-ground], [data-story-tree], [data-heading-glyph], [data-subheading-glyph], [data-scroll-copy], [data-service-seal], [data-road-layer], [data-road-tree], [data-road-person], [data-road-prop], [data-sign-panel], [data-solution-node] > svg, [data-footer-content], [data-footer-glyph]',
        );
        const story = root.querySelector('[data-story-body]');
        const support = root.querySelector<HTMLElement>('[data-support-scene]');
        const road = root.querySelector<HTMLElement>('[data-road-scene]');
        const footer = root.querySelector<HTMLElement>('[data-scene-footer]');
        const sun = root.querySelector('[data-sunset-sun]');
        const reflection = root.querySelector('[data-sunset-reflection]');

        if (paused || reduced) {
          gsap.set(all, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            yPercent: 0,
            rotationY: 0,
            scale: 1,
            clipPath: 'none',
          });
          gsap.set(root.querySelectorAll('[data-heading-glyph], [data-footer-glyph]'), {
            color: '#1a1a1a',
          });
          gsap.set([story, footer, root.querySelector('[data-hero-flight]')].filter(Boolean), {
            y: 0,
            x: 0,
            yPercent: 0,
          });
          gsap.set(sun, { y: 80 });
          gsap.set(reflection, { opacity: 0.65, scaleX: 1 });
          gsap.set(root.querySelector('[data-sunset-sky-top]'), {
            attr: { 'stop-color': '#ecc5af' },
          });
          gsap.set(root.querySelector('[data-sunset-sky-bottom]'), {
            attr: { 'stop-color': '#edaa88' },
          });
          gsap.set(root.querySelector('[data-sunset-sea]'), { attr: { 'stop-color': '#b8d1cd' } });
          root.dataset.scrollMotion = 'complete';
          return;
        }

        const pendingScenes: { trigger: Element; start: string; timeline: gsap.core.Timeline }[] =
          [];
        const scene = (trigger: Element, name: string, start: string) => {
          const target = trigger as HTMLElement;
          target.dataset.motionGroup = name;
          target.dataset.sceneState = 'hidden';
          const timeline = gsap.timeline({
            paused: true,
            onStart: () => {
              target.dataset.sceneState = 'playing';
            },
            onComplete: () => {
              target.dataset.sceneState = 'complete';
            },
            onReverseComplete: () => {
              target.dataset.sceneState = 'hidden';
            },
          });
          pendingScenes.push({ trigger, start, timeline });
          return timeline;
        };

        const introHeading = root.querySelector('#intro-title');
        if (introHeading) {
          scene(introHeading, 'intro-heading', 'top 90%').fromTo(
            introHeading.querySelectorAll('[data-intro-heading]'),
            { y: 30, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: 'inset(0 0 -20% 0)',
              duration: 0.8,
              stagger: 0.1,
              ease: 'power4.out',
            },
          );
        }
        const introDescription = root.querySelector('#about p');
        const copies = [
          ...root.querySelectorAll('[data-scroll-copy]'),
          ...(introDescription ? [introDescription] : []),
        ];
        copies.forEach((copy, index) => {
          scene(copy, `copy-${index}`, 'top 90%').fromTo(
            copy,
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
          );
        });
        root.querySelectorAll('[data-scroll-heading]').forEach((heading, index) => {
          const glyphs = heading.querySelectorAll('[data-heading-glyph]');
          const english = heading.querySelectorAll('[data-subheading-glyph]');
          scene(
            heading,
            `heading-${index}`,
            heading.closest('[data-support-scene]') ? 'top 65%' : 'top 95%',
          )
            .fromTo(
              glyphs,
              { y: 30, clipPath: 'inset(0 0 100% 0)', color: '#507159' },
              {
                y: 0,
                clipPath: 'inset(0 0 -20% 0)',
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out',
              },
              0,
            )
            .to(
              glyphs,
              { color: '#1a1a1a', duration: 0.35, stagger: 0.085, ease: 'power1.in' },
              0.2,
            )
            .fromTo(
              english,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.2, stagger: { amount: 0.3 }, ease: 'power1.out' },
              0.3,
            );
        });
        const summary = root.querySelector('[data-business-summary]');
        if (summary)
          scene(summary, 'service-seals', 'top 85%').fromTo(
            summary.querySelectorAll('[data-service-seal]'),
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.4)' },
            0.15,
          );

        const links = root.querySelector('[data-intro-links]');
        if (links) {
          const cards = links.querySelectorAll('[data-intro-card]');
          const people = links.querySelectorAll('[data-intro-person]');
          const t = scene(links, 'company-links', 'top 75%');
          t.fromTo(
            cards,
            { y: 90, rotationY: -180, scale: 1.1, autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.2, stagger: 0.15, ease: 'power1.in' },
            0,
          )
            .to(
              cards,
              { rotationY: 0, scale: 1, duration: 1.6, stagger: 0.15, ease: 'power4.out' },
              0,
            )
            .to(cards, { y: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)' }, 0);
          people.forEach((person, index) => {
            const art = person.querySelector('svg:last-child');
            const ground = person.querySelector('[data-person-ground]');
            const at = 0.95 + index * 0.22;
            if (art)
              t.fromTo(
                art,
                {
                  x: index === 0 ? -20 : index === 1 ? 20 : 0,
                  y: index === 2 ? 20 : 0,
                  autoAlpha: 0,
                },
                { x: 0, y: 0, autoAlpha: 1, duration: 0.5, ease: 'power1.out' },
                at,
              );
            if (ground)
              t.fromTo(
                ground,
                { scale: 0 },
                { scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
                at,
              );
          });
        }

        const trees = root.querySelector('[data-story-tree]')?.parentElement;
        if (trees)
          scene(trees, 'story-trees', 'top 85%').fromTo(
            trees.children,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: 'back.out(1.4)' },
          );

        if (road && support) {
          const nodes = road.querySelectorAll('[data-solution-node]');
          const t = scene(support, 'coastal-road', 'top 30%');
          t.fromTo(
            road.querySelectorAll('[data-road-layer]'),
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.5, stagger: 0.04, ease: 'power4.out' },
            0,
          );
          nodes.forEach((node, index) => {
            t.fromTo(
              node.querySelector('[data-sign-panel]'),
              { y: 100, rotationY: -180, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.4)' },
              0.1,
            )
              .fromTo(
                node.querySelector(':scope > svg'),
                { yPercent: -50, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power1.out' },
                0.2,
              )
              .to(
                node.querySelector('[data-sign-panel]'),
                { rotationY: 0, duration: 1.5, ease: 'power4.out' },
                1.55 + index * 0.12,
              );
          });
          t.fromTo(
            road.querySelectorAll('[data-road-person]'),
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
            1,
          )
            .fromTo(
              road.querySelectorAll('[data-road-prop]'),
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
              1.25,
            )
            .fromTo(
              road.querySelectorAll('[data-road-tree]'),
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: 'back.out(1.4)' },
              1.4,
            );
          gsap.fromTo(
            sun,
            { y: -15 },
            {
              y: 150,
              ease: 'none',
              scrollTrigger: {
                trigger: support,
                start: 'top 80%',
                end: 'bottom 55%',
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            reflection,
            { opacity: 0.3, scaleX: 0.5, transformOrigin: 'center' },
            {
              opacity: 0.85,
              scaleX: 1.4,
              ease: 'none',
              scrollTrigger: { trigger: support, start: 'top 70%', end: 'bottom 55%', scrub: true },
            },
          );
          gsap.to(root.querySelector('[data-sunset-sky-top]'), {
            attr: { 'stop-color': '#e9b4a6' },
            ease: 'none',
            scrollTrigger: { trigger: support, start: 'top 65%', end: 'bottom 45%', scrub: true },
          });
          gsap.to(root.querySelector('[data-sunset-sky-bottom]'), {
            attr: { 'stop-color': '#ed987e' },
            ease: 'none',
            scrollTrigger: { trigger: support, start: 'top 65%', end: 'bottom 45%', scrub: true },
          });
          gsap.to(root.querySelector('[data-sunset-sea]'), {
            attr: { 'stop-color': '#b8c5c2' },
            ease: 'none',
            scrollTrigger: { trigger: support, start: 'top 65%', end: 'bottom 45%', scrub: true },
          });
        }

        if (footer) {
          const t = scene(footer, 'footer', 'top 50%');
          t.fromTo(
            footer.querySelector('[data-footer-content]'),
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power1.out' },
            0.2,
          ).fromTo(
            footer.querySelectorAll('[data-footer-glyph]'),
            { y: 80, color: '#395246', clipPath: 'inset(0 -10% 100% 0)' },
            {
              y: 0,
              color: '#1a1a1a',
              clipPath: 'inset(0 -10% -20% -10%)',
              duration: 1.1,
              stagger: { amount: 0.55 },
              ease: 'power4.out',
            },
            0,
          );
          const town = footer.querySelector('[data-town]');
          if (town)
            t.fromTo(
              town,
              { y: 65, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out' },
              0,
            );
          const plane = footer.querySelector('[data-footer-plane]');
          if (plane)
            gsap.fromTo(
              plane,
              { x: 150, y: -150 },
              {
                x: 0,
                y: 0,
                scrollTrigger: {
                  trigger: footer,
                  start: 'top bottom',
                  end: 'bottom 80%',
                  scrub: 0.5,
                },
              },
            );
        }
        pendingScenes.forEach(({ trigger, start, timeline }) => {
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => timeline.restart(),
            onLeaveBack: () => {
              (trigger as HTMLElement).dataset.sceneState =
                timeline.progress() === 0 ? 'hidden' : 'reversing';
              timeline.reverse();
            },
          });
        });
        media = gsap.matchMedia();
        const flight = root.querySelector('[data-hero-flight]');
        if (flight)
          gsap.fromTo(
            flight,
            { x: 0, y: 0 },
            {
              x: () => -Math.min(innerWidth * 0.11, 160),
              y: () => Math.min(innerWidth * 0.11, 160),
              ease: 'none',
              scrollTrigger: {
                trigger: root.querySelector('main > section'),
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        media.add('(min-width: 968px)', () => {
          if (story)
            gsap.fromTo(
              story,
              { y: 200 },
              {
                y: 0,
                ease: 'none',
                scrollTrigger: { trigger: story, start: 'top bottom', end: 'top top', scrub: true },
              },
            );
          if (footer)
            gsap.fromTo(
              footer,
              { yPercent: -35 },
              {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: footer,
                  start: 'top bottom',
                  end: 'bottom bottom',
                  scrub: true,
                },
              },
            );
        });
        root.dataset.scrollMotion = 'ready';
      }, root);
      ScrollTrigger.refresh();
    };
    void prepare();
    return () => {
      disposed = true;
      media?.revert();
      context?.revert();
    };
  }, [paused, reduced]);
}
