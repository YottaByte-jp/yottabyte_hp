import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './shonan.module.css';

export function MotionText({ text }: { text: string }) {
  return (
    <span className={styles.motionText} aria-label={text}>
      {[...text].map((letter, i) => (
        <span
          className={styles.letter}
          aria-hidden="true"
          key={i}
          style={{ '--i': i } as CSSProperties}
        >
          <span>{letter === ' ' ? '\u00a0' : letter}</span>
          <span>{letter === ' ' ? '\u00a0' : letter}</span>
        </span>
      ))}
    </span>
  );
}

export function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M3 26C3 12 12 4 25 4M19 20l7 6m-6 0h6v-6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ActionLink({
  href,
  text,
  className = '',
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`${styles.actionLink} ${className}`}>
      <MotionText text={text} />
      <Arrow />
    </Link>
  );
}

export function SectionTitle({ jp, en }: { jp: string; en: string }) {
  return (
    <div className={styles.sectionTitle} data-scroll-heading>
      <h2 aria-label={jp}>
        {[...jp].map((letter, i) => (
          <span data-heading-glyph aria-hidden="true" key={i}>
            {letter}
          </span>
        ))}
      </h2>
      <p aria-label={en}>
        {[...en].map((letter, i) => (
          <span data-subheading-glyph aria-hidden="true" key={i}>
            {letter === ' ' ? '\u00a0' : letter}
          </span>
        ))}
      </p>
    </div>
  );
}

export function Worker({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 90 170"
      fill="none"
      aria-hidden="true"
      className={styles.worker}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <ellipse cx="44" cy="160" rx="31" ry="9" fill="#b4e5cc" stroke="#252525" />
      <path
        d="M30 94l-2 59c0 5 14 5 14 1l6-44 4 43c0 5 13 5 13 1l-2-59"
        fill="#657675"
        stroke="#252525"
      />
      <path
        d="M30 55c-9 3-11 15-12 33l-6 8 6 5 12-11 4-17-4 31c9 7 27 7 36 0l-5-38-5-11Z"
        fill="#ebeded"
        stroke="#252525"
      />
      <path d="M60 61l12 19-18 8 3 6 23-10c4-3 4-5 1-10L66 55" fill="#ebeded" stroke="#252525" />
      <path d="M57 82l-22-5-4 19 23 5Z" fill="#d5eef1" stroke="#252525" />
      <path d="M56 87l-7-1-2 4 8 3" fill="#fffaf0" stroke="#252525" />
      <path d="M39 48l-1 9c7 5 13 3 16-2l-4-10" fill="#fffaf0" stroke="#252525" />
      <path d="M34 31c-2 18 1 22 11 23 9 0 13-10 13-19" fill="#fffaf0" stroke="#252525" />
      <path
        d="M32 36c-5-10 1-23 15-23 11 0 16 10 12 20l-10-3-4 9-5-4-1 8-7-3"
        fill="#242424"
        stroke="#252525"
      />
      <path
        d="M27 155l-2 6c2 5 17 5 18 0v-7m9 0v7c3 4 16 4 17-1l-5-6"
        fill="#fffaf0"
        stroke="#252525"
      />
    </svg>
  );
}

export function Stand({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 110"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M39 1H61L69 85C105 90 111 101 82 106C63 111 37 111 18 106C-11 101-5 90 31 85Z"
        fill="#eefbff"
        stroke="#252525"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function TechObject({ kind }: { kind: number }) {
  return (
    <svg viewBox="0 0 150 120" fill="none" aria-hidden="true" className={styles.techObject}>
      {kind === 0 ? (
        <>
          <path d="M27 18h97v65H27Z" fill="#d6e9db" stroke="#252525" />
          <path d="M34 25h83v50H34Z" fill="#effbff" stroke="#252525" />
          <path d="M63 83v15H45l-13 11h88l-14-11H87V83" fill="white" stroke="#252525" />
          <path
            d="M59 39L45 50l14 11m32-22l14 11-14 11m-10-25l-11 29"
            stroke="#252525"
            strokeWidth="2"
          />
        </>
      ) : kind === 1 ? (
        <>
          <path d="M9 41l33-19 33 19-33 19Z" fill="#c9e8d7" stroke="#252525" />
          <path d="M9 41v37l33 20 33-20V41M42 60v38" fill="#fffaf0" stroke="#252525" />
          <path d="M82 20h54v37H82Z" fill="#eefbff" stroke="#252525" />
          <path d="M96 57v12h27M80 84h33V69m0 0l-5 5m5-5l5 5" stroke="#252525" />
          <path d="M93 32h31m-31 8h22" stroke="#6f957c" />
        </>
      ) : kind === 2 ? (
        <>
          <path d="M20 30h110v59H20Z" fill="#fffaf0" stroke="#252525" />
          <path d="M29 40h43v39H29Z" fill="#b4e5cc" stroke="#252525" />
          <path d="M82 41h36m-36 9h27m-27 9h33m-33 10h24M38 94h74l13 11H25Z" stroke="#252525" />
          <path d="M44 50v21m9-21v21m9-21v21" stroke="#252525" />
          <circle cx="53" cy="58" r="3" fill="#e43200" />
        </>
      ) : kind === 3 ? (
        <>
          <path d="M38 28h73v62H38Z" fill="#d7eadc" stroke="#252525" />
          <path d="M46 36h57v45H46Z" fill="#eefbff" stroke="#252525" />
          <path
            d="M62 18v10m25-10v10M27 43h11m-11 18h11m73-18h11m-11 18h11M55 90v14m36-14v14"
            stroke="#252525"
          />
          <circle cx="62" cy="54" r="5" fill="#252525" />
          <circle cx="88" cy="54" r="5" fill="#252525" />
          <path d="M61 69h29" stroke="#252525" />
          <path d="M124 13v17m-8-8h17" stroke="#e43200" strokeWidth="2" />
        </>
      ) : kind === 5 ? (
        <>
          <rect x="14" y="20" width="100" height="73" rx="5" fill="#fffaf0" stroke="#252525" />
          <path d="M14 33h100M23 27h3m5 0h3m5 0h3" stroke="#252525" />
          <path d="M25 43h44v28H25Z" fill="#c9e5ed" stroke="#252525" />
          <path d="M76 47h27m-27 9h22m-22 9h25M25 81h77" stroke="#789b86" />
          <rect x="99" y="55" width="32" height="51" rx="5" fill="#d6e9db" stroke="#252525" />
          <path d="M105 65h20v20h-20Z" fill="#c9e5ed" stroke="#252525" />
          <path d="M105 92h20m-16 7h12" stroke="#252525" />
        </>
      ) : (
        <>
          <path d="M38 13h76v92H38Z" fill="#fffaf0" stroke="#252525" />
          <path
            d="M45 22h61v20H45Zm0 28h61v20H45Zm0 28h61v20H45Z"
            fill="#c9e8d7"
            stroke="#252525"
          />
          <path d="M54 31h22m-22 28h22m-22 28h22" stroke="#252525" />
          <circle cx="96" cy="31" r="3" fill="#e43200" />
          <circle cx="96" cy="59" r="3" fill="#7da946" />
          <circle cx="96" cy="87" r="3" fill="#7da946" />
        </>
      )}
    </svg>
  );
}
