import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import images from './component-images.json';
import { Worker } from './ReferenceParts';
import styles from './shonan.module.css';

export type TownScene = 'development' | 'automation' | 'ai';
type Side = 'left' | 'right';
type Artwork = keyof typeof images;
type Part = {
  id: string;
  kind: 'architecture' | 'prop' | 'vehicle' | 'person';
  step?: number;
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  node: ReactNode;
};
const canvas = { left: { w: 1190, h: 719 }, right: { w: 1222, h: 1390 } };

function ArtPicture({
  art,
  entrance = false,
  className = '',
}: {
  art: Artwork;
  entrance?: boolean;
  className?: string;
}) {
  const dimensions = images[art];
  return (
    <picture className={`${styles.componentImage} ${className}`}>
      <source srcSet={`/illustrations/shonan-components/${art}.avif`} type="image/avif" />
      <Image
        src={`/illustrations/shonan-components/${art}.webp`}
        width={dimensions.width}
        height={dimensions.height}
        alt=""
        unoptimized
        loading={entrance ? 'eager' : 'lazy'}
        fetchPriority={entrance ? 'high' : 'auto'}
        draggable={false}
      />
    </picture>
  );
}

function Tree({ kind = 0 }: { kind?: number }) {
  return (
    <svg
      viewBox="0 0 100 170"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M43 109h15v51q-7 7-15 0Z" fill="#d5c9a8" />
      {kind % 3 === 0 ? (
        <path
          d="M51 27C21 26 9 49 10 76C9 104 23 124 50 125C80 126 94 102 92 78C94 52 76 26 51 27Z"
          fill="#9cc765"
        />
      ) : kind % 3 === 1 ? (
        <path d="M44 10Q51-3 59 10L89 124Q96 148 51 151Q7 149 13 125Z" fill="#4e8d39" />
      ) : (
        <path
          d="M26 114C4 104 1 81 15 67C3 45 16 27 35 25C33 2 68-2 74 22C95 21 99 44 88 58C110 77 97 114 76 119C60 130 41 126 26 114Z"
          fill="#659c43"
        />
      )}
    </svg>
  );
}

function House({ roof = '#bfdfcb', gabled = false }: { roof?: string; gabled?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M13 87L158 148V265L13 205Z" fill="#fffaf0" />
      <path d="M158 148L269 86V203L158 265Z" fill="#fff" />
      {gabled ? (
        <>
          <path d="M8 89L91 8L275 84L190 164Z" fill={roof} />
          <path d="M13 87L91 8L158 148Z" fill="#fffaf0" />
        </>
      ) : (
        <path d="M13 87L122 21L269 86L158 148Z" fill={roof} />
      )}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${33 + i * 37} ${118 + i * 16}l23 10v36l-23-10Z`} fill="#d9edf7" />
      ))}
      <path d="M180 163l31-18v44l-31 18Zm49-28l25-14v44l-25 14Z" fill="#d9edf7" />
      <path d="M175 220l36-20v34l-36 20Z" fill="#d0e6da" />
      <path d="M24 179l111 47v16L24 195Z" fill="#fff" />
      <path d="M224 198l31-18v25l-31 17Z" fill="#d9edf7" />
    </svg>
  );
}

function Tower() {
  return (
    <svg
      viewBox="0 0 180 400"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 98l74-43 82 40-75 43Z" fill="#d1eadc" />
      <path d="M12 98l81 40v244l-81-44Z" fill="#e6f1e8" />
      <path d="M93 138l75-43v244l-75 43Z" fill="#fff" />
      <path d="M30 62L94 25l57 29-63 38Z" fill="#fffaf0" />
      <path d="M30 62l58 30v55l-58-31Z" fill="#c3dfcf" />
      <path d="M88 92l63-38v56l-63 37Z" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${28 + i * 21} ${137 + i * 10}l10 5v161l-10-5Z`} fill="#accdbd" />
      ))}
      <path
        d="M110 163l38-22v20l-38 22Zm0 49l38-22v20l-38 22Zm0 49l38-22v20l-38 22Z"
        fill="#d9edf7"
      />
    </svg>
  );
}

function Pavilion() {
  return (
    <svg
      viewBox="0 0 400 220"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M17 78Q194-18 384 58L356 105Q193 35 48 126Z" fill="#9ac65a" />
      <path d="M48 126Q193 35 356 105V198Q196 125 48 218Z" fill="#e9e1bf" />
      <path d="M17 78L48 126V218L17 164Z" fill="#d9d5b8" />
      <path d="M181 175V133Q181 98 214 99Q245 100 245 133V175" fill="#f9f2d8" />
      <path
        d="M85 147v-17q0-13 14-15q14-2 14 12v17Zm51-26v-14q0-11 13-12q12-1 12 11v12Zm137-5v-15q0-12 13-9q13 3 13 15v14Zm47 20v-16q0-12 12-7q12 4 12 16v15Z"
        fill="#fffaf0"
      />
    </svg>
  );
}

function Vehicle({ blue = false }: { blue?: boolean }) {
  const color = blue ? '#7cb7c7' : '#fffaf0';
  return (
    <svg
      viewBox="0 0 190 155"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M11 61l41-39 26-7 91 46 8 43-33 34L19 93Z" fill={color} />
      <path d="M52 22l82 43 35-4M134 65l10 73M19 93l125 45" />
      <path
        d="M21 58l20-20 22 11-11 28Zm48-7l50 25 5 23-55-28Zm77 24l17-4 4 29-19 19Z"
        fill="#d9edf2"
      />
      <path d="M58 83l4 3m79 35l29-23M23 82l24 13" />
      <ellipse cx="47" cy="105" rx="11" ry="16" transform="rotate(-25 47 105)" fill="#686e6d" />
      <ellipse cx="128" cy="140" rx="11" ry="15" transform="rotate(-25 128 140)" fill="#686e6d" />
      <path d="M78 104l23 12m-23-7l23 12" stroke="#6b916b" strokeWidth="2.5" />
    </svg>
  );
}

function Sailboat() {
  return (
    <svg
      viewBox="0 0 150 190"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <g className={styles.boatSway}>
        <path d="M72 9v143M68 16L18 134l50-7Zm9 5l47 105-47 15Z" fill="#fff" />
        <path d="M8 150q57 13 131-13l-15 29q-51 22-99 5Z" fill="#d88379" />
        <path d="M8 150q57 13 131-13l-4 9q-67 29-120 16Z" fill="#fffaf0" />
      </g>
    </svg>
  );
}

function Pole() {
  return (
    <svg viewBox="0 0 65 210" fill="none" aria-hidden="true" stroke="#252525" strokeWidth="1.4">
      <path d="M30 37h6l5 168q-8 5-16 0Z" fill="#fff" />
      <path d="M33 38L11 32l2-17 20 11 22-15 4 12-24 15Z" fill="#fffaf0" />
      <g className={styles.signalPulse}>
        <path d="M13 6q20-11 40 0M20 15q13-7 25 0" stroke="#5b926f" />
      </g>
    </svg>
  );
}

function CoastalHeadland() {
  return (
    <svg
      viewBox="0 0 300 180"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path
        d="M13 134Q48 109 77 111Q84 70 121 68Q159 27 199 64Q236 62 260 109L290 130Q197 165 93 155Z"
        fill="#d7d3bd"
      />
      <path
        d="M19 130Q63 111 87 111Q96 76 122 76Q157 45 192 73Q230 70 261 116L280 130Q205 145 144 140Q89 147 19 130Z"
        fill="#8cae70"
      />
      <path d="M177 21h12l3 61q-9 5-18 0Z" fill="#fffaf0" />
      <path d="M173 15h20v9h-20Zm4-7h12v7h-12Z" fill="#e0edf0" />
      <path d="m172 8 11-7 11 7Zm0 17h22M181 32v33M62 129l-7 11m172-9 9 12m-107-1-2 12" />
      <path d="M94 105q22 7 34-6t30-5m33 10 28 7" stroke="#537e51" />
      <path d="M14 161q49 12 97 4m82-2q48 1 86-14" stroke="#629caa" />
    </svg>
  );
}

function CoastalPine() {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M82 167q10-41 3-82l-18-24 7-6 19 20 22-31 7 4-24 42q7 40-4 81Z" fill="#c8ba94" />
      <path
        d="M23 76Q1 67 14 51Q12 32 37 31Q40 10 62 24Q78 9 96 24Q123 13 133 34Q155 33 153 52Q163 72 136 77Q109 87 89 75Q59 89 23 76Z"
        fill="#6d9950"
      />
      <path d="M22 52q26 8 43-4m24-11q21 10 43 6M51 68q27-7 44-5" stroke="#466d3c" />
    </svg>
  );
}

function CoastalWater({ gull = false }: { gull?: boolean }) {
  return gull ? (
    <svg viewBox="0 0 100 40" fill="none" aria-hidden="true" stroke="#252525" strokeWidth="1.6">
      <g className={styles.coastalGull}>
        <path d="M7 21q17-20 37 0q20-19 39-2M65 6q7-7 15 0q8-7 15 0" />
      </g>
    </svg>
  ) : (
    <svg
      viewBox="0 0 180 70"
      fill="none"
      aria-hidden="true"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <g className={styles.coastalRipple}>
        <path d="M6 15q28 8 56 0m25 1q37 9 75-2M32 42q46 11 89-1" stroke="#fff" />
        <path d="M1 22q27 8 48 1m60 28q26 6 51-2" stroke="#79abb4" />
      </g>
    </svg>
  );
}

function Ground({ side }: { side: Side }) {
  return side === 'left' ? (
    <svg viewBox="0 0 1190 719" className={styles.townGround} aria-hidden="true" data-town-ground>
      <path
        d="M-25 80C140-35 210-25 370 60L567 146C672 67 748 119 902 196L1125 279C1258 301 1280 384 1180 424L733 552C552 682 288 735 15 719L-25 650Z"
        fill="#c7e5eb"
        stroke="#252525"
        strokeWidth="1.3"
      />
      <path
        d="M-25 350C150 335 298 315 430 246C555 163 659 151 820 244L1125 309C1258 331 1280 384 1180 424L733 552C552 682 288 735 15 719L-25 650Z"
        fill="#d8ead9"
        stroke="#252525"
        strokeWidth="1.3"
      />
      <path
        d="M-25 319C148 304 282 284 412 216C544 126 663 117 835 216L1140 280L1125 309L820 244C659 151 555 163 430 246C298 315 150 335-25 350Z"
        fill="#f7e6bc"
        stroke="#252525"
        strokeWidth="1.3"
      />
      <path
        d="M-25 299C148 284 270 266 400 198C539 104 666 96 845 197L1148 260"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M-30 585C200 610 377 550 510 497S788 395 1235 312"
        fill="none"
        stroke="#252525"
        strokeWidth="58"
      />
      <path
        d="M-30 585C200 610 377 550 510 497S788 395 1235 312"
        fill="none"
        stroke="#fff"
        strokeWidth="55"
      />
      <path
        d="M350 542Q427 455 392 383Q340 320 228 322"
        fill="none"
        stroke="#252525"
        strokeWidth="38"
      />
      <path
        d="M350 542Q427 455 392 383Q340 320 228 322"
        fill="none"
        stroke="#fff"
        strokeWidth="35"
      />
      <g stroke="#79abb4" fill="none" strokeWidth="1.1">
        <path d="M25 205q35 8 69 0m40-80q32 7 63-1m-192 146q36 7 71-2m161-93q38 7 71-2" />
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 1222 1390" className={styles.townGround} aria-hidden="true" data-town-ground>
      <path
        d="M1235 2C1128-22 1045 45 988 121C894 88 811 109 749 185L646 325C567 374 500 418 395 462C292 490 222 465 166 538C102 612 29 659 5 738C-20 824 86 867 203 888C337 911 457 887 546 949C624 1007 591 1095 641 1198C692 1329 933 1391 1235 1387Z"
        fill="#d8ead9"
        stroke="#252525"
        strokeWidth="1.3"
      />
      <path
        d="M1179 151Q1093 163 1102 252L1219 311L1235 593V1125Q1190 1129 1172 1071L1190 648L1168 428L1194 282Z"
        fill="#cce7ed"
        stroke="#252525"
        strokeWidth="1.3"
      />
      <path
        d="M1232 325C1097 319 1096 473 977 526S728 603 662 638S673 748 838 825S989 931 966 1085S968 1251 1240 1288"
        fill="none"
        stroke="#252525"
        strokeWidth="52"
      />
      <path
        d="M1232 325C1097 319 1096 473 977 526S728 603 662 638S673 748 838 825S989 931 966 1085S968 1251 1240 1288"
        fill="none"
        stroke="#fff"
        strokeWidth="49"
      />
      <ellipse
        cx="352"
        cy="755"
        rx="224"
        ry="140"
        fill="#c0e6cc"
        stroke="#92ac98"
        strokeWidth="1.2"
      />
      <path d="M548 920Q636 1022 646 1157" fill="none" stroke="#252525" strokeWidth="38" />
      <path d="M548 920Q636 1022 646 1157" fill="none" stroke="#fff" strokeWidth="35" />
      <g fill="none" stroke="#fff" strokeWidth="2">
        <path d="M1209 518q-14-7-28 1M1209 681q-14-7-28 1M1201 852q-14-7-28 1M1201 1030q-14-7-28 1" />
      </g>
    </svg>
  );
}

function scene(side: Side, entrance: boolean): Part[] {
  const photo = (art: Artwork) => <ArtPicture art={art} entrance={entrance} />;
  const tree = (id: string, x: number, y: number, h: number, kind: number): Part => ({
    id,
    kind: 'prop',
    step: 3,
    x,
    y,
    w: h * 0.59,
    h,
    node: <Tree kind={kind} />,
  });
  if (side === 'left')
    return [
      {
        id: 'shonan-headland',
        kind: 'prop',
        step: 2,
        x: 375,
        y: 5,
        w: 235,
        h: 141,
        node: <CoastalHeadland />,
      },
      {
        id: 'coastal-wave-near',
        kind: 'prop',
        step: 3,
        x: 80,
        y: 195,
        w: 180,
        h: 70,
        node: <CoastalWater />,
      },
      {
        id: 'coastal-wave-far',
        kind: 'prop',
        step: 3,
        x: 220,
        y: 80,
        w: 120,
        h: 47,
        node: <CoastalWater />,
      },
      {
        id: 'coastal-gulls',
        kind: 'prop',
        step: 3,
        x: 695,
        y: 5,
        w: 115,
        h: 46,
        node: <CoastalWater gull />,
      },
      {
        id: 'neighborhood-office',
        kind: 'architecture',
        step: 1,
        x: 680,
        y: 230,
        w: 245,
        h: 220,
        node: <House />,
      },
      {
        id: 'local-shop',
        kind: 'architecture',
        step: 1,
        x: 445,
        y: 170,
        w: 285,
        h: 300,
        node: photo('coastal-shop'),
      },
      {
        id: 'development-studio',
        kind: 'architecture',
        step: 1,
        x: -70,
        y: 325,
        w: 540,
        h: 360,
        node: photo('development-studio'),
      },
      {
        id: 'delivery-van',
        kind: 'vehicle',
        step: 2,
        x: 345,
        y: 260,
        w: 145,
        h: 122,
        node: <Vehicle />,
      },
      {
        id: 'sailing',
        kind: 'vehicle',
        step: 2,
        x: 105,
        y: 80,
        w: 85,
        h: 110,
        z: 400,
        node: <Sailboat />,
      },
      { id: 'coastal-wifi', kind: 'prop', step: 2, x: 890, y: 275, w: 51, h: 195, node: <Pole /> },
      {
        id: 'shore-pine',
        kind: 'prop',
        step: 3,
        x: 320,
        y: 165,
        w: 125,
        h: 141,
        node: <CoastalPine />,
      },
      tree('shop-tree', 770, 278, 126, 0),
      tree('shop-cone', 817, 275, 152, 1),
      tree('edge-clover', 906, 307, 143, 2),
      tree('studio-cone', 21, 548, 145, 1),
      tree('studio-round', 65, 565, 130, 0),
      {
        id: 'consultation',
        kind: 'person',
        x: 423,
        y: 305,
        w: 100,
        h: 145,
        node: photo('people-tablet'),
      },
      {
        id: 'coastal-surfer',
        kind: 'person',
        x: 265,
        y: 227,
        w: 64,
        h: 90,
        node: photo('people-surfer'),
      },
      { id: 'studio-developer', kind: 'person', x: 278, y: 446, w: 48, h: 96, node: <Worker /> },
    ];
  return [
    {
      id: 'campus-tower',
      kind: 'architecture',
      step: 2,
      x: 810,
      y: 65,
      w: 158,
      h: 375,
      node: <Tower />,
    },
    {
      id: 'campus-wing',
      kind: 'architecture',
      step: 2,
      x: 1010,
      y: 125,
      w: 245,
      h: 310,
      node: <House />,
    },
    {
      id: 'it-campus',
      kind: 'architecture',
      step: 1,
      x: 540,
      y: 150,
      w: 710,
      h: 505,
      node: photo('it-campus'),
    },
    {
      id: 'neighborhood-office',
      kind: 'architecture',
      step: 1,
      x: 319,
      y: 302,
      w: 231,
      h: 237,
      node: <House />,
    },
    {
      id: 'community-pavilion',
      kind: 'architecture',
      step: 1,
      x: 88,
      y: 478,
      w: 370,
      h: 203,
      node: <Pavilion />,
    },
    {
      id: 'connected-shop',
      kind: 'architecture',
      step: 2,
      x: 735,
      y: 630,
      w: 184,
      h: 184,
      node: <House roof="#b0d6aa" />,
    },
    {
      id: 'coastal-house',
      kind: 'architecture',
      step: 3,
      x: 1040,
      y: 744,
      w: 215,
      h: 190,
      node: <House roof="#8fbd60" gabled />,
    },
    {
      id: 'ai-learning-studio',
      kind: 'architecture',
      step: 1,
      x: 625,
      y: 845,
      w: 480,
      h: 320,
      node: photo('ai-learning-studio'),
    },
    {
      id: 'lower-village',
      kind: 'architecture',
      step: 3,
      x: 920,
      y: 1145,
      w: 270,
      h: 245,
      node: <House roof="#d8a266" gabled />,
    },
    {
      id: 'lower-office',
      kind: 'architecture',
      step: 3,
      x: 665,
      y: 1185,
      w: 206,
      h: 185,
      node: <House />,
    },
    { id: 'park-van', kind: 'vehicle', step: 2, x: 330, y: 735, w: 155, h: 130, node: <Vehicle /> },
    {
      id: 'campus-blue-car',
      kind: 'vehicle',
      step: 2,
      x: 660,
      y: 650,
      w: 140,
      h: 115,
      node: <Vehicle blue />,
    },
    { id: 'shop-van', kind: 'vehicle', step: 2, x: 900, y: 605, w: 123, h: 103, node: <Vehicle /> },
    {
      id: 'marina-sailboat',
      kind: 'vehicle',
      step: 3,
      x: 1137,
      y: 107,
      w: 110,
      h: 140,
      node: <Sailboat />,
    },
    { id: 'park-wifi', kind: 'prop', step: 2, x: 40, y: 550, w: 53, h: 195, node: <Pole /> },
    { id: 'campus-wifi', kind: 'prop', step: 2, x: 800, y: 480, w: 45, h: 170, node: <Pole /> },
    tree('campus-west-tree', 555, 230, 165, 2),
    tree('campus-west-round', 512, 275, 150, 0),
    tree('campus-east-tree', 1173, 335, 177, 1),
    tree('campus-back-tree', 760, 40, 143, 0),
    tree('park-west-tree', 88, 605, 155, 0),
    tree('park-west-pine', 140, 570, 166, 1),
    tree('park-east-tree', 579, 594, 168, 2),
    tree('park-east-pine', 619, 636, 179, 1),
    tree('shop-round', 955, 709, 144, 0),
    tree('school-west-tree', 566, 850, 154, 2),
    tree('school-pine', 1061, 970, 157, 1),
    tree('village-round', 834, 1127, 142, 0),
    {
      id: 'park-tablet-consultation',
      kind: 'person',
      x: 185,
      y: 640,
      w: 110,
      h: 132,
      node: photo('people-tablet'),
    },
    {
      id: 'park-bench-conversation',
      kind: 'person',
      x: 34,
      y: 745,
      w: 145,
      h: 135,
      node: photo('people-bench'),
    },
    {
      id: 'park-family',
      kind: 'person',
      x: 393,
      y: 557,
      w: 113,
      h: 118,
      node: photo('people-family'),
    },
    {
      id: 'park-surfer',
      kind: 'person',
      x: 465,
      y: 754,
      w: 110,
      h: 140,
      node: photo('people-surfer'),
    },
    {
      id: 'shop-tablet-consultation',
      kind: 'person',
      x: 681,
      y: 707,
      w: 105,
      h: 135,
      node: photo('people-tablet'),
    },
    {
      id: 'school-family',
      kind: 'person',
      x: 995,
      y: 1060,
      w: 100,
      h: 125,
      node: photo('people-family'),
    },
    { id: 'campus-developer', kind: 'person', x: 535, y: 481, w: 55, h: 105, node: <Worker /> },
    { id: 'village-developer', kind: 'person', x: 728, y: 1234, w: 51, h: 101, node: <Worker /> },
  ];
}

export function CoastalTown({
  side,
  className = '',
  entrance = false,
}: {
  side: Side;
  className?: string;
  entrance?: boolean;
}) {
  const size = canvas[side];
  return (
    <div
      className={`${styles.townArt} ${className}`}
      data-town={side}
      data-entrance={entrance || undefined}
    >
      <Ground side={side} />
      {scene(side, entrance).map((part) => (
        <div
          key={part.id}
          className={styles.townPart}
          data-town-part={part.id}
          data-kind={part.kind}
          data-step={part.step}
          style={
            {
              left: `${(part.x / size.w) * 100}%`,
              top: `${(part.y / size.h) * 100}%`,
              width: `${(part.w / size.w) * 100}%`,
              height: `${(part.h / size.h) * 100}%`,
              zIndex: part.z ?? (part.kind === 'person' ? 5000 : 0) + Math.round(part.y + part.h),
            } as CSSProperties
          }
        >
          {part.node}
        </div>
      ))}
    </div>
  );
}

export function SceneDetail({ scene }: { scene: TownScene }) {
  return (
    <ArtPicture
      art={
        scene === 'development'
          ? 'development-studio'
          : scene === 'automation'
            ? 'coastal-shop'
            : 'ai-learning-studio'
      }
      className={styles.sceneDetail}
    />
  );
}

export { Tree, Vehicle };
