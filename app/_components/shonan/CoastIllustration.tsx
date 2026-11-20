import { ITPerson } from './ScrollScenery';
import styles from './inner.module.css';

const waves = [
  'M37 307q32 7 64 0m86-12q25 5 50 0m325-11q32 7 64 0',
  'M329 334q35 8 70 0m248 2q25 6 50 0',
  'M48 416q36 9 72 0m209 13q39 9 78 0',
  'M132 493q32 7 64 0m140-18q31 7 62 0',
  'M23 557q45 8 90 0m139-20q33 8 66 0',
];

export function CoastIllustration() {
  return (
    <svg
      className={styles.coastScene}
      viewBox="0 0 840 600"
      fill="none"
      role="img"
      aria-label="湘南・葉山をイメージした海岸、岩場、ヨットと、砂浜でタブレットを持つ人物の線画"
      data-coast-illustration
      stroke="#252525"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h840v600H0Z" fill="#eef9fb" stroke="none" />
      <path
        d="M77 105c-20-18-2-41 21-36 9-26 43-30 59-10 25-12 54 2 50 23 26-2 40 27 19 40-22 13-43 9-60 12-38 10-83 1-89-16Z"
        fill="#fffaf0"
        stroke="#8c9b91"
        strokeWidth="1.6"
      />
      <path
        d="M429 79c-10-14 1-30 17-27 7-20 32-19 41-2 22-8 41 13 27 27-19 12-35 7-48 11-17 3-30 1-37-9Z"
        fill="#fffaf0"
        stroke="#8c9b91"
        strokeWidth="1.6"
      />
      <path d="M0 247h840v353H0Z" fill="#c6e2e7" stroke="none" />
      <path d="M376 247h464" stroke="#718e89" strokeWidth="1.7" />
      <path
        d="M-5 211c51-44 86-64 139-45 39 14 68 9 100 29 39 25 60 28 94 30 40 2 69 25 109 34-101 14-244 16-442 8Z"
        fill="#b9d0b0"
      />
      <path
        d="M-5 236c65-45 98-19 145-28 52-10 61 28 114 25 50-3 68 20 109 27"
        stroke="#7f9e76"
        strokeWidth="1.6"
      />
      <g fill="#fffaf0" strokeWidth="1.6">
        <path d="m180 239 21-9 21 8v27h-42Z" />
        <path d="m234 247 20-11 24 12v18h-44Z" />
        <path d="M297 249h24v18h-24Z" />
        <path d="M190 247h8v12h-8m58-14h8v14h-8m57-1h7" />
      </g>
      <path d="M-5 269c172-5 267 9 435-6" stroke="#fffaf0" strokeWidth="8" />
      <g className={styles.coastWaves} stroke="#7aa8af" strokeWidth="1.8">
        {waves.map((line) => (
          <path d={line} key={line} />
        ))}
      </g>
      <g stroke="#f6fcfa" strokeWidth="3.4">
        <path d="M50 349q31 8 62 0m228 31q27 6 54 0m217-63q32 7 64 0" />
        <path d="M380 503q36 8 72 0m-379 20q31 7 62 0" />
      </g>
      <g transform="translate(201 381)">
        <ellipse cx="14" cy="44" rx="91" ry="17" fill="#b4d5d9" stroke="none" />
        <path d="m-59 34 21-30 29 10L9-14l38 8 22 30 21 17c-51 14-112 16-149-7Z" fill="#c6ccb7" />
        <path
          d="m-38 4 17 27 12-17m18-28 8 37 30-29m-30 29 29 18 23-17M-59 34l38-3 25 22"
          stroke="#7d8975"
          strokeWidth="1.6"
        />
        <path d="M-72 53q40 11 77 3m42-1q27-2 49-9" stroke="#f6fcfa" strokeWidth="3" />
      </g>
      <g className={styles.coastSailboat}>
        <path d="M489 243v133" />
        <path d="m480 257-62 101 62-10Z" fill="#fffaf0" />
        <path d="m499 269 48 79-48 6Z" fill="#f8f0dc" />
        <path d="m408 374 147-8-18 24-105 3Z" fill="#d99985" />
        <path d="m420 377 119-6m-113 30q48 9 96-1" stroke="#738e86" strokeWidth="1.7" />
      </g>
      <g stroke="#718c86" strokeWidth="1.4">
        <path d="M697 264v47m-4-43-23 37h23m9-33 20 30h-20" fill="#fffaf0" />
        <path d="m666 313 65-3-10 10-45 2Z" fill="#f1d2a4" />
      </g>
      <g stroke="#5f7771" strokeWidth="2">
        <path d="M572 131q13-16 27 0 13-16 27 0m39-33q9-11 19 0 9-11 19 0" />
      </g>
      <path
        d="M840 357c-76 13-114 69-157 103-41 33-86 35-139 66-62 36-111 52-167 74h463Z"
        fill="#f3e6c6"
      />
      <path
        d="M837 374c-70 13-106 67-145 97-43 33-87 36-137 65-59 35-109 52-151 69"
        stroke="#fffaf0"
        strokeWidth="9"
      />
      <path d="M840 468c-83 9-127 43-185 76-47 27-89 39-136 56h321Z" fill="#e3e9d7" />
      <path d="m737 505 17-150 14-1 8 143Z" fill="#d7c7a6" />
      <path d="m754 404-38-54m46 38 37-46" stroke="#7f7962" strokeWidth="5" />
      <path
        d="M690 340c-10-17 7-33 27-26-2-24 26-38 44-21 17-20 53-9 53 13 27-9 43 18 26 35-14 14-34 10-48 16-37 17-91 11-102-17Z"
        fill="#83aa66"
      />
      <path
        d="M710 334q29 9 50-4m18-19q21 9 43 5m-71 31q20 8 46 0"
        stroke="#608847"
        strokeWidth="1.7"
      />
      <ellipse cx="699" cy="554" rx="54" ry="11" fill="#c2ddbd" stroke="none" />
      <svg x="644" y="369" width="111" height="182" aria-hidden="true">
        <ITPerson pose="tablet" />
      </svg>
      <g stroke="#8f9f83" strokeWidth="1.7">
        <path d="m565 568 10-7m3 14 10-7m-74 28 12-6m271-63 10-6m-25 24 11-6" />
      </g>
    </svg>
  );
}
