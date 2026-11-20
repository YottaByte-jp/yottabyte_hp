'use client';

import Link from 'next/link';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import styles from './HeroStories.module.css';

const stories = [
  {
    id: 'automation',
    worry: 'この転記、なくしたい。',
    result: '入力は、一度で。情報がひとつにつながる。',
    description: '予約・売上・顧客の情報が、ひとつの一覧にまとまるイメージ。',
  },
  {
    id: 'knowledge',
    worry: 'あの資料、どこだっけ？',
    result: '探す時間を減らして、次の仕事へ。',
    description: '資料の中から、質問に合うガイドと出典が見つかるイメージ。',
  },
  {
    id: 'website',
    worry: 'お店の魅力を伝えたい。',
    result: 'お店らしさが、どの画面にも伝わる。',
    description: '海辺のお店のホームページが組み上がり、スマートフォンにも表示されるイメージ。',
  },
  {
    id: 'app',
    worry: 'このアイデア、アプリにしたい。',
    result: '思いついたことが、手のひらで動き出す。',
    description: 'アイデアのメモからモバイルアプリが形になり、タップすると次の画面へ進むイメージ。',
  },
  {
    id: 'overview',
    worry: '予約も売上も、まとめて見たい。',
    result: '今日の予約も売上も、ひと目でわかる。',
    description:
      '別々に確認していた予約表と売上の数字が、お店の状況を見渡せるひとつの画面にまとまるイメージ。',
  },
] as const;
type StoryId = (typeof stories)[number]['id'];

function AutomationScene() {
  return (
    <>
      <g className={styles.sources}>
        {['予約', '売上', '顧客'].map((label, i) => (
          <g key={label} transform={`translate(20 ${23 + i * 47})`}>
            <rect width="70" height="37" rx="5" fill={i === 1 ? '#ffe2a0' : '#eefbff'} />
            <path d="M11 25h22m5 0h19" />
            <text x="11" y="16">
              {label}
            </text>
          </g>
        ))}
      </g>
      <g className={styles.connections} fill="none" stroke="#5e927f">
        <path d="M91 42h17q8 0 8 8v38h22M91 89h47M91 136h17q8 0 8-8V90h22" />
        <path d="m132 83 6 6-6 6" />
      </g>
      <g fill="#e43200" stroke="none" aria-hidden="true">
        <circle className={styles.flowTop} cx="91" cy="42" r="3" />
        <circle className={styles.flowMiddle} cx="91" cy="89" r="3" />
        <circle className={styles.flowBottom} cx="91" cy="136" r="3" />
      </g>
      <g className={styles.result}>
        <rect x="146" y="25" width="143" height="126" rx="7" fill="#fff" />
        <path d="M146 51h143" />
        <circle cx="158" cy="38" r="2" fill="#e43200" stroke="none" />
        <text x="170" y="42">
          ひとつの一覧に
        </text>
        <path d="M158 72h58m-58 24h68m-68 24h51" />
        {[72, 96, 120].map((y) => (
          <g key={y} className={styles.checks}>
            <circle cx="269" cy={y - 2} r="8" fill="#b4e5cc" stroke="none" />
            <path d={`m265 ${y - 2} 3 3 5-6`} fill="none" />
          </g>
        ))}
      </g>
    </>
  );
}

function KnowledgeScene() {
  return (
    <>
      <g className={styles.documents}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${36 + i * 92} ${i % 2 ? 38 : 29})`}>
            <path d="M0 0h33l13 13v45H0Z" fill={i === 1 ? '#ffe2a0' : '#d8ead9'} />
            <path d="M33 0v13h13M10 27h25M10 36h19M10 45h25" />
          </g>
        ))}
      </g>
      <g className={styles.search}>
        <rect x="26" y="18" width="258" height="38" rx="19" fill="#fff" />
        <circle cx="47" cy="36" r="6" fill="none" />
        <path d="m51 41 5 5" />
        <text className={styles.query} x="68" y="41">
          申請のルールを知りたい
        </text>
      </g>
      <g className={styles.answer}>
        <path d="M39 75h232v79H39Z" fill="#b4e5cc" />
        <path d="m54 92 4 4 7-8" fill="none" />
        <text x="76" y="96" className={styles.svgHeading}>
          申請ガイドが見つかりました
        </text>
        <path d="M54 112h198M54 123h156" stroke="#5e927f" />
        <text x="54" y="143">
          参照元：社内マニュアル
        </text>
      </g>
    </>
  );
}

function WebsiteScene() {
  return (
    <>
      <g className={styles.browser}>
        <rect x="20" y="19" width="232" height="137" rx="6" fill="#fff" />
        <path d="M20 35h232" />
        <circle cx="31" cy="27" r="2" fill="#e43200" stroke="none" />
        <path d="M41 27h40" />
        <g className={styles.siteHero}>
          <path d="M31 45h210v66H31Z" fill="#c8e6eb" stroke="none" />
          <path d="M31 94q48-25 106 0t104 0v17H31Z" fill="#f8e7b8" stroke="none" />
          <path d="M42 80q16-8 32 0t32 0M154 76q23-9 46 0" fill="none" stroke="#fff" />
          <circle cx="209" cy="61" r="9" fill="#ffb66a" stroke="none" />
          <text x="43" y="65" className={styles.svgHeading}>
            海のそばの、小さなお店。
          </text>
        </g>
        <g className={styles.siteDetails}>
          <path d="M32 124h98M32 135h72" />
          <rect x="173" y="121" width="66" height="19" rx="9" fill="#b4e5cc" />
          <text x="185" y="134">
            お店を知る
          </text>
        </g>
      </g>
      <g className={styles.phone}>
        <rect x="228" y="57" width="60" height="108" rx="8" fill="#fffaf0" />
        <path d="M249 64h18" />
        <path d="M235 74h46v43h-46Z" fill="#c8e6eb" stroke="none" />
        <path d="M235 104q12-9 23 0t23 0v13h-46Z" fill="#f8e7b8" stroke="none" />
        <circle cx="271" cy="84" r="5" fill="#ffb66a" stroke="none" />
        <path d="M237 129h39M237 137h28" />
        <rect x="237" y="145" width="38" height="9" rx="4" fill="#b4e5cc" stroke="none" />
      </g>
    </>
  );
}

function AppScene() {
  return (
    <>
      <g className={styles.ideaNote}>
        <path d="M23 42h86v99H23Z" fill="#ffe2a0" />
        <path d="M45 42v-6h42v6M38 101h56M38 114h37M38 127h49" />
        <path d="M57 79c-10-9-3-23 8-23s18 14 8 23l-2 6H59ZM60 89h10" fill="#fffaf0" />
        <path d="M65 47v-5M47 55l-4-4M83 55l4-4" />
        <text x="41" y="153">
          アイデア
        </text>
      </g>
      <g className={styles.appArrow} stroke="#5e927f">
        <path d="M119 91h26m-6-6 6 6-6 6" />
      </g>
      <g className={styles.appDevice}>
        <rect x="157" y="10" width="113" height="161" rx="15" fill="#fffaf0" />
        <path d="M199 18h28M202 163h24" />
        <rect x="164" y="26" width="99" height="127" rx="6" fill="#eefbff" />
        <g className={styles.appHome}>
          <text x="174" y="43" className={styles.svgHeading}>
            わたしのアプリ
          </text>
          <path d="M173 51h81v48h-81Z" fill="#b4e5cc" stroke="none" />
          <circle cx="237" cy="64" r="7" fill="#ffb66a" stroke="none" />
          <path d="m179 92 17-20 14 12 11-9 25 17" fill="none" stroke="#5e927f" />
          <path d="M174 110h61M174 120h44" />
          <rect x="174" y="131" width="79" height="14" rx="7" fill="#e43200" stroke="none" />
          <text x="192" y="141" className={styles.svgButton}>
            詳しく見る
          </text>
        </g>
        <g className={styles.appDetail}>
          <path d="m180 36-5 5 5 5M175 41h11" fill="none" />
          <text x="192" y="45" className={styles.svgHeading}>
            もっと詳しく
          </text>
          <path d="M174 55h79v39h-79Z" fill="#b4e5cc" stroke="none" />
          <path d="m181 87 17-20 15 14 11-9 21 15" fill="none" stroke="#5e927f" />
          <path d="M175 105h73M175 116h63M175 127h69M175 138h42" />
        </g>
        <g className={styles.appTap} aria-hidden="true">
          <circle cx="235" cy="137" r="11" fill="#fffaf0" fillOpacity=".7" stroke="#e43200" />
          <circle cx="235" cy="137" r="3" fill="#e43200" stroke="none" />
        </g>
      </g>
    </>
  );
}

function OverviewScene() {
  return (
    <>
      <g className={styles.overviewSources}>
        <g className={styles.bookingSheet}>
          <rect x="22" y="40" width="104" height="111" rx="6" fill="#eefbff" />
          <path d="M22 65h104M44 35v11M104 35v11M38 83h70M38 101h70M38 119h70M64 76v56" />
          <text x="58" y="59">
            予約
          </text>
          <circle cx="88" cy="92" r="5" fill="#b4e5cc" stroke="none" />
        </g>
        <g className={styles.salesSheet}>
          <rect x="179" y="40" width="104" height="111" rx="6" fill="#ffe2a0" />
          <text x="219" y="61">
            売上
          </text>
          <path d="M194 75h74M194 138h74" />
          <path d="M200 130v-16h12v16m9 0V99h12v31m9 0V84h12v46" fill="#fffaf0" />
        </g>
      </g>
      <g className={styles.overviewBoard}>
        <rect x="19" y="20" width="272" height="141" rx="8" fill="#fff" />
        <path d="M19 48h272" />
        <circle cx="32" cy="34" r="3" fill="#e43200" stroke="none" />
        <text x="44" y="38" className={styles.svgHeading}>
          今日のお店
        </text>
        <g className={styles.overviewBookings}>
          <rect x="31" y="60" width="108" height="88" rx="5" fill="#eefbff" />
          <text x="42" y="77">
            今日の予約
          </text>
          <text x="41" y="102" className={styles.svgNumber}>
            8組
          </text>
          <path d="M42 116h83M42 132h83" stroke="#5e927f" />
          <circle cx="120" cy="95" r="8" fill="#b4e5cc" stroke="none" />
          <path d="m116 95 3 3 5-6" fill="none" />
        </g>
        <g className={styles.overviewSales}>
          <rect x="149" y="60" width="130" height="88" rx="5" fill="#d8ead9" />
          <text x="160" y="77">
            今日の売上
          </text>
          <text x="160" y="102" className={styles.svgNumber}>
            ¥48,000
          </text>
          <path d="M161 136h106" stroke="#5e927f" />
          <path
            d="M167 132v-10h13v10m10 0v-17h13v17m10 0v-13h13v13m10 0v-23h13v23"
            fill="#5e927f"
            stroke="none"
          />
        </g>
      </g>
    </>
  );
}

function StoryScene({ story, still }: { story: (typeof stories)[number]; still: boolean }) {
  return (
    <div className={styles.stage} data-still={still}>
      <svg
        viewBox="0 0 310 180"
        role="img"
        aria-label={story.description}
        fill="none"
        stroke="#252525"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {story.id === 'automation' ? <AutomationScene /> : null}
        {story.id === 'knowledge' ? <KnowledgeScene /> : null}
        {story.id === 'website' ? <WebsiteScene /> : null}
        {story.id === 'app' ? <AppScene /> : null}
        {story.id === 'overview' ? <OverviewScene /> : null}
      </svg>
    </div>
  );
}

export function HeroStories({
  still,
  onOpenChange,
}: {
  still: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<StoryId, HTMLButtonElement>>>({});
  const [active, setActive] = useState<StoryId | null>(null);
  const [replay, setReplay] = useState(0);
  const id = useId();

  useLayoutEffect(() => {
    const element = panel.current;
    if (!active || !element) return;
    let frame = 0;
    let shift = 0;
    const fit = () => {
      const header = root.current?.closest('[data-yottabyte-site]')?.querySelector('header');
      const top = Math.max(16, (header?.getBoundingClientRect().height ?? 0) + 12);
      element.style.setProperty('--panel-available', `${Math.max(0, innerHeight - top - 16)}px`);
      const rect = element.getBoundingClientRect();
      const naturalTop = rect.top - shift;
      const fittedTop = Math.max(top, Math.min(naturalTop, innerHeight - 16 - rect.height));
      shift = fittedTop - naturalTop;
      element.style.setProperty('--panel-shift-y', `${shift}px`);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        fit();
      });
    };
    fit();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
    };
  }, [active]);

  useEffect(() => {
    onOpenChange(active !== null);
    return () => onOpenChange(false);
  }, [active, onOpenChange]);

  useEffect(() => {
    if (!active) return;
    const dismiss = (e: PointerEvent) => {
      if (e.target instanceof Node && !root.current?.contains(e.target)) setActive(null);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      setActive(null);
      triggers.current[active]?.focus({ preventScroll: true });
    };
    const hero = root.current?.closest('section');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(null);
    });
    if (hero) observer.observe(hero);
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      observer.disconnect();
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [active]);

  return (
    <div ref={root} className={styles.stories} data-hero-stories>
      {stories.map((story) => {
        const open = active === story.id;
        const titleId = `${id}-${story.id}-title`;
        const panelId = `${id}-${story.id}-panel`;
        return (
          <div className={styles.anchor} data-story={story.id} data-open={open} key={story.id}>
            <button
              ref={(node) => {
                triggers.current[story.id] = node ?? undefined;
              }}
              className={styles.prompt}
              data-story-prompt
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => {
                setActive(open ? null : story.id);
                setReplay(0);
              }}
            >
              <span>{story.worry}</span>
              <span className={styles.promptIcon} aria-hidden="true">
                {open ? '−' : '+'}
              </span>
            </button>
            {open ? (
              <section
                ref={panel}
                className={styles.panel}
                id={panelId}
                aria-labelledby={titleId}
                data-still={still}
              >
                <div className={styles.panelHeader}>
                  <p id={titleId}>{story.worry}</p>
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="イメージを閉じる"
                    onClick={() => {
                      setActive(null);
                      triggers.current[story.id]?.focus({ preventScroll: true });
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <StoryScene key={replay} story={story} still={still} />
                <p className={styles.caption}>{story.result}</p>
                <div className={styles.actions}>
                  <button type="button" onClick={() => setReplay((value) => value + 1)}>
                    <span aria-hidden="true">↻</span> もう一度見る
                  </button>
                  <Link href="/contact/#form">
                    こんな相談をする <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </section>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
