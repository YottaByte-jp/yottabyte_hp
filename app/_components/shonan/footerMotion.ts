import { gsap } from 'gsap';

// Call inside the page's GSAP context so route changes and reduced motion revert it.
export function createFooterScrollReveal(root: HTMLElement) {
  const main = root.querySelector('main');
  const footer = root.querySelector('[data-scene-footer]');
  if (!main || !footer) return;

  gsap.fromTo(
    footer,
    { yPercent: -35 },
    {
      yPercent: 0,
      force3D: false,
      ease: 'none',
      scrollTrigger: {
        trigger: main,
        start: 'clamp(bottom bottom)',
        end: 'max',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}
