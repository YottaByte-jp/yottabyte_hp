import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cases, company, news, newsCategories, services } from '@/app/_data/site';

export function Icon({
  name = 'arrow',
  className = '',
}: {
  name?: 'arrow' | 'external' | 'mail' | 'check';
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'arrow' ? (
        <path d="M3 12h17M15 7l5 5-5 5" />
      ) : name === 'external' ? (
        <path d="M10 4H4v16h16v-6M14 3h7v7M10 14 21 3" />
      ) : name === 'mail' ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : (
        <path d="m5 12 4 4 10-10" />
      )}
    </svg>
  );
}
export function CircleLink({
  href,
  children,
  light = false,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  external?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`circle-link${light ? ' circle-link--light' : ''} ${className}`}>
      <span className="circle-link__icon">
        <Icon name={external ? 'external' : 'arrow'} />
      </span>
      <span>{children}</span>
    </Link>
  );
}
export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`section-heading ${className}`}>{children}</h2>;
}
export function PageTitle({ en, title }: { en: string; title: string }) {
  return (
    <div className="page-title">
      <div className="container">
        <p className="page-title__en">{en}</p>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
export function Photo({
  src,
  className = '',
  priority = false,
  alt = '',
  position = 'center',
}: {
  src: string;
  className?: string;
  priority?: boolean;
  alt?: string;
  position?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        preload={priority}
        style={{ objectFit: 'cover', objectPosition: position }}
      />
    </div>
  );
}
export function RoundedBanner({ src, reverse = false }: { src: string; reverse?: boolean }) {
  return (
    <div className={`rounded-banner${reverse ? ' rounded-banner--reverse' : ''}`}>
      <Photo src={src} />
    </div>
  );
}
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <Link href="/">ホーム</Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          <span aria-hidden="true">・</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band__grid">
        <div>
          <h2>お問い合わせ</h2>
          <p>
            新規開発、業務改善、AI活用や技術設計のご相談はこちらから。構想の段階でもお気軽にご連絡ください。
          </p>
          <CircleLink href="/contact/" light>
            お問い合わせはこちら
          </CircleLink>
        </div>
        <div>
          <h2>協業について</h2>
          <p>
            開発や事業づくりを共に進めるパートナーとのご相談も承ります。お問い合わせからご連絡ください。
          </p>
          <CircleLink href="/contact/#form" light external>
            協業のご相談はこちら
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
export function CaseGrid({ category, limit }: { category?: string; limit?: number }) {
  const filtered = cases.filter((c) => !category || c.category === category);
  return (
    <div className="case-grid">
      {filtered.slice(0, limit ?? filtered.length).map((item) => (
        <Link href={`/case/${item.id}/`} className="case-card" key={item.id} data-reveal>
          <Photo src={item.image} />
          <div className="case-card__meta">
            <span className="badge">{services.find((s) => s.id === item.category)?.title}</span>
            <span>対応例</span>
          </div>
          <h3>{item.title}</h3>
        </Link>
      ))}
    </div>
  );
}
export function NewsList({ category, limit }: { category?: string; limit?: number }) {
  const filtered = news.filter((n) => !category || n.category === category);
  return (
    <div className="news-list">
      {filtered.slice(0, limit ?? filtered.length).map((item) => (
        <Link href={`/news/${item.id}/`} key={item.id} className="news-item">
          <div className="news-item__meta">
            <time dateTime={item.date.replace('.', '-')}>{item.date}</time>
            <span className="badge">
              {newsCategories.find((c) => c.id === item.category)?.label}
            </span>
          </div>
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
export function BusinessDiagram() {
  return (
    <div className="business-diagram">
      <svg viewBox="0 0 448 405" role="img" aria-labelledby="business-diagram-title">
        <title id="business-diagram-title">
          YottaByteのシステム開発・業務改善・AI活用の3つの支援領域
        </title>
        <g fill="#e8efff">
          <circle cx="224" cy="112" r="112" />
          <circle cx="112" cy="292" r="112" />
          <circle cx="336" cy="292" r="112" />
        </g>
        <circle cx="224" cy="225" r="112" fill="#0553dd" />
        <g fill="white">
          <circle cx="224" cy="112" r="67" />
          <circle cx="112" cy="292" r="67" />
          <circle cx="336" cy="292" r="67" />
        </g>
        <g textAnchor="middle" fontSize="18" fontWeight="700" fill="#0553dd">
          <text x="224" y="106">
            SYSTEM
            <tspan x="224" dy="24">
              DEVELOPMENT
            </tspan>
          </text>
          <text x="112" y="286">
            AUTOMATION
            <tspan x="112" dy="24">
              SUPPORT
            </tspan>
          </text>
          <text x="336" y="286">
            AI &amp; LLM
            <tspan x="336" dy="24">
              SOLUTIONS
            </tspan>
          </text>
        </g>
        <text x="224" y="215" fill="white" textAnchor="middle" fontSize="18" fontWeight="700">
          YOTTABYTE
          <tspan x="224" dy="25">
            TECHNOLOGY
          </tspan>
        </text>
      </svg>
    </div>
  );
}
export function CompanyFacts() {
  const facts = [
    ['会社名', company.name],
    ['代表', company.representative],
    ['所在地', company.address],
    ['事業内容', 'システム開発／業務改善・自動化／AI・LLM活用／技術設計'],
    ['連絡先', company.email],
  ];
  return (
    <dl className="company-facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{label === '連絡先' ? <a href={`mailto:${value}`}>{value}</a> : value}</dd>
        </div>
      ))}
    </dl>
  );
}
