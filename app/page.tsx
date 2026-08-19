import Image from 'next/image';

const services = [
  {
    number: '01',
    title: 'Web開発',
    description: '要件整理、画面設計、DB/API設計、実装、改善まで一貫して対応します。',
  },
  {
    number: '02',
    title: '業務改善・自動化',
    description: '日々の手作業や属人化した運用を、使い続けられる仕組みに変えます。',
  },
  {
    number: '03',
    title: 'AI・LLM活用',
    description: '問い合わせ対応、文章生成、社内検索など、実務に合うAI機能を設計します。',
  },
  {
    number: '04',
    title: '技術設計・壁打ち',
    description: '作るべきもの、作らないものを整理し、事業に合う実装方針を一緒に決めます。',
  },
];

const strengths = [
  '構想を、実装できる単位まで整理する',
  '運用に残る仕組みとして設計する',
  '小さく作り、反応を見ながら改善する',
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="top" id="top" aria-labelledby="hero-title">
        <div className="top-copy">
          <h1 className="top-title" id="hero-title">
            <span>大きな構想を、</span>
            <span>動くプロダクトへ。</span>
          </h1>
          <p className="top-description">
            AI活用、Web開発、業務改善を、企画から実装・運用まで支援します。
          </p>
        </div>
        <Image className="top-image" src="/img-mv.jpg" alt="" width={4000} height={1200} priority />
      </section>

      <section className="service-summary" aria-labelledby="summary-title">
        <div className="summary-heading">
          <h2 id="summary-title">Services</h2>
          <p>できること</p>
        </div>
        <ul className="summary-items">
          {services.map((service) => (
            <li key={service.number}>
              <span>{service.number}</span>
              {service.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="template-section" id="services" aria-labelledby="services-title">
        <div className="horizontal">
          <div className="section-copy">
            <h2 className="section-title-en" id="services-title">
              Business
            </h2>
            <p className="section-title-ja">事業内容</p>
            <ol className="service-list">
              {services.map((service) => (
                <li key={service.number}>
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a className="template-button" href="#contact">
              相談する
            </a>
          </div>
          <Image
            className="business-image"
            src="/img-business.png"
            alt=""
            width={1024}
            height={1024}
          />
        </div>
      </section>

      <div className="about-wrapper">
        <section className="template-section" id="about" aria-labelledby="about-title">
          <div className="horizontal about-horizontal">
            <Image
              className="about-image"
              src="/img-aboutus.jpg"
              alt=""
              width={6000}
              height={4000}
              sizes="(max-width: 640px) 100vw, 55vw"
            />
            <div className="section-copy">
              <h2 className="section-title-en" id="about-title">
                About Us
              </h2>
              <p className="section-title-ja">YottaByteとは</p>
              <p className="section-description about-description">
                YottaByteは、世界中のデータを集めても達さない膨大な情報量を表す単位。
                大きな構想を、社会に届くプロダクトへ。
              </p>
              <ul className="strength-list">
                {strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
              <dl className="info-list">
                <div>
                  <dt>屋号</dt>
                  <dd>YottaByte</dd>
                </div>
                <div>
                  <dt>代表</dt>
                  <dd>加藤獅</dd>
                </div>
                <div>
                  <dt>事業内容</dt>
                  <dd>Web開発 / 業務改善・自動化 / AI・LLM活用 / 技術設計・壁打ち</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>

      <section className="template-section" id="profile" aria-labelledby="profile-title">
        <div className="horizontal profile-horizontal">
          <div className="section-copy profile-copy">
            <h2 className="section-title-en" id="profile-title">
              Profile
            </h2>
            <p className="section-title-ja">代表</p>
            <p className="profile-name">加藤獅</p>
            <p>
              法人向けの受託開発やスタートアップ企業の技術顧問を務める。高校在学中に医療AIを開発・運営し、2023年からSky
              Grid株式会社でAIエンジニアとしてSaaS開発に携わりました。
            </p>
            <p>
              同年に開業し、現在はフリーランスエンジニアとしてWebアプリケーションの企画・要件定義、実装、保守運用までを一貫して支援。kintoneを中心とした業務システム開発、既存プロダクトの品質改善、API保守、顧客フィードバックをもとにした改善対応も行っています。
            </p>
            <p>
              開発だけで終わらせず、LP設計、広告運用、SNSグロースまで含めて、技術をビジネス成果につなげることを得意としています。
            </p>
            <dl className="profile-details">
              <div>
                <dt>Focus</dt>
                <dd>事業理解 / 要件整理 / 実装 / 改善</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>
                  Next.js / React / TypeScript / Python / Flask / AWS / Google Cloud / kintone
                </dd>
              </div>
            </dl>
          </div>
          <Image
            className="profile-image"
            src="/DSC_2003.jpg"
            alt="加藤獅"
            width={2299}
            height={3456}
            sizes="(max-width: 640px) 100vw, 480px"
          />
        </div>
      </section>

      <div className="contact-wrapper">
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <h2 className="section-title-en" id="contact-title">
            Contact
          </h2>
          <p className="section-title-ja contact-title-ja">お問い合わせ</p>
          <h3>まずは整理から。</h3>
          <p>新規開発、改善、AI活用の相談に対応します。</p>
          <a className="template-button contact-button" href="mailto:raio20061114@gmail.com">
            raio20061114@gmail.com
          </a>
        </section>
      </div>
    </main>
  );
}
