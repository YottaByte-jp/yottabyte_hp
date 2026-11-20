import type { ReactNode } from 'react';

function Screen({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 1040 900"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="2.4"
      strokeLinejoin="round"
    >
      <g transform="translate(32 150) skewY(-8)">{children}</g>
    </svg>
  );
}

export function BrowserFrame() {
  return (
    <Screen>
      <rect x="14" y="16" width="920" height="590" rx="18" fill="#c4dfd0" />
      <rect width="920" height="590" rx="18" fill="#fffaf0" />
      <path d="M18 0h884q18 0 18 18v42H0V18Q0 0 18 0Z" fill="#e0ece4" />
      <path d="M0 60h920" />
      <circle cx="30" cy="30" r="6" fill="#d48476" />
      <circle cx="52" cy="30" r="6" fill="#f2d080" />
      <circle cx="74" cy="30" r="6" fill="#8bb27d" />
      <rect x="166" y="17" width="548" height="26" rx="7" fill="white" strokeWidth="1.5" />
      <path d="M187 30h182m484-7h27m-27 8h27m-27 8h27" stroke="#78918a" strokeWidth="3" />
    </Screen>
  );
}

export function SystemNavigation() {
  return (
    <Screen>
      <rect x="20" y="80" width="150" height="489" rx="8" fill="#e0ecdf" stroke="none" />
      <path d="M38 109h85m-85 9h56" stroke="#3f7160" strokeWidth="7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="36"
            y={164 + i * 61}
            width="18"
            height="18"
            rx="4"
            fill={i === 0 ? '#95bea7' : '#fffaf0'}
            strokeWidth="1.7"
          />
          <path d={`M67 ${173 + i * 61}h76`} stroke="#6a8578" strokeWidth="4" />
        </g>
      ))}
      <text
        x="202"
        y="111"
        fill="#252525"
        stroke="none"
        fontSize="21"
        fontWeight="700"
        letterSpacing="2"
      >
        WORKSPACE
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={202 + i * 238}
            y="130"
            width="220"
            height="45"
            rx="7"
            fill={['#d6e8ef', '#e1ead2', '#f3dfbb'][i]}
            strokeWidth="1.5"
          />
          <path d={`M${220 + i * 238} 145h90m-90 15h139`} stroke="#6e8c83" strokeWidth="3" />
        </g>
      ))}
    </Screen>
  );
}

export function SystemTable() {
  return (
    <Screen>
      <rect x="202" y="198" width="446" height="349" rx="10" fill="white" />
      <path d="M213 198h424q11 0 11 11v32H202v-32q0-11 11-11Z" fill="#d4e8e2" />
      <path d="M220 219h153m47 0h70m47 0h86" stroke="#739185" strokeWidth="4" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M202 ${294 + i * 51}h446`} stroke="#d2dad2" strokeWidth="1.4" />
          <circle
            cx="229"
            cy={268 + i * 51}
            r="6"
            fill={i < 3 ? '#94b69b' : '#ecc16e'}
            strokeWidth="1.5"
          />
          <path d={`M250 ${267 + i * 51}h128m-128 10h88`} stroke="#8b9992" strokeWidth="3" />
          <rect
            x="425"
            y={257 + i * 51}
            width="93"
            height="22"
            rx="9"
            fill={i % 2 ? '#f4e1bc' : '#e1ecdf'}
            stroke="none"
          />
          <path d={`M560 ${269 + i * 51}h59`} stroke="#8b9992" strokeWidth="3" />
        </g>
      ))}
    </Screen>
  );
}

export function SystemChart() {
  return (
    <Screen>
      <rect x="670" y="198" width="225" height="349" rx="10" fill="white" />
      <path d="M691 222h113m-113 12h79M692 463h182M699 273v190" stroke="#81998c" strokeWidth="2" />
      {[76, 131, 102, 174].map((height, i) => (
        <rect
          key={i}
          x={716 + i * 39}
          y={461 - height}
          width="25"
          height={height}
          rx="3"
          fill={['#a0c1ac', '#a6c9d6', '#ecc16e', '#86ad94'][i]}
          strokeWidth="1.6"
        />
      ))}
      <path d="M693 493h165m-165 13h139m-139 14h102" stroke="#9ca99e" strokeWidth="3" />
    </Screen>
  );
}

function CoastPicture({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 360 200"
      preserveAspectRatio="none"
      fill="none"
      stroke="#394d46"
      strokeWidth="1.5"
    >
      <path d="M0 0h360v200H0Z" fill="#e1f1f4" stroke="none" />
      <path d="M0 88Q63 35 128 79Q161 56 211 91H360v109H0Z" fill="#c6d8b6" />
      <path d="M0 120Q104 72 192 104T360 95V200H0Z" fill="#b6dce7" />
      <path d="M0 123Q92 87 153 110L86 141Q40 158 0 165Z" fill="#f3e4c2" />
      <path
        d="M0 131Q80 99 129 113M122 166q30-6 57 0m55-39q23-5 46-1m6 47q24-4 47 0"
        stroke="#fffaf0"
      />
      <path
        d="M240 142v-57l-23 51Zm5-57 23 51-23 7Zm-32 63q25 7 59-5l-8 12q-27 8-44 1Z"
        fill="#fffaf0"
      />
      <path d="M91 94V65h8v29m-11-29h14l-7-7Z" fill="#fffaf0" />
    </svg>
  );
}

export function WebsiteHero() {
  return (
    <Screen>
      <circle cx="42" cy="95" r="11" fill="#b6d5c5" />
      <path
        d="M65 93h102m-102 9h68m394-6h67m40 0h67m40 0h67m40 0h67"
        stroke="#536e62"
        strokeWidth="4"
      />
      <CoastPicture x={28} y={132} width={467} height={221} />
      <path d="M531 158h310m-310 23h269m-269 24h292" stroke="#303d37" strokeWidth="10" />
      <path d="M531 237h323m-323 12h302m-302 12h255" stroke="#8f9c91" strokeWidth="3" />
      <rect x="531" y="291" width="182" height="38" rx="7" fill="#d6826d" strokeWidth="1.7" />
      <path d="M552 310h115m14-5 7 5-7 5" stroke="#fffaf0" strokeWidth="3" />
    </Screen>
  );
}

export function WebsiteSections() {
  return (
    <Screen>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={28 + i * 292}
            y="390"
            width="274"
            height="159"
            rx="8"
            fill="white"
            strokeWidth="1.7"
          />
          <rect
            x={42 + i * 292}
            y="404"
            width="246"
            height="71"
            rx="4"
            fill={['#d2e6e0', '#d3e8f0', '#f1e1be'][i]}
            stroke="none"
          />
          <path
            d={`M${57 + i * 292} 445l45-27 43 39 37-22 54 40`}
            stroke="#89aa9a"
            strokeWidth="2"
          />
          <path
            d={`M${45 + i * 292} 495h188m-188 17h225m-225 13h175`}
            stroke="#8c9c91"
            strokeWidth="3"
          />
        </g>
      ))}
    </Screen>
  );
}

export function AIPanel() {
  return (
    <svg
      viewBox="0 0 330 340"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="2.5"
      strokeLinejoin="round"
    >
      <g transform="translate(10 5) skewY(-5)">
        <rect x="14" y="22" width="285" height="280" rx="17" fill="#bbd9ca" />
        <rect x="4" y="12" width="285" height="280" rx="17" fill="#fffaf0" />
        <circle cx="45" cy="54" r="22" fill="#d1e6d8" />
        <text x="30" y="62" fill="#252525" stroke="none" fontSize="24" fontWeight="700">
          AI
        </text>
        <path d="M81 47h145m-145 15h100" stroke="#81988a" strokeWidth="4" />
        <rect x="28" y="93" width="221" height="61" rx="12" fill="#d8ecf2" strokeWidth="1.5" />
        <path d="M47 115h170m-170 14h128" stroke="#739aa7" strokeWidth="3" />
        <path
          d="M72 174h182q12 0 12 12v60q0 12-12 12H72l-19 10 6-23v-59q0-12 13-12Z"
          fill="#e0ebd7"
          strokeWidth="1.5"
        />
        <path d="M81 198h161m-161 15h144m-144 15h115" stroke="#829a74" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function MobileWebsite() {
  return (
    <svg
      viewBox="0 0 260 510"
      fill="none"
      aria-hidden="true"
      stroke="#252525"
      strokeWidth="2.5"
      strokeLinejoin="round"
    >
      <rect x="25" y="20" width="224" height="479" rx="29" fill="#c3ddcf" />
      <rect x="14" y="10" width="224" height="479" rx="29" fill="#fffaf0" />
      <path d="M94 31h64" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 65h194v375H29Z" fill="white" strokeWidth="1.5" />
      <path d="M43 80h77m72-3h17m-17 6h17" stroke="#567569" strokeWidth="3" />
      <CoastPicture x={30} y={95} width={192} height={119} />
      <path d="M44 237h156m-156 14h124" stroke="#43564d" strokeWidth="6" />
      <path d="M44 273h158m-158 11h146" stroke="#94a298" strokeWidth="2.5" />
      <rect x="44" y="305" width="155" height="23" rx="5" fill="#d6826d" strokeWidth="1.5" />
      <path d="M62 317h114" stroke="#fffaf0" strokeWidth="3" />
      <rect x="44" y="349" width="70" height="44" fill="#d1e5de" strokeWidth="1.5" />
      <rect x="129" y="349" width="70" height="44" fill="#d2e7ee" strokeWidth="1.5" />
      <path
        d="M44 406h70m15 0h70M44 418h61m24 0h65M96 464h61"
        stroke="#8a9c90"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PeopleGround() {
  return (
    <svg viewBox="0 0 600 100" fill="none" aria-hidden="true">
      <ellipse
        cx="300"
        cy="50"
        rx="290"
        ry="42"
        fill="#c5e3ce"
        stroke="#9fbea8"
        strokeWidth="1.5"
      />
    </svg>
  );
}
