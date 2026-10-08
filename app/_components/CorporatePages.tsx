import Link from 'next/link';
import { cases, company, news, newsCategories, photos, services } from '@/app/_data/site';
import { FAQ, ContactForm } from './Interactions';
import {
  Breadcrumb,
  BusinessDiagram,
  CaseGrid,
  CircleLink,
  CompanyFacts,
  ContactBand,
  Icon,
  NewsList,
  PageTitle,
  Photo,
  RoundedBanner,
  SectionHeading,
} from './TemplateParts';

function CaseSection({ category, compact = false }: { category?: string; compact?: boolean }) {
  return (
    <section className={`section case-section${compact ? ' case-section--compact' : ''}`}>
      <div className="container">
        <SectionHeading>CASE</SectionHeading>
        {compact ? null : (
          <p className="section-intro">YottaByteが対応するご相談内容の例をご紹介。</p>
        )}
        <CaseGrid category={category} limit={3} />
        <div className="align-right">
          <CircleLink href="/case/">対応事例をみる</CircleLink>
        </div>
      </div>
    </section>
  );
}
function FAQSection() {
  return (
    <section className="section">
      <div className="container" data-reveal>
        <SectionHeading>Q&amp;A</SectionHeading>
        <FAQ />
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero">
        <div className="container hero-copy">
          <h1>
            事業の課題を、
            <br />
            技術の力で解決へ
          </h1>
          <p>TECHNOLOGY FOR YOUR NEXT STEP.</p>
        </div>
        <div className="hero-photo">
          <Photo src={photos.hero} priority />
          <a className="hero-scroll" href="#company" aria-label="企業情報へスクロール">
            <Icon />
          </a>
        </div>
      </section>
      <section className="home-company" id="company">
        <div className="container home-company__grid" data-reveal>
          <div>
            <SectionHeading>COMPANY</SectionHeading>
            <p className="large-copy">
              すべてのクライアントに
              <br />
              使い続けられる仕組みを
            </p>
            <p className="body-copy">
              私たちは、システム開発を通じて事業の課題解決を支援する会社です。構想の整理から設計、実装、運用・改善まで、一つひとつの課題に向き合います。Web開発／業務改善・自動化／AI活用／技術設計などをご支援しています。
            </p>
            <CircleLink href="/company/">企業情報をみる</CircleLink>
          </div>
          <Photo src={photos.office} className="home-company__photo" />
        </div>
      </section>
      <section className="section home-services white-corner">
        <div className="container" data-reveal>
          <SectionHeading>SERVICE</SectionHeading>
          <h2 className="large-copy home-services__tagline">あらゆる課題を、技術で前へ。</h2>
          <p className="body-copy">
            YottaByteが提供しているサービスはこちらからご覧ください。
            <br />
            事業と運用に合う形でご支援します。
          </p>
          <div className="service-grid">
            {services.map((s) => (
              <article className="service-card" key={s.id}>
                <Photo src={s.image} />
                <p className="eyebrow">{s.en}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </article>
            ))}
          </div>
          <div className="align-right">
            <CircleLink href="/service/">事業内容をみる</CircleLink>
          </div>
        </div>
      </section>
      <RoundedBanner src={photos.development} reverse />
      <CaseSection />
      <section className="home-news">
        <div className="container home-news__grid" data-reveal>
          <SectionHeading>NEWS</SectionHeading>
          <div>
            <NewsList limit={4} />
            <div className="align-right">
              <CircleLink href="/news/">一覧をみる</CircleLink>
            </div>
          </div>
        </div>
      </section>
      <section className="partner-banner">
        <Photo src={photos.workshop} />
        <div className="partner-banner__shade" />
        <div className="container partner-banner__copy" data-reveal>
          <SectionHeading>PARTNER</SectionHeading>
          <h2 className="large-copy">一緒に、事業の課題を解決へ。</h2>
          <p>
            開発や事業づくりに関する協業のご相談にも対応しています。
            <br />
            ご相談内容や進め方について、お気軽にご連絡ください。
          </p>
          <CircleLink href="/contact/#form" light>
            協業のご相談について
          </CircleLink>
        </div>
        <p className="partner-banner__watermark" aria-hidden="true">
          WORK WITH US
        </p>
      </section>
      <ContactBand />
    </main>
  );
}

function CompanyPage() {
  const values = [
    [
      '01',
      '目的と課題から考える',
      '技術ありきではなく、事業の目的と現場の課題を整理し、必要な仕組みを一緒に考えます。',
    ],
    [
      '02',
      '運用まで見据えてつくる',
      '納品後も使い続けられるように、日々の運用や改善のしやすさを大切に設計します。',
    ],
    [
      '03',
      '小さく試し、改善を重ねる',
      '必要な機能から具体化し、実際の反応や使い方を見ながら、一歩ずつ改善を進めます。',
    ],
  ];
  return (
    <>
      <PageTitle en="COMPANY" title="企業情報" />
      <RoundedBanner src={photos.office} />
      <section className="section mission-section">
        <div className="container mission-grid" data-reveal>
          <SectionHeading>MISSION</SectionHeading>
          <div>
            <h2 className="large-copy">技術で、事業の可能性を広げる</h2>
            <p className="body-copy">課題に向き合い、現場で使い続けられる仕組みを届けます。</p>
          </div>
          <SectionHeading>VISION</SectionHeading>
          <div>
            <h2 className="large-copy">
              大きな構想を、
              <br />
              動くプロダクトへ
            </h2>
            <p className="body-copy">
              YottaByteは、世界中のデータを集めても達さない膨大な情報量を表す単位です。大きな構想を、社会に届くプロダクトへ。システム開発、業務改善、AI活用を通じて、事業の成長を技術で支えます。
            </p>
          </div>
        </div>
      </section>
      <section className="section white-corner message-section">
        <div className="container" data-reveal>
          <SectionHeading>MESSAGE</SectionHeading>
          <div className="message-grid">
            <div>
              <h2 className="large-copy">
                課題に向き合い、
                <br />
                使い続けられる仕組みをつくる
              </h2>
              <div className="body-copy">
                <p>
                  合同会社YottaByteは、システム開発を中心に、業務改善・自動化、AI・LLM活用をご支援しています。
                </p>
                <p>
                  構想の段階から、要件の整理、設計、実装、保守運用まで。一つひとつの事業や現場の状況を理解し、必要な機能と進め方を一緒に考えます。
                </p>
                <p>
                  開発だけで終わらせず、使い続けられる仕組みとして届けること。そのために、運用のしやすさや改善の積み重ねを大切にしています。
                </p>
                <p>
                  技術と事業をつなぐパートナーとして、目の前の課題に丁寧に向き合ってまいります。
                </p>
              </div>
              <p className="representative">
                {company.name}
                <br />
                代表　{company.representative}
              </p>
            </div>
            <Photo src={photos.office} className="message-photo" position="60% center" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container values-grid" data-reveal>
          <SectionHeading>OUR VALUE</SectionHeading>
          <div className="values-list">
            {values.map(([number, title, body]) => (
              <article className="value-row" key={number}>
                <div className="value-icon">
                  <Icon name={number === '01' ? 'check' : number === '02' ? 'external' : 'arrow'} />
                </div>
                <div>
                  <h3 className="large-copy">{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RoundedBanner src={photos.hero} reverse />
      <section className="section company-profile">
        <div className="container" data-reveal>
          <SectionHeading>COMPANY PROFILE</SectionHeading>
          <CompanyFacts />
        </div>
      </section>
      <div className="photo-marquee" aria-label="事業イメージ">
        <div className="photo-marquee__track">
          {[
            photos.development,
            photos.office,
            photos.workshop,
            photos.hero,
            photos.development,
            photos.office,
            photos.workshop,
            photos.hero,
          ].map((src, i) => (
            <Photo src={src} key={`${src}-${i}`} />
          ))}
        </div>
      </div>
      <Breadcrumb items={[{ label: '企業情報' }]} />
      <ContactBand />
    </>
  );
}

function ServicePage() {
  return (
    <>
      <PageTitle en="SERVICE" title="事業内容" />
      <RoundedBanner src={photos.workshop} />
      <section className="section business-model">
        <div className="container" data-reveal>
          <SectionHeading>BUSINESS MODEL</SectionHeading>
          <h2 className="large-copy">
            クライアントに
            <br />
            課題解決と成長を
          </h2>
          <p className="body-copy">
            システム開発、業務改善・自動化、AI・LLM活用の事業を軸に、事業の課題解決をご支援しています。
            <br />
            目的と現場の状況を整理し、必要な技術と使い方を一緒に考えます。
          </p>
          <p className="body-copy">
            企画・要件整理から設計、実装、保守運用まで。技術を事業につなげ、使い続けられる仕組みとして届けます。
          </p>
          <BusinessDiagram />
        </div>
      </section>
      <section className="section white-corner">
        <div className="container" data-reveal>
          <SectionHeading>OUR SERVICE</SectionHeading>
          <div className="service-details">
            {services.map((s, i) => (
              <article className="service-detail-row" key={s.id}>
                <div>
                  <p className="eyebrow">{s.en}</p>
                  <h2 className="large-copy">{s.title}</h2>
                  <p className="body-copy">{s.description}</p>
                  <ul className="service-bullets">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {i === 1 ? (
                    <CircleLink href="/service/automation/">業務改善を詳しくみる</CircleLink>
                  ) : i === 2 ? (
                    <CircleLink href="/contact/" external>
                      AI活用をご相談ください
                    </CircleLink>
                  ) : null}
                </div>
                <Photo
                  src={s.image}
                  className={`service-detail-photo service-detail-photo--${i}`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
      <CaseSection compact />
      <FAQSection />
      <Breadcrumb items={[{ label: '事業内容' }]} />
      <ContactBand />
    </>
  );
}

function ServiceDetailPage() {
  const s = services[1];
  const solutions = [
    [
      '業務の整理・可視化',
      '日々の作業や情報の流れを整理し、改善すべき課題と優先順位を具体化します。',
      photos.workshop,
    ],
    [
      'システム連携・自動化',
      'APIや業務ツールを組み合わせ、転記や集計などの繰り返し作業を仕組みに変えます。',
      photos.development,
    ],
    [
      '業務システムの設計・開発',
      '現場の使い方に合わせて、kintoneやWebアプリケーションなどの業務システムを設計します。',
      photos.office,
    ],
    [
      '運用と継続的な改善',
      '導入後の運用を確認し、実際の課題や利用者の声に合わせた改善を支援します。',
      photos.hero,
    ],
  ];
  const flow = [
    ['お問い合わせ', 'お問い合わせページから、ご相談内容をお知らせください。'],
    ['ヒアリング', '現在の課題やご希望、運用の状況を伺います。'],
    ['ご提案とお見積もり', '必要な支援内容と進め方を整理し、個別にご提案します。'],
    ['ご契約', '内容と条件をご確認いただき、合意のうえで進めます。'],
    ['開発・導入', '状況を共有しながら、設計・実装・確認を進めます。'],
    ['運用・改善', '使い始めてからの運用や改善についてもご相談いただけます。'],
  ];
  return (
    <>
      <PageTitle en={s.en} title={s.title} />
      <RoundedBanner src={photos.workshop} />
      <section className="section">
        <div className="container detail-lead" data-reveal>
          <div>
            <h2 className="large-copy">
              日々の手作業を減らし、
              <br />
              事業が進む仕組みへ
            </h2>
            <p className="body-copy">{s.description}</p>
            <ul className="service-bullets">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Photo src={photos.development} />
        </div>
      </section>
      <section className="section white-corner">
        <div className="container" data-reveal>
          <SectionHeading>SOLUTIONS</SectionHeading>
          <div className="solutions">
            {solutions.map(([title, body, image], i) => (
              <article key={title}>
                <div className="solution-number">0{i + 1}</div>
                <div>
                  <h3 className="large-copy">{title}</h3>
                  <p>{body}</p>
                </div>
                <Photo src={image} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <CaseSection category="automation" compact />
      <section className="section flow-section">
        <div className="container" data-reveal>
          <SectionHeading>FLOW</SectionHeading>
          <div className="flow-grid">
            {flow.map(([title, body], i) => (
              <article key={title}>
                <Icon name={i === 0 ? 'mail' : i === 3 ? 'check' : 'arrow'} />
                <h3>
                  0{i + 1}. {title}
                </h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
      <Breadcrumb items={[{ label: '事業内容', href: '/service/' }, { label: s.title }]} />
      <ContactBand />
    </>
  );
}

function CaseListPage({ category }: { category?: string }) {
  const label = services.find((s) => s.id === category)?.title;
  return (
    <>
      <PageTitle en="CASE" title={label ?? '対応事例'} />
      <section className="listing-section">
        <div className="container">
          <nav className="category-nav" aria-label="対応事例のカテゴリ">
            <Link href="/case/" aria-current={!category ? 'page' : undefined}>
              すべての記事
            </Link>
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/case/category/${s.id}/`}
                aria-current={s.id === category ? 'page' : undefined}
              >
                {s.title}
              </Link>
            ))}
          </nav>
          <CaseGrid category={category} />
        </div>
      </section>
      <Breadcrumb
        items={label ? [{ label: '対応事例', href: '/case/' }, { label }] : [{ label: '対応事例' }]}
      />
      <ContactBand />
    </>
  );
}
function NewsListPage({ category }: { category?: string }) {
  const label = newsCategories.find((c) => c.id === category)?.label;
  return (
    <>
      <PageTitle en="NEWS" title={label ?? 'お知らせ'} />
      <section className="listing-section">
        <div className="container">
          <nav className="category-nav" aria-label="お知らせのカテゴリ">
            <Link href="/news/" aria-current={!category ? 'page' : undefined}>
              すべての記事
            </Link>
            {newsCategories.map((c) => (
              <Link
                key={c.id}
                href={`/news/category/${c.id}/`}
                aria-current={c.id === category ? 'page' : undefined}
              >
                {c.label}
              </Link>
            ))}
          </nav>
          <NewsList category={category} />
        </div>
      </section>
      <Breadcrumb
        items={label ? [{ label: 'お知らせ', href: '/news/' }, { label }] : [{ label: 'お知らせ' }]}
      />
      <ContactBand />
    </>
  );
}
function ArticlePage({ kind, id }: { kind: 'case' | 'news'; id: string }) {
  const isCase = kind === 'case';
  const item = isCase ? cases.find((c) => c.id === id) : news.find((n) => n.id === id);
  if (!item) return <NotFoundPage />;
  const category = isCase
    ? services.find((s) => s.id === item.category)?.title
    : newsCategories.find((c) => c.id === item.category)?.label;
  return (
    <>
      <article className="article-panel">
        <div className="article-meta">
          <span>{'date' in item ? item.date : '対応例'}</span>
          <span className="badge">{category}</span>
        </div>
        <h1>{item.title}</h1>
        {'image' in item ? <Photo src={item.image} className="article-photo" /> : null}
        <div className="article-body">
          <p>{item.body}</p>
          {isCase ? (
            <>
              <h2>ご相談いただける内容</h2>
              <p>
                ここでは、YottaByteにご相談いただける支援内容の一例をご紹介しています。ご希望の機能、現在の課題、運用の状況などを伺い、事業に合う進め方を一緒に検討します。
              </p>
              <h3>構想の整理から運用・改善まで</h3>
              <p>
                実装だけでなく、目的や優先順位を整理するところから対応します。小さく検証し、実際の使い方を確認しながら改善していきます。
              </p>
              <ul>
                <li>現状と課題のヒアリング</li>
                <li>要件整理と技術設計</li>
                <li>開発・実装・動作確認</li>
                <li>運用を見据えた改善のご相談</li>
              </ul>
              <Photo src={photos.workshop} className="article-photo" />
            </>
          ) : (
            <p>詳しいご相談は、お問い合わせページからご連絡ください。</p>
          )}
        </div>
      </article>
      <div className="article-return">
        <CircleLink href={`/${kind}/`}>{isCase ? '対応事例' : 'お知らせ'}一覧に戻る</CircleLink>
      </div>
      <Breadcrumb
        items={[
          { label: isCase ? '対応事例' : 'お知らせ', href: `/${kind}/` },
          { label: item.title },
        ]}
      />
      <ContactBand />
    </>
  );
}
function ContactPage() {
  return (
    <>
      <PageTitle en="CONTACT" title="お問い合わせ" />
      <section className="contact-section">
        <div className="contact-intro">
          <p>
            開発や業務改善、AI活用について、お気軽にご相談ください。
            <br />
            下記の内容をご記入のうえ、お問い合わせください。
          </p>
        </div>
        <ContactForm />
      </section>
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
      <ContactBand />
    </>
  );
}
function ThanksPage() {
  return (
    <>
      <section className="thanks-section">
        <p className="thanks-en">THANK YOU</p>
        <h1>お問い合わせを受け付けました</h1>
        <p>
          お問い合わせいただき、ありがとうございます。
          <br />
          内容を確認のうえ、ご記入いただいたメールアドレスへご連絡します。
          <br />
          追加のご連絡は、下記メールアドレスへお願いいたします。
        </p>
        <a href={`mailto:${company.email}`}>{company.email}</a>
        <Link className="submit-button" href="/">
          トップページへ戻る
        </Link>
      </section>
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
    </>
  );
}
function PrivacyPage() {
  const sections = [
    [
      '個人情報の取得と利用目的',
      'お問い合わせなどでお預かりしたお名前、連絡先、ご相談内容は、お問い合わせへの対応、サービスの提供に必要な連絡、業務上の確認のために利用します。',
    ],
    [
      '個人情報の管理',
      'お預かりした情報は、利用目的に必要な範囲で取り扱い、漏えい、不正な利用、紛失などを防ぐために適切に管理します。',
    ],
    [
      '第三者への提供',
      'ご本人の同意がある場合や法令に基づく場合などを除き、お預かりした個人情報を第三者に提供しません。',
    ],
    [
      '個人情報に関するご相談',
      'お預かりした情報の確認、訂正、削除などに関するご相談は、下記の窓口へご連絡ください。内容を確認し、適切に対応します。',
    ],
  ];
  return (
    <>
      <PageTitle en="PRIVACY POLICY" title="個人情報保護方針" />
      <section className="listing-section">
        <div className="container privacy-body">
          <p>{company.name}は、お客様の個人情報を適切に取り扱うため、以下の方針を定めます。</p>
          {sections.map(([title, body], i) => (
            <section key={title}>
              <h2>
                第{i + 1}条 {title}
              </h2>
              <p>{body}</p>
            </section>
          ))}
          <section>
            <h2>第5条 アクセス解析</h2>
            <p>
              当サイトは、利用状況の分析と改善のためにGoogle Analyticsを利用します。
              Cookieなどを利用して、閲覧したページ、利用環境、アクセス元などの情報を収集します。
              お問い合わせフォームに入力された氏名、メールアドレス、電話番号、ご相談内容はGoogle
              Analyticsへ送信しません。
            </p>
            <p>
              情報の取り扱いについては
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Googleのプライバシーポリシー
              </a>
              をご確認ください。ブラウザーのCookie設定や
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analyticsオプトアウトアドオン
              </a>
              でデータ収集を制限できます。
            </p>
          </section>
          <section>
            <h2>第6条 お問い合わせ窓口</h2>
            <p>
              {company.name}
              <br />
              {company.address}
              <br />
              メール：<a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </section>
        </div>
      </section>
      <Breadcrumb items={[{ label: '個人情報保護方針' }]} />
      <ContactBand />
    </>
  );
}
export function NotFoundPage() {
  return (
    <>
      <PageTitle en="404 PAGE" title="404ページ" />
      <section className="not-found-section">
        <p className="not-found-en">404 not found</p>
        <p>
          お探しのページが見つかりませんでした。
          <br />
          ページが移動、または削除された可能性があります。
        </p>
        <Link className="submit-button" href="/">
          トップページへ戻る
        </Link>
      </section>
      <Breadcrumb items={[{ label: '404ページ' }]} />
      <ContactBand />
    </>
  );
}
export function RouteContent({ path }: { path: string }) {
  if (path === 'company') return <CompanyPage />;
  if (path === 'service') return <ServicePage />;
  if (path === 'service/automation') return <ServiceDetailPage />;
  if (path === 'case') return <CaseListPage />;
  if (path.startsWith('case/category/')) return <CaseListPage category={path.split('/')[2]} />;
  if (path.startsWith('case/')) return <ArticlePage kind="case" id={path.split('/')[1]} />;
  if (path === 'news') return <NewsListPage />;
  if (path.startsWith('news/category/')) return <NewsListPage category={path.split('/')[2]} />;
  if (path.startsWith('news/')) return <ArticlePage kind="news" id={path.split('/')[1]} />;
  if (path === 'contact') return <ContactPage />;
  if (path === 'contact-thanks') return <ThanksPage />;
  if (path === 'privacypolicy') return <PrivacyPage />;
  return <NotFoundPage />;
}
