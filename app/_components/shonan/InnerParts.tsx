import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { cases } from '@/app/_data/site';
import type { CaseStudy } from '@/app/_data/case-studies';
import Link from 'next/link';
import { ActionLink, Arrow, TechObject } from './ReferenceParts';
import { CoastalTown, Tree } from './CoastalTown';
import { BusinessIllustration } from './BusinessIllustration';
import { MobileWebsite } from './BusinessScreens';
import { Cloud, ITPerson, PaperPlane, ServiceSeal } from './ScrollScenery';
import { developmentFlow } from './innerContent';
import { caseArtwork } from './caseArtwork';
import styles from './inner.module.css';

export function CaseBanner() {
  return (
    <section className={styles.caseBannerSection} data-inner-section>
      <Link href="/case/" className={styles.caseBanner} data-inner-panel>
        <div className={styles.caseBannerArt} data-inner-part aria-hidden="true">
          <BusinessIllustration kind="development" />
        </div>
        <div className={styles.caseBannerCopy}>
          <p>対応事例</p>
          <strong>Works</strong>
          <span>事業と仕事を支える、開発の取り組み。</span>
        </div>
        <span className={styles.caseBannerArrow} aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="m5 5 10 10m0-9v9H6" />
          </svg>
        </span>
      </Link>
    </section>
  );
}

function ConditionIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <circle cx="24" cy="12" r="6" />
          <path d="M12 37v-7c0-8 24-8 24 0v7M18 37V29m12 8V29M10 17a5 5 0 0 0-1 10M38 17a5 5 0 0 1 1 10M4 38v-5q0-7 8-7m32 12v-5q0-7-8-7" />
        </>
      ) : index === 1 ? (
        <>
          <rect x="10" y="10" width="28" height="33" rx="3" />
          <path d="M18 10V6h12v4M17 20l2 2 4-5m4 4h5M17 31l2 2 4-5m4 4h5" />
        </>
      ) : index === 2 ? (
        <>
          <rect x="4" y="6" width="40" height="27" rx="3" />
          <path d="M16 42h16m-8-9v9M15 18l-4 4 4 4m18-8 4 4-4 4m-12 2 6-12" />
        </>
      ) : (
        <>
          <rect x="7" y="6" width="34" height="36" rx="4" />
          <path d="M17 14v20m14-20v20M12 21h10m4 7h10" />
          <circle cx="17" cy="21" r="3" fill="currentColor" />
          <circle cx="31" cy="28" r="3" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function Masthead({
  jp,
  en,
  trail = [],
}: {
  jp: string;
  en: string;
  trail?: { label: string; href?: string }[];
}) {
  return (
    <div className={styles.masthead}>
      <svg
        className={styles.topSky}
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H1440V205C1160 219 850 76 653 113C479 147 762 233 462 211C197 192 23 105 0 0Z"
          fill="#eefbff"
        />
      </svg>
      <Cloud className={styles.cloudOne} />
      <Cloud className={styles.cloudTwo} />
      <PaperPlane className={styles.headerPlane} />
      <nav className={styles.breadcrumb} aria-label="パンくずリスト">
        <Link href="/">HOME</Link>
        <span aria-hidden="true">&gt;</span>
        {trail.map((item) => (
          <span key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            <span aria-hidden="true"> &gt; </span>
          </span>
        ))}
        <span aria-current="page">{jp}</span>
      </nav>
      <h1
        className={styles.pageTitle}
        aria-label={jp}
        style={
          {
            '--title-size': `${Math.min(5.96, 65 / en.length)}vw`,
            '--mobile-title-size': `${Math.min(7.74, 70 / en.length)}vw`,
          } as CSSProperties
        }
      >
        <span className={styles.titleJapanese} data-inner-jp aria-hidden="true">
          {jp}
        </span>
        <span className={styles.titleEnglish} aria-hidden="true">
          {en.split(' ').map((word, i) => (
            <span className={styles.titleWord} key={`${word}-${i}`}>
              {[...word].map((letter, n) => (
                <span data-inner-title-glyph key={n}>
                  {letter}
                </span>
              ))}{' '}
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}

export function FrameTitle({
  children,
  as: Tag = 'h2',
}: {
  children: ReactNode;
  as?: 'h2' | 'h3';
}) {
  return (
    <Tag className={styles.frameTitle} data-inner-frame>
      <span>{children}</span>
    </Tag>
  );
}

export function CenterTitle({ jp, en }: { jp: string; en: string }) {
  return (
    <div className={styles.centerTitle} data-inner-copy>
      <h2>{jp}</h2>
      <p>{en}</p>
    </div>
  );
}

export function Lead({
  title,
  children,
  picture = 'development',
}: {
  title: string;
  children: ReactNode;
  picture?: 'development' | 'website' | 'coast' | 'mobile';
}) {
  return (
    <section className={styles.lead} data-inner-section>
      <div className={styles.leadCopy}>
        <h2 data-inner-frame>
          {title.split('\n').map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h2>
        <div data-inner-copy>{children}</div>
      </div>
      <div className={styles.leadArt} data-inner-image aria-hidden="true">
        {picture === 'coast' ? (
          <CoastalTown side="right" className={styles.leadTown} />
        ) : picture === 'mobile' ? (
          <div className={styles.mobileStage}>
            <ITPerson pose="tablet" />
            <MobileWebsite />
          </div>
        ) : (
          <BusinessIllustration kind={picture} />
        )}
      </div>
    </section>
  );
}

export function GreenLandscape({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.landscape} ${className}`}>
      <svg
        className={styles.landShape}
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-5 150C250 35 770 10 1110 60C1370 98 1380 2 1445 2V185H-5Z"
          fill="#d8ead9"
          stroke="#252525"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={styles.landTreeOne} aria-hidden="true">
        <Tree kind={0} />
      </div>
      <div className={styles.landTreeTwo} aria-hidden="true">
        <Tree kind={1} />
      </div>
      {children}
    </div>
  );
}

export function ContactCTA() {
  return (
    <section className={styles.contactCta} data-inner-section>
      <div className={styles.ctaPerson} data-inner-part>
        <ITPerson pose="wave" />
      </div>
      <p className={styles.eyebrow} data-inner-copy>
        LET’S TALK
      </p>
      <h2 data-inner-frame>
        その「できたら」を、
        <br className={styles.mobileBreak} />
        一緒に。
      </h2>
      <p data-inner-copy>
        まだ、うまく言葉になっていなくても。
        <br />
        お困りごとや、つくりたいものをお聞かせください。
      </p>
      <ActionLink href="/contact/" text="お問い合わせ" />
    </section>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article className={styles.caseCard} data-inner-panel>
      <Link href={`/case/${item.id}/`}>
        <span className={styles.caseCategory}>
          <ServiceSeal>
            {item.category === 'automation'
              ? '業務改善\n自動化'
              : item.category === 'development'
                ? 'システム\n開発'
                : 'AI・LLM\n活用'}
          </ServiceSeal>
        </span>
        <div className={styles.caseImage}>
          <Image
            src={caseArtwork(item).src}
            alt={caseArtwork(item).alt}
            width={720}
            height={480}
            sizes="(max-width: 600px) 90vw, (max-width: 967px) 44vw, 30vw"
          />
        </div>
        <div className={styles.caseText}>
          <p>代表者のプロジェクト経験</p>
          <h2>{item.title}</h2>
          <span className={styles.cardArrow}>
            <Arrow />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function RelatedCases({ category, omit }: { category?: string; omit?: string }) {
  const list = cases
    .filter((c) => (!category || c.category === category) && c.id !== omit)
    .slice(0, 3);
  return (
    <section className={styles.relatedCases} data-inner-section>
      <CenterTitle jp="対応事例" en="WORK" />
      <div className={styles.caseGrid}>
        {list.map((item) => (
          <CaseCard item={item} key={item.id} />
        ))}
      </div>
      <ActionLink href="/case/" text="対応事例をもっと見る" />
    </section>
  );
}

export function SupportDiagram({
  picture = 'development',
}: {
  picture?: 'development' | 'website' | 'mobile';
}) {
  return (
    <div className={styles.supportDiagram}>
      <div
        className={styles.conditions}
        aria-label="利用者・業務・既存システム・運用条件から設計を考える図"
      >
        <div className={styles.conditionCenter} data-inner-circle>
          目的に合う
          <br />
          設計
        </div>
        {['使う人', '日々の業務', '今のシステム', '運用のしかた'].map((label, i) => (
          <div
            className={`${styles.conditionNode} ${styles[`condition${i}`]}`}
            data-inner-circle
            key={label}
          >
            <ConditionIcon index={i} />
            <span>{label}</span>
          </div>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`${styles.conditionPlus} ${styles[`conditionPlus${i}`]}`}
            data-inner-part
            aria-hidden="true"
          >
            +
          </span>
        ))}
      </div>
      <svg className={styles.diagramArrow} viewBox="0 0 100 50" aria-hidden="true" data-inner-part>
        <path d="M0 17H62V0L100 25 62 50V33H0Z" fill="#8ac565" />
      </svg>
      <div className={styles.diagramResult}>
        <FrameTitle as="h3">
          {picture === 'website'
            ? '伝わるホームページへ'
            : picture === 'mobile'
              ? '使いやすいアプリへ'
              : '仕事に合う、使える仕組みへ'}
        </FrameTitle>
        <div data-inner-image>
          {picture === 'mobile' ? (
            <div className={styles.mobileStage}>
              <ITPerson pose="tablet" />
              <MobileWebsite />
            </div>
          ) : (
            <BusinessIllustration kind={picture} />
          )}
        </div>
      </div>
    </div>
  );
}

export function Flow() {
  return (
    <section id="flow" className={styles.flowSection} data-inner-section>
      <CenterTitle jp="一緒につくり、育てる流れ" en="FLOW" />
      <div className={styles.flowColumns}>
        <div className={styles.flowPanel} data-inner-panel>
          <h3>開発・制作の流れ</h3>
          <p className={styles.flowSub}>構想から、使い始めるところまで</p>
          <ol>
            {developmentFlow.map(([title, body], i) => (
              <li key={title} data-inner-section data-inner-flow-row>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.flowPanel} data-inner-panel>
          <h3>運用・改善の流れ</h3>
          <p className={styles.flowSub}>使い続けられる仕組みにするために</p>
          <ol>
            {[
              ['状況を確認する', '実際の使い方や、今困っていることを伺います。'],
              ['課題を整理する', '変更が必要な箇所と、優先順位を一緒に考えます。'],
              ['改善のご提案', '課題や優先順位を踏まえ、改善の内容と進め方をご提案します。'],
              ['改善・検証する', '既存の機能への影響を確認しながら、改修を進めます。'],
              ['振り返り、次へ', '運用の状況に合わせて、次の改善を検討します。'],
            ].map(([title, body], i) => (
              <li key={title} data-inner-section data-inner-flow-row>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ObjectArt({ kind }: { kind: number }) {
  return (
    <div className={styles.objectArt} aria-hidden="true">
      <TechObject kind={kind} />
    </div>
  );
}
