import Image from 'next/image';
import { company, cases, news, services, faqs, photos } from '@/app/_data/site';
import { ContactForm } from '@/app/_components/Interactions';
import Link from 'next/link';
import { ActionLink, Arrow, Stand } from './ReferenceParts';
import { BusinessIllustration } from './BusinessIllustration';
import { CoastIllustration } from './CoastIllustration';
import { caseArtwork } from './caseArtwork';
import { blogPosts } from '@/app/_data/blog';
import { blogPreviewPosts } from '@/app/_data/blog-preview';
import { BlogArticle, BlogList } from './BlogPages';
import { ITPerson } from './ScrollScenery';
import {
  strengths,
  innerServices,
  innerPageInfo,
  supportAreas,
  type InnerService,
} from './innerContent';
import {
  Masthead,
  FrameTitle,
  CenterTitle,
  Lead,
  GreenLandscape,
  ContactCTA,
  CaseCard,
  RelatedCases,
  CaseBanner,
  SupportDiagram,
  Flow,
  ObjectArt,
} from './InnerParts';
import styles from './inner.module.css';

function FAQSection() {
  return (
    <section className={styles.faq} data-inner-section>
      <h2 data-inner-copy>よくあるご質問</h2>
      {faqs.map(([question, answer]) => (
        <details key={question} data-inner-copy>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  );
}

function Features() {
  return (
    <>
      <Lead title={'その仕事に、\n頼れる技術であるために。'} picture="coast">
        <p>
          事業の目的と、そこで働く人たちの目線から。
          <br />
          一緒に考え、一緒につくる。
          <br />
          YottaByteが大切にしていることをご紹介します。
        </p>
        <p>
          企画・設計から開発、その先の運用・改善まで。
          <br />
          事業に合う仕組みを、一緒に育てていきます。
        </p>
      </Lead>
      <GreenLandscape>
        {strengths.map((item, i) => (
          <section className={styles.featureRow} data-inner-section key={item.title}>
            <div className={styles.featureNumber} data-inner-part>
              <div>
                <ITPerson pose={i % 2 ? 'laptop' : 'wave'} />
              </div>
              <p>STRENGTHS</p>
              <strong>{String(i + 1).padStart(2, '0')}</strong>
              <svg viewBox="0 0 80 14" fill="none" aria-hidden="true">
                <path d="M1 7c9-12 16 12 26 0S44 19 54 7 70 19 79 7" stroke="currentColor" />
              </svg>
            </div>
            <div className={`${styles.paper} ${styles.featurePanel}`} data-inner-panel>
              <p className={styles.bubble} data-inner-bubble>
                {item.bubble}
              </p>
              <div className={styles.featureBody}>
                <div>
                  <FrameTitle as="h3">{item.title}</FrameTitle>
                  <p data-inner-copy>{item.body}</p>
                </div>
                <div className={styles.featureVisual}>
                  <div data-inner-image>
                    {item.picture === 'coast' ? (
                      <CoastIllustration />
                    ) : (
                      <BusinessIllustration kind={item.picture} />
                    )}
                  </div>
                  {item.picture !== 'coast' ? <ITPerson pose="tablet" /> : null}
                </div>
              </div>
              <div className={styles.featureLink}>
                <ActionLink href={item.href} text={item.link} />
              </div>
              <div className={styles.benefits}>
                {item.items.map((text) => (
                  <span key={text} data-inner-part>
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </GreenLandscape>
      <ContactCTA />
    </>
  );
}

function ServiceOverview() {
  return (
    <>
      <Lead title={'つくる、つなぐ、\n使い続ける。'}>
        <p>
          システム・AI開発とHP制作を通じて、
          <br />
          事業の仕組みづくりと情報発信を支えます。
        </p>
        <p>目的と現場の状況を整理し、必要な技術と使い方を一緒に考えます。</p>
      </Lead>
      <GreenLandscape>
        <section className={styles.serviceCards} data-inner-section>
          {innerServices.slice(0, 2).map((service) => (
            <article
              className={`${styles.paper} ${styles.serviceCard}`}
              key={service.id}
              id={service.id}
              data-inner-panel
            >
              <div data-inner-image>
                <BusinessIllustration
                  kind={service.picture === 'website' ? 'website' : 'development'}
                />
              </div>
              <p className={styles.eyebrow}>{service.en}</p>
              <h2 data-inner-frame>{service.title}</h2>
              <p data-inner-copy>{service.description}</p>
              <ActionLink href={`/service/${service.id}/`} text={`${service.title}を詳しく`} />
            </article>
          ))}
        </section>
        <section className={styles.paper} data-inner-section data-inner-panel>
          <CenterTitle jp="事業に合う技術を、一緒に" en="OUR SUPPORT" />
          <p className={styles.wideIntro} data-inner-copy>
            一つの技術に当てはめるのではなく、課題に合わせて組み合わせる。
            <br />
            必要な機能から具体化し、使いながら改善していきます。
          </p>
          <div className={styles.capabilityGrid}>
            {innerServices.slice(2).map((service, i) => (
              <article
                className={styles.capabilityCard}
                key={service.id}
                id={service.id}
                data-inner-part
              >
                <span>0{i + 1}</span>
                <ObjectArt kind={i === 0 ? 2 : i === 1 ? 3 : 0} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link className={styles.textLink} href={`/service/${service.id}/`}>
                  詳しく見る <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <Flow />
      </GreenLandscape>
      <FAQSection />
      <RelatedCases />
      <CaseBanner />
    </>
  );
}

function ServiceDetail({ service }: { service: InnerService }) {
  const websiteTopics = [
    ['情報の整理', '事業の目的や、見てほしい人に伝える情報を整理します。'],
    ['構成・導線設計', '情報に迷わずたどり着けるページ構成と導線を考えます。'],
    ['デザイン', '事業らしさと読みやすさを大切に、画面を設計します。'],
    ['サイトの実装', '設計した構成とデザインを、動くホームページにします。'],
    ['スマートフォン対応', 'さまざまな画面幅で、情報と操作のわかりやすさを確認します。'],
    ['公開後の更新・改善', '更新のしかたや、使い始めてからの改善もご相談いただけます。'],
  ];
  return (
    <>
      <Lead title={service.lead} picture={service.picture}>
        <p>{service.description}</p>
      </Lead>
      <GreenLandscape>
        <section className={styles.paper} data-inner-section data-inner-panel>
          <div className={styles.serviceHeading}>
            <p className={styles.bubble} data-inner-bubble>
              {service.id === 'website'
                ? '見る人に、伝わる・使いやすいを。'
                : '仕事と使う人に合わせて、一緒に考えます。'}
            </p>
            <ITPerson pose="tablet" />
            <div>
              <p className={styles.eyebrow}>{service.id === 'website' ? 'PLANNING' : 'DESIGN'}</p>
              <FrameTitle>設計</FrameTitle>
            </div>
            <p className={styles.serviceHeadingDescription} data-inner-copy>
              {service.id === 'website'
                ? '誰に、何を伝え、どんな行動につなげたいか。掲載情報や日々の更新も見据え、ページの構成と画面を具体化します。'
                : '使う人、日々の業務、今使っているシステム、導入後の運用。その条件を一つずつ整理し、事業に合う画面と仕組みを設計します。'}
            </p>
          </div>
          <SupportDiagram picture={service.picture} />
        </section>
        <section className={styles.paper} data-inner-section data-inner-panel>
          <div className={styles.serviceHeading}>
            <p className={styles.bubble} data-inner-bubble>
              つくって終わりにせず、使い続けるために。
            </p>
            <ITPerson pose="laptop" />
            <div>
              <p className={styles.eyebrow}>
                {service.id === 'website' ? 'DESIGN & BUILD' : 'DEVELOPMENT'}
              </p>
              <FrameTitle>{service.id === 'website' ? '制作' : '開発'}</FrameTitle>
            </div>
            <p className={styles.serviceHeadingDescription} data-inner-copy>
              {service.id === 'website'
                ? '事業らしさと使いやすさを大切に、設計した構成とデザインを動くホームページにします。'
                : '事業の目的に合わせて必要な機能をつくり、実際の使い方を確かめながら改善を重ねます。'}
            </p>
          </div>
          {service.id === 'website' ? (
            <div className={styles.capabilityGrid}>
              {websiteTopics.map(([title, body], i) => (
                <article className={styles.capabilityCard} key={title} data-inner-part>
                  <span>0{i + 1}</span>
                  <ObjectArt kind={[1, 2, 5, 0, 5, 4][i]} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          ) : (
            <>
              <ul className={styles.tagGrid}>
                {service.items.map((item) => (
                  <li data-inner-part key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.plainCopy} data-inner-copy>
                <p>
                  ご相談内容に合わせて、必要な支援範囲と進め方をご提案します。具体的な仕様が決まっていない段階から、お聞かせください。
                </p>
              </div>
            </>
          )}
          {service.id === 'development' ? (
            <div className={styles.serviceLinks}>
              {innerServices.slice(2).map((item) => (
                <Link className={styles.textLink} key={item.id} href={`/service/${item.id}/`}>
                  {item.title}
                  <Arrow />
                </Link>
              ))}
            </div>
          ) : null}
        </section>
        <Flow />
      </GreenLandscape>
      <FAQSection />
      <CaseBanner />
    </>
  );
}

function Solutions() {
  return (
    <>
      <Lead title={'つくる、つなぐ、\n使い続ける。'} className={styles.solutionsLead}>
        <p>
          システムやアプリの開発から、日々の業務改善、情報発信まで。
          <br />
          課題に合わせて、必要な技術を組み合わせます。
        </p>
        <p>今ある仕組みを生かしながら、使う人と仕事に合うかたちを一緒に考えます。</p>
      </Lead>
      <nav className={styles.toc} aria-label="支援領域の目次" data-inner-section>
        {supportAreas.map((area, i) => (
          <Link href={`#${area.id}`} key={area.id} data-inner-part>
            <strong>0{i + 1}</strong>
            <ObjectArt kind={area.kind} />
            <span>{area.name}</span>
            <em aria-hidden="true">↓</em>
          </Link>
        ))}
      </nav>
      <GreenLandscape>
        {supportAreas.map((area, i) => (
          <section className={styles.solutionRow} id={area.id} key={area.id} data-inner-section>
            <div className={`${styles.paper} ${styles.solutionPaper}`} data-inner-panel>
              <span className={styles.solutionNumber}>0{i + 1}</span>
              <div>
                <FrameTitle>{area.title}</FrameTitle>
                <h3 data-inner-copy>{area.name}</h3>
                <p data-inner-copy>{area.body}</p>
                <ul className={styles.tagGrid}>
                  {area.tags.map((tag) => (
                    <li data-inner-part key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link className={styles.textLink} href={area.href}>
                  詳しく見る
                  <Arrow />
                </Link>
              </div>
              <div className={styles.solutionArt}>
                <div data-inner-part>
                  <ObjectArt kind={area.kind} />
                </div>
                <div data-inner-image>
                  <BusinessIllustration kind={area.id === 'website' ? 'website' : 'development'} />
                </div>
              </div>
            </div>
            <div className={styles.solutionLegs} data-inner-legs>
              <Stand className="" />
              <Stand className="" />
            </div>
          </section>
        ))}
      </GreenLandscape>
      <CaseBanner />
    </>
  );
}

function Company() {
  const facts = [
    ['会社名', company.name],
    ['代表', company.representative],
    ['所在地', company.address],
    ['事業内容', 'システム・AI開発／モバイルアプリ開発／業務改善・自動化／HP制作'],
    ['連絡先', company.email],
  ];
  return (
    <GreenLandscape>
      <section className={styles.paper} data-inner-section data-inner-panel>
        <CenterTitle jp="会社情報" en="CORPORATE PROFILE" />
        <table className={styles.profile}>
          <tbody>
            {facts.map(([label, value]) => (
              <tr key={label} data-inner-copy>
                <th scope="row">{label}</th>
                <td>{label === '連絡先' ? <a href={`mailto:${value}`}>{value}</a> : value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <iframe
          className={styles.map}
          title="合同会社YottaByteの所在地"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
        />
        <a
          className={`${styles.textLink} ${styles.profileMapLink}`}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleマップで見る
          <Arrow />
        </a>
      </section>
      <section className={styles.paper} data-inner-section data-inner-panel>
        <div className={styles.mission}>
          <h2 data-inner-frame>MISSION</h2>
          <div>
            <h3 data-inner-frame>技術で、事業の可能性を広げる</h3>
            <p data-inner-copy>課題に向き合い、現場で使い続けられる仕組みを届けます。</p>
          </div>
        </div>
        <div className={styles.mission}>
          <h2 data-inner-frame>VISION</h2>
          <div>
            <h3 data-inner-frame>
              大きな構想を、
              <br />
              動くプロダクトへ
            </h3>
            <p data-inner-copy>
              大きな構想を、社会に届くプロダクトへ。システム開発、業務改善、AI活用を通じて、事業の成長を技術で支えます。
            </p>
          </div>
        </div>
      </section>
      <section className={styles.paper} data-inner-section data-inner-panel>
        <div className={styles.message}>
          <div>
            <p className={styles.eyebrow}>MESSAGE</p>
            <h2 data-inner-frame>
              課題に向き合い、
              <br />
              使い続けられる仕組みをつくる
            </h2>
            <div data-inner-copy>
              <p>
                合同会社YottaByteは、神奈川県葉山町を拠点とするIT企業です。構想の段階から、要件の整理、設計、実装、保守運用まで。一つひとつの事業や現場の状況を理解し、必要な機能と進め方を一緒に考えます。
              </p>
              <p>
                開発だけで終わらせず、使い続けられる仕組みとして届けること。そのために、運用のしやすさや改善の積み重ねを大切にしています。
              </p>
              <p>
                葉山・湘南に根ざし、技術のことを身近に相談できる存在へ。地域の事業と新しい技術をつなぎ、目の前の課題に丁寧に向き合ってまいります。
              </p>
              <p className={styles.signature}>
                {company.name}
                <br />
                代表　{company.representative}
              </p>
            </div>
          </div>
          <div data-inner-image>
            <Image
              src={photos.portrait}
              alt={`合同会社YottaByte 代表 ${company.representative}`}
              width={1200}
              height={1804}
              sizes="(max-width:967px) 75vw, 32vw"
            />
          </div>
        </div>
      </section>
      <section className={styles.paper} data-inner-section data-inner-panel>
        <CenterTitle jp="私たちが大切にすること" en="OUR VALUE" />
        <div className={styles.valueCards}>
          {strengths.slice(0, 3).map((item, i) => (
            <article className={styles.valueCard} data-inner-part key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <svg
          className={styles.valueLines}
          viewBox="0 0 900 120"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            data-inner-line
            pathLength="100"
            d="M0 0L450 100M450 0V100M900 0L450 100"
            stroke="#5e927f"
            strokeWidth="1.5"
          />
        </svg>
        <div className={styles.valueLogo} data-inner-part>
          <Image src="/yottabyte_logo-removebg-preview.png" alt="" width={80} height={80} />
          <h3>{company.name}</h3>
          <p>大きな構想を、動くプロダクトへ。</p>
        </div>
      </section>
    </GreenLandscape>
  );
}

function CaseList({ category }: { category?: string }) {
  const list = cases.filter((item) => !category || item.category === category);
  return (
    <GreenLandscape>
      <section className={styles.caseSection} data-inner-section>
        <nav className={styles.filters} aria-label="事例の分類">
          <Link href="/case/" aria-current={!category ? 'page' : undefined}>
            すべて
          </Link>
          {services.map((service) => (
            <Link
              href={`/case/category/${service.id}/`}
              aria-current={category === service.id ? 'page' : undefined}
              key={service.id}
            >
              {service.title}
            </Link>
          ))}
        </nav>
        <p className={styles.resultCount} data-inner-copy>
          {list.length}件の事例
        </p>
        <div className={styles.caseGrid}>
          {list.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </GreenLandscape>
  );
}

function CaseArticle({ id }: { id: string }) {
  const item = cases.find((item) => item.id === id);
  if (!item) return <Missing />;
  const index = cases.indexOf(item);
  return (
    <>
      <article className={styles.article} data-inner-section>
        <div className={styles.articleMeta} data-inner-copy>
          <span className={styles.badge}>
            {services.find((s) => s.id === item.category)?.title}
          </span>
          <span>代表者のプロジェクト経験</span>
        </div>
        <h2 className={styles.articleTitle} data-inner-frame>
          {item.title}
        </h2>
        <figure data-inner-image>
          <Image
            src={caseArtwork(item).src}
            alt={caseArtwork(item).alt}
            width={1440}
            height={960}
            sizes="(max-width:967px) 90vw, 80vw"
          />
          <figcaption>代表者のプロジェクト経験をもとにした紹介です。</figcaption>
        </figure>
        <div className={styles.articleBody}>
          <p data-inner-copy>{item.body}</p>
          {item.sections.map((section) => (
            <section data-inner-section key={section.title}>
              <FrameTitle>{section.title}</FrameTitle>
              <p data-inner-copy>{section.body}</p>
            </section>
          ))}
          <figure className={styles.articleDiagram} data-inner-image>
            <Image src={item.diagram} alt={item.diagramAlt} width={1200} height={600} unoptimized />
          </figure>
          <section data-inner-section>
            <FrameTitle>担当したこと</FrameTitle>
            <ul>
              {item.scope.map((scope) => (
                <li data-inner-copy key={scope}>
                  {scope}
                </li>
              ))}
            </ul>
          </section>
          <section data-inner-section>
            <FrameTitle>使用した技術</FrameTitle>
            <ul className={styles.tagGrid}>
              {item.technologies.map((tech) => (
                <li key={tech} data-inner-part>
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className={styles.articleFooter}>
          <ActionLink href="/case/" text="対応事例一覧へ戻る" />
          <nav className={styles.articleNeighbours} aria-label="前後の事例">
            {index > 0 ? (
              <Link href={`/case/${cases[index - 1].id}/`}>
                ← 前の事例
                <br />
                {cases[index - 1].title}
              </Link>
            ) : (
              <span />
            )}
            {index < cases.length - 1 ? (
              <Link href={`/case/${cases[index + 1].id}/`}>
                次の事例 →<br />
                {cases[index + 1].title}
              </Link>
            ) : null}
          </nav>
        </div>
      </article>
      <ContactCTA />
    </>
  );
}

function NewsCategories({ category = false }: { category?: boolean }) {
  return (
    <aside className={styles.newsSidebar} aria-label="お知らせのカテゴリー" data-inner-panel>
      <Link href="/news/" aria-current={!category ? 'page' : undefined}>
        <span>すべて</span>
        <Arrow />
      </Link>
      <Link href="/news/category/news/" aria-current={category ? 'page' : undefined}>
        <span>お知らせ</span>
        <Arrow />
      </Link>
    </aside>
  );
}

function NewsList({ category = false }: { category?: boolean }) {
  return (
    <GreenLandscape>
      <div className={styles.newsLayout} data-inner-section>
        <NewsCategories category={category} />
        <div>
          {news.map((item) => (
            <Link
              href={`/news/${item.id}/`}
              className={styles.newsRow}
              key={item.id}
              data-inner-panel
            >
              <time dateTime={item.date.replaceAll('.', '-')}>{item.date}</time>
              <span className={styles.badge}>お知らせ</span>
              <h2>{item.title}</h2>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </GreenLandscape>
  );
}

function NewsArticle({ id }: { id: string }) {
  const item = news.find((n) => n.id === id);
  if (!item) return <Missing />;
  return (
    <GreenLandscape>
      <div className={styles.newsLayout} data-inner-section>
        <NewsCategories category />
        <article className={`${styles.article} ${styles.newsArticle}`} data-inner-panel>
          <div className={styles.articleMeta} data-inner-copy>
            <time dateTime={item.date.replaceAll('.', '-')}>{item.date}</time>
            <Link className={styles.badge} href="/news/category/news/">
              お知らせ
            </Link>
          </div>
          <h2 className={styles.articleTitle} data-inner-frame>
            {item.title}
          </h2>
          <figure data-inner-image>
            <Image src={photos.companyCoast} alt="湘南の海辺の風景" width={1200} height={800} />
          </figure>
          <div className={styles.articleBody} data-inner-copy>
            <p>{item.body}</p>
            {item.link && <ActionLink href={item.link.href} text={item.link.label} />}
          </div>
          <div className={styles.articleFooter}>
            <Link href="/news/" className={styles.newsReturn}>
              お知らせ一覧へ戻る
              <Arrow />
            </Link>
          </div>
        </article>
      </div>
    </GreenLandscape>
  );
}

function Contact() {
  return (
    <>
      <section className={styles.contactIntro} data-inner-section>
        <div>
          <h2 data-inner-frame>つくりたいもの、今のお困りごとを。</h2>
          <p data-inner-copy>
            システムやアプリの開発、HP制作、日々の仕事の改善。
            <br />
            具体的な仕様が決まっていない段階から、お聞かせください。
          </p>
        </div>
        <div className={styles.contactArt} data-inner-image>
          <BusinessIllustration kind="development" />
        </div>
      </section>
      <GreenLandscape>
        <section
          className={`${styles.paper} ${styles.contactPaper}`}
          data-inner-section
          data-inner-panel
        >
          <div className={styles.contactPanelHeading}>
            <ITPerson pose="wave" />
            <FrameTitle>メールでのお問い合わせ</FrameTitle>
          </div>
          <div className={styles.emailBox}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </section>
        <section
          className={`${styles.paper} ${styles.contactPaper}`}
          data-inner-section
          data-inner-panel
        >
          <div className={styles.contactPanelHeading}>
            <ITPerson pose="tablet" />
            <FrameTitle>お問い合わせフォーム</FrameTitle>
          </div>
          <p className={styles.wideIntro} data-inner-copy>
            必要事項をご入力のうえ、送信してください。
            <br />
            ご相談に近い項目を選び、詳しい内容をご記入ください。
            <br />
            「*」は必須項目です。
          </p>
          <div className={styles.contactForm}>
            <ContactForm successHref={'/contact-thanks/'} privacyHref={'/privacypolicy/'} />
          </div>
        </section>
      </GreenLandscape>
    </>
  );
}

function Partner() {
  return (
    <>
      <Lead title={'得意を持ち寄り、\n一緒につくる。'} picture="coast">
        <p>
          開発や制作の協業についても、ご相談ください。
          <br />
          取り組みたいことや必要な支援範囲を伺い、
          <br />
          ご一緒できるかたちを考えます。
        </p>
      </Lead>
      <GreenLandscape>
        <section className={styles.partnerGrid} data-inner-section>
          {[
            [
              '開発・制作のご相談',
              'Webサービス、業務システム、AI活用、モバイルアプリ、HP制作。事業の目的と状況を共有しながら、必要な役割や進め方を整理します。',
            ],
            [
              '運用・改善のご相談',
              '既存のシステムやサイトの改善についてもお聞かせください。今の使い方や課題を伺い、支援できる範囲を検討します。',
            ],
          ].map(([title, body]) => (
            <article key={title} className={styles.paper} data-inner-panel>
              <FrameTitle as="h3">{title}</FrameTitle>
              <p data-inner-copy>{body}</p>
            </article>
          ))}
        </section>
      </GreenLandscape>
      <ContactCTA />
    </>
  );
}

function Privacy() {
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
    <GreenLandscape>
      <article className={`${styles.paper} ${styles.privacy}`} data-inner-section data-inner-panel>
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
            当サイトは、利用状況の分析と改善のためにGoogle
            Analyticsを利用します。Cookieなどを利用して、閲覧したページ、利用環境、アクセス元などの情報を収集します。お問い合わせフォームに入力された氏名、メールアドレス、電話番号、ご相談内容はGoogle
            Analyticsへ送信しません。
          </p>
          <p>
            情報の取り扱いについては
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
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
      </article>
    </GreenLandscape>
  );
}

function Thanks() {
  return (
    <section className={styles.thanks} data-inner-section>
      <div data-inner-part>
        <ObjectArt kind={1} />
      </div>
      <h2 data-inner-frame>お問い合わせありがとうございます。</h2>
      <p data-inner-copy>
        お問い合わせを受け付けました。
        <br />
        内容を確認のうえ、ご連絡いたします。
      </p>
      <ActionLink href="/" text="トップページへ戻る" />
    </section>
  );
}

function Missing() {
  return (
    <section className={styles.thanks}>
      <h2>お探しのページが見つかりませんでした。</h2>
      <p>ページが移動したか、URLが変更された可能性があります。</p>
      <ActionLink href="/" text="トップページへ戻る" />
    </section>
  );
}

export function InnerPages({ path }: { path: string }) {
  const info = innerPageInfo(path);
  const trail = path.startsWith('service/')
    ? [{ label: '事業紹介', href: '/service/' }]
    : path.startsWith('case/')
      ? [{ label: '対応事例', href: '/case/' }]
      : path.startsWith('news/')
        ? [{ label: 'お知らせ', href: '/news/' }]
        : path.startsWith('blog/') || path.startsWith('preview/blog/article')
          ? [{ label: 'ブログ', href: '/blog/' }]
          : [];
  let content;
  if (path === 'features') content = <Features />;
  else if (path === 'company') content = <Company />;
  else if (path === 'service') content = <ServiceOverview />;
  else if (path.startsWith('service/')) {
    const service = innerServices.find((s) => path === `service/${s.id}`);
    content = service ? <ServiceDetail service={service} /> : <Missing />;
  } else if (path === 'solutions') content = <Solutions />;
  else if (path === 'partner') content = <Partner />;
  else if (path === 'case' || path.startsWith('case/category/'))
    content = <CaseList category={path.split('/')[2]} />;
  else if (path.startsWith('case/')) content = <CaseArticle id={path.split('/')[1]} />;
  else if (path === 'blog' || path.startsWith('blog/category/'))
    content = <BlogList posts={blogPosts} category={path.split('/')[2]} />;
  else if (path.startsWith('blog/')) {
    const post = blogPosts.find((item) => item.slug === path.split('/')[1]);
    content = post ? <BlogArticle post={post} /> : <Missing />;
  } else if (process.env.NODE_ENV === 'development' && path === 'preview/blog')
    content = <BlogList posts={blogPreviewPosts} preview />;
  else if (process.env.NODE_ENV === 'development' && path.startsWith('preview/blog/article')) {
    const post =
      path === 'preview/blog/article'
        ? blogPreviewPosts[0]
        : blogPreviewPosts.find((item) => item.slug === path.split('/')[3]);
    content = post ? <BlogArticle post={post} preview /> : <Missing />;
  } else if (path === 'news' || path.startsWith('news/category/'))
    content = <NewsList category={path !== 'news'} />;
  else if (path.startsWith('news/')) content = <NewsArticle id={path.split('/')[1]} />;
  else if (path === 'contact') content = <Contact />;
  else if (path === 'contact-thanks') content = <Thanks />;
  else if (path === 'privacypolicy') content = <Privacy />;
  else content = <Missing />;
  return (
    <>
      <Masthead {...info} trail={trail} />
      {content}
    </>
  );
}
