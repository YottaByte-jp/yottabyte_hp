import type { ReactNode } from 'react';
import { Tree, Vehicle } from './CoastalTown';
import styles from './shonan.module.css';

export function StoryLandscape() {
  return (
    <div className={styles.storyTerrain} aria-hidden="true">
      <svg className={styles.storyCurve} viewBox="0 0 1440 575" preserveAspectRatio="none">
        <path
          d="M-10 555C175 390 386 269 615 176S1140-13 1450 38V585H-10Z"
          fill="#d8ead9"
          stroke="#252525"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={styles.storyTrees}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} data-story-tree>
            <Tree kind={i % 2} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ITPerson({ pose = 'tablet' }: { pose?: 'tablet' | 'laptop' | 'wave' }) {
  return (
    <svg viewBox="0 0 110 180" fill="none" aria-hidden="true" className={styles.itPerson}>
      <g stroke="#252525" strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round">
        {pose === 'laptop' ? (
          <>
            <path d="M34 100c-13 12-14 24 0 36l24 15 8-11-20-18 27-1 8-17" fill="#707b79" />
            <path d="M67 118l8 29 20 9 6-8-13-11-2-32" fill="#707b79" />
            <path
              d="M58 141l-5 7 12 11c7 4 12 1 13-3l-10-16m23 8 2 9c5 4 15 4 15-1l-8-8"
              fill="#fffaf0"
            />
            <path d="M48 57c9-4 23 3 29 13l14 34c-9 15-29 22-45 10l-6-19" fill="#d8e2d9" />
            <path d="M47 67L36 90 17 85l-3 7 22 11c5 1 8-2 11-7l10-15" fill="#d8e2d9" />
            <path d="M16 85l-7-3-4 5 9 5m45-15 9 11 21-5 2 6-22 11-15-10" fill="#fffaf0" />
            <path d="M12 76l39 8 16 23-40-8Z" fill="#d9edf2" />
            <path d="M27 99l40 8 19-11-40-8Z" fill="#fffaf0" />
            <path d="M51 43l-4 15 13 9 8-11-7-15" fill="#fffaf0" />
            <path d="M45 26c-3 20 4 30 15 28 8-2 14-12 12-25" fill="#fffaf0" />
            <path d="M44 36c-6-7-6-22 6-25 13-5 24 2 25 13l-9-1-7 10-5-2-4 10Z" fill="#252525" />
            <path d="M64 36l5 2-4 3m-2 5h-5" />
          </>
        ) : (
          <>
            <path d="M36 102l-3 59 13 1 10-44 5 44 13-1-1-59" fill="#6f7c79" />
            <path
              d="M32 159l-3 11c3 5 20 5 21-1l-4-9m15 0-1 10c5 5 21 4 20-1l-7-9"
              fill="#fffaf0"
            />
            <path
              d="M38 58c-9 3-13 18-12 37l8 13c10 7 30 7 42-1l-6-40-11-10Z"
              fill={pose === 'wave' ? '#d8e2d9' : '#365d73'}
            />
            <path d="M43 46l-3 13 14 8 10-10-6-15" fill="#fffaf0" />
            <path d="M38 28c-2 17 2 27 13 27 9-1 15-12 14-25" fill="#fffaf0" />
            <path d="M36 38c-5-10-3-23 10-25 13-2 23 5 22 17l-9-2-7 10-6-4-3 9Z" fill="#252525" />
            <path d="M57 38l5 2-4 3m-2 5h-5" />
            {pose === 'wave' ? (
              <>
                <path d="M37 65 22 49 17 27l-8 2 5 28 19 23" fill="#d8e2d9" />
                <path d="m9 29-3-10 3-9 4 1 1 8 4-5 3 2-4 12" fill="#fffaf0" />
                <path d="M69 67l13 24-21 6-2-8 10-5-7-13" fill="#d8e2d9" />
                <path d="m42 77 21 4-3 27-22-5Z" fill="#ffe59b" />
                <path d="m61 88-8 1-2 5 9 3" fill="#fffaf0" />
              </>
            ) : (
              <>
                <path
                  d="M34 67 23 92l16 11 4-7-9-7 9-15m22-9 13 22-18 10-5-7 11-7-9-13"
                  fill="#365d73"
                />
                <path d="m44 78 20 4-5 27-21-5Z" fill="#d9edf2" />
                <path d="m40 96-6-1-1 5 7 4m18-14-7 1-2 4 8 3" fill="#fffaf0" />
              </>
            )}
          </>
        )}
      </g>
    </svg>
  );
}

export function PersonGround() {
  return (
    <svg viewBox="0 0 150 28" fill="none" aria-hidden="true" data-person-ground>
      <ellipse cx="75" cy="14" rx="73" ry="12" fill="#b4e5cc" stroke="#252525" strokeWidth="1" />
    </svg>
  );
}

const scallop =
  Array.from({ length: 256 }, (_, i) => {
    const a = (i / 256) * Math.PI * 2;
    const r = 91 + 3.8 * Math.cos(a * 14);
    return `${i === 0 ? 'M' : 'L'}${(100 + Math.cos(a) * r).toFixed(2)} ${(100 + Math.sin(a) * r).toFixed(2)}`;
  }).join(' ') + 'Z';

export function ServiceSeal({ children }: { children: ReactNode }) {
  return (
    <span className={styles.serviceSeal} data-service-seal>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <path d={scallop} />
      </svg>
      <span>{children}</span>
    </span>
  );
}

export function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 72"
      className={`${styles.cloud} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.cloudFloat}>
        <path
          d="M25 57C-3 50 3 24 25 22 29 1 54 0 68 16 83-5 111 5 117 20 143 8 166 23 160 35 188 43 173 64 154 62 129 75 102 60 88 65 66 72 42 63 25 57Z"
          fill="white"
          stroke="#758b89"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}

export function PaperPlane({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 85"
      className={className}
      fill="none"
      aria-hidden="true"
      data-footer-plane
    >
      <g className={styles.aircraftFloat}>
        <path d="M7 35 110 7 72 76 51 50Z" fill="#fffaf0" stroke="#252525" />
        <path d="M110 7 51 50l4 23 17-20M51 50l59-43" stroke="#252525" />
        <path d="M20 60c-28 10 2 19 9 8" stroke="#e43200" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

export function SunsetBackdrop() {
  return (
    <div className={styles.sunsetBackdrop} aria-hidden="true" data-sunset-view>
      <svg
        className={styles.sunsetSky}
        viewBox="0 0 1440 1120"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="support-sky" x2="0" y2="1">
            <stop stopColor="#f9dfb1" data-sunset-sky-top />
            <stop offset="1" stopColor="#f9c49e" data-sunset-sky-bottom />
          </linearGradient>
          <linearGradient id="support-sea" x2="0" y2="1">
            <stop stopColor="#a7d1ce" data-sunset-sea />
            <stop offset=".58" stopColor="#d2e7dd" />
            <stop offset="1" stopColor="#f5e7bd" />
          </linearGradient>
          <clipPath id="support-sky-clip">
            <path d="M-10 0H1450V620H-10Z" />
          </clipPath>
        </defs>
        <path d="M-10 0H1450V680H-10Z" fill="url(#support-sky)" />
        <g clipPath="url(#support-sky-clip)">
          <g data-sunset-sun>
            <circle cx="640" cy="520" r="80" fill="#ffe6ac" opacity=".4" />
            <circle cx="640" cy="520" r="56" fill="#fff0c6" stroke="#e9a96c" strokeWidth="1.1" />
          </g>
        </g>
        <path d="M-10 620H1450V1125H-10Z" fill="url(#support-sea)" />
        <path d="M-10 620H1450" stroke="#7f9d97" strokeWidth="1.2" />
        <g data-sunset-reflection stroke="#fff4ce" strokeLinecap="round" opacity=".8">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${610 - i * 7} ${638 + i * 21}h${60 + i * 14}`}
              strokeWidth={3 + i * 0.5}
            />
          ))}
        </g>
        <g data-coastal-mountain stroke="#768e84" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M23 618 135 590l104-70 91 70 104 28Z" fill="#b7c7b4" />
          <path d="m206 553 33-33 31 33-14-4-12 6-10-6-13 9Z" fill="#fff5df" />
          <path
            d="M880 620c35-9 50-33 83-35 26-1 49-22 81-20 53 2 57 31 105 38l74 17Z"
            fill="#9caf91"
          />
          <path d="M1040 565v-39h5v39m-11-39h17v-6h-17Zm5-6v-11h7v11" fill="#f8e7c9" />
        </g>
        <g className={styles.seaRipples} stroke="#78aaa8" strokeWidth="1.4" opacity=".7">
          <path d="M80 701q45 9 90 0m126 40q60 10 120 0m410-63q45 8 90 0m-795 167q54 10 108 0m715-77q55 10 110 0m-370 126q40 8 80 0" />
        </g>
        <g className={styles.coastalGulls} stroke="#627d7c" strokeWidth="1.6">
          <path d="M1050 420q10-11 20 0 10-11 20 0m-116 29q7-8 14 0 7-8 14 0" />
        </g>
        <g
          className={styles.coastalYacht}
          stroke="#627d7c"
          strokeWidth="1.1"
          strokeLinejoin="round"
        >
          <path d="M805 700v-69l-35 62h32m8-57 27 53h-27" fill="#fffaf0" />
          <path d="M765 704h79l-12 12h-57Z" fill="#f2c9ab" />
        </g>
      </svg>
      <Cloud className={styles.sunsetCloudOne} />
      <Cloud className={styles.sunsetCloudTwo} />
    </div>
  );
}

function CoastalPine() {
  return (
    <svg
      viewBox="0 0 140 165"
      fill="none"
      aria-hidden="true"
      stroke="#334c3a"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="m64 74-3 78q8 9 17 0L72 74m-6 28L31 68m40 21 34-33" fill="#d0bda0" />
      <path
        d="M8 64c-6-15 9-25 21-20-6-17 17-27 28-19C59 2 91 5 94 25c24-11 42 7 31 20 23 6 15 28-3 27-15 14-39 4-51 5C46 83 24 82 8 64Z"
        fill="#6a9958"
      />
      <path d="M26 54q21 6 35-4m15-10q20 9 35 4" stroke="#567f48" />
    </svg>
  );
}

export function CoastalRoad() {
  const route = 'M-90 710C160 710 300 605 475 560S780 520 930 430 1250 353 1530 295';
  return (
    <div className={styles.coastalRoad} aria-hidden="true">
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        className={styles.roadDrawing}
        fill="none"
      >
        <g data-road-layer>
          <path
            d="M-50 570C210 580 305 470 480 445S800 415 940 322 1260 258 1490 204V840H-50Z"
            fill="#eadfb9"
          />
          <path
            d="M-50 570C210 580 305 470 480 445S800 415 940 322 1260 258 1490 204"
            stroke="#eaf4df"
            strokeWidth="11"
          />
          <path
            d="M-50 558C210 568 305 458 480 433S800 403 940 310 1260 246 1490 192"
            stroke="#87aaa0"
            strokeWidth="1.1"
          />
        </g>
        <g data-road-layer>
          <path d={route} stroke="#252525" strokeWidth="100" />
          <path d={route} stroke="#f2ede2" strokeWidth="97" />
          <path d={route} stroke="#fffaf0" strokeWidth="2" strokeDasharray="24 23" />
          <path d="M470 560 302 405M931 431l190 122" stroke="#252525" strokeWidth="54" />
          <path d="M470 560 302 405M931 431l190 122" stroke="#f2ede2" strokeWidth="51" />
          <path
            d="M470 560 302 405M931 431l190 122"
            stroke="#fffaf0"
            strokeWidth="2"
            strokeDasharray="18 16"
          />
        </g>
        <g data-road-layer stroke="#5e776e" strokeWidth="2.1" strokeLinecap="round">
          <path d="M-50 630C155 636 290 529 465 486S765 447 910 357 1240 281 1480 222M-50 641C155 647 290 540 465 497S765 458 910 368 1240 292 1480 233" />
          {[
            [40, 629],
            [160, 610],
            [280, 570],
            [400, 525],
            [520, 484],
            [640, 465],
            [760, 433],
            [880, 382],
            [1000, 330],
            [1120, 299],
            [1240, 280],
            [1360, 254],
          ].map(([x, y]) => (
            <path key={x} d={`M${x} ${y}v30`} />
          ))}
        </g>
      </svg>
      <svg
        viewBox="0 0 390 980"
        preserveAspectRatio="none"
        className={styles.roadDrawingMobile}
        fill="none"
      >
        <g data-road-layer>
          <path d="M-50 200 450 420V980H-50Z" fill="#eadfb9" />
          <path d="M-50 200 450 420" stroke="#eaf4df" strokeWidth="10" />
        </g>
        <g data-road-layer>
          <path
            d="M-50 260 450 470M-50 600 450 810M-50 960 450 800"
            stroke="#252525"
            strokeWidth="64"
          />
          <path
            d="M-50 260 450 470M-50 600 450 810M-50 960 450 800"
            stroke="#f2ede2"
            strokeWidth="62"
          />
          <path
            d="M-50 260 450 470M-50 600 450 810M-50 960 450 800"
            stroke="#fffaf0"
            strokeWidth="2"
            strokeDasharray="18 18"
          />
          <path d="M-50 216 450 426" stroke="#5e776e" strokeWidth="2" />
        </g>
      </svg>
      <div className={styles.roadPines}>
        {[0, 1, 2, 3].map((i) => (
          <div data-road-tree key={i}>
            <CoastalPine />
          </div>
        ))}
      </div>
      <div className={styles.roadCar} data-road-prop>
        <Vehicle blue />
      </div>
      <div className={styles.roadPersonOne} data-road-person>
        <PersonGround />
        <ITPerson pose="wave" />
      </div>
      <div className={styles.roadPersonTwo} data-road-person>
        <PersonGround />
        <ITPerson />
      </div>
      <div className={styles.roadRouteMarker} data-road-prop>
        <svg viewBox="0 0 70 100" fill="none">
          <path d="M33 45v52h5V45" fill="#fffaf0" stroke="#252525" />
          <path d="M8 8Q35-3 62 8l-9 32q-18 13-36 0Z" fill="#729aaf" stroke="#252525" />
          <text
            x="35"
            y="30"
            textAnchor="middle"
            fill="white"
            fontSize="17"
            fontFamily="sans-serif"
          >
            134
          </text>
        </svg>
      </div>
    </div>
  );
}
