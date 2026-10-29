export const company = {
  name: '合同会社YottaByte',
  representative: '加藤獅',
  address: '神奈川県三浦郡葉山町木古庭426-1',
  email: 'contact@yottabyte.jp',
};

export const photos = {
  coast: '/images/shonan-hayama.webp',
  portrait: '/images/company-message.webp',
  companyOffice: '/generated/06-shonan-seaview-office.webp',
  companyCoast: '/images/shonan-morito.webp',
  companyLandscape: '/images/shonan-tateishi.webp',
  serviceCoast: '/images/shonan-zushi-fuji.webp',
  hero: '/generated/01-office-hero.webp',
  office: '/generated/07-shonan-office-lounge.webp',
  development: '/generated/03-development.webp',
  workshop: '/generated/04-workshop.webp',
};

export const companyGallery = [
  { src: '/images/shonan-zushi-marina.webp', alt: '逗子マリーナのヤシ並木' },
  { src: '/images/shonan-zushi-sailing.webp', alt: '逗子海岸の海辺とヨット' },
  { src: '/images/shonan-tateishi-coast.webp', alt: '横須賀・立石公園から望む海岸線' },
  { src: '/images/shonan-tateishi-sunset.webp', alt: '横須賀・立石海岸の夕日' },
];

export const navigation = [
  { href: '/company/', label: '企業情報' },
  { href: '/service/', label: '事業内容' },
  { href: '/case/', label: '対応事例' },
  { href: '/news/', label: 'お知らせ' },
];

export const services = [
  {
    id: 'development',
    en: 'SYSTEM DEVELOPMENT',
    title: 'システム開発',
    image: '/illustrations/service-development.svg',
    summary: 'Webサービスから社内の業務システムまで。湘南の事業に合う仕組みを設計・開発',
    description:
      '企画・要件整理から画面設計、データベース・API設計、実装、保守・改善まで対応します。事業の目的と日々の運用を理解し、必要な機能を一緒に具体化します。',
    items: [
      'Webアプリケーション開発',
      '業務システム・kintone開発',
      'データベース・API設計',
      '既存プロダクトの保守・改善',
      '技術設計・開発方針のご相談',
    ],
  },
  {
    id: 'automation',
    en: 'AUTOMATION SUPPORT',
    title: '業務改善・自動化',
    image: '/illustrations/service-automation.svg',
    summary: '転記・集計・情報の分散を、kintoneやAPI連携で改善。日々の手作業を仕組みに',
    description:
      '日々の作業や情報の流れを整理し、システム連携や自動化で業務を改善します。現場の使いやすさを大切に、導入後の運用まで見据えた仕組みを設計します。',
    items: [
      '現行業務の整理・課題の可視化',
      'kintoneを活用した業務改善',
      'APIを使ったシステム連携',
      'データ集計・レポートの自動化',
      '導入後の運用・改善支援',
    ],
  },
  {
    id: 'ai',
    en: 'AI & LLM SOLUTIONS',
    title: 'AI・LLM活用',
    image: '/illustrations/service-ai.svg',
    summary: '社内検索、文章生成、問い合わせ対応。生成AI・LLMを、実務で使える機能へ',
    description:
      'AIを使うこと自体を目的にせず、業務に役立つ使い方を一緒に考えます。文章生成、問い合わせ対応、社内検索など、利用場面に合わせた設計と実装を行います。',
    items: [
      'AI活用の企画・技術相談',
      '文章生成・問い合わせ対応の支援',
      '社内情報の検索・活用',
      '既存サービスへのAI機能の実装',
      'プロトタイプ開発・検証',
    ],
  },
];

// These are service examples, not fabricated client achievements.
export const cases = [
  {
    id: 'web-development',
    category: 'development',
    title: '企画から実装・運用まで、Webアプリケーション開発を支援',
    image: '/illustrations/case-web-development.svg',
    body: '新規サービスの企画・要件整理から、画面設計、API実装、保守運用までを支援します。初期開発だけでなく、利用者の声を受けた改善も視野に入れて設計します。',
  },
  {
    id: 'business-automation',
    category: 'automation',
    title: '業務の流れを整理し、手作業を減らす仕組みづくりを支援',
    image: '/illustrations/case-business-automation.svg',
    body: '繰り返しの入力、集計や転記など、日々の運用で負担になっている作業を整理します。kintoneやAPI連携などを組み合わせ、現場の運用に合った仕組みを作ります。',
  },
  {
    id: 'ai-integration',
    category: 'ai',
    title: '既存サービスにAI機能を組み込み、実務での活用を支援',
    image: '/illustrations/case-ai-integration.svg',
    body: '問い合わせ対応、文章の作成、情報検索などの課題に合わせて、AI機能の設計と実装を行います。小さく検証し、必要な機能と使い方を具体化していきます。',
  },
  {
    id: 'technical-planning',
    category: 'development',
    title: '構想を実装できる単位へ整理し、開発方針の具体化を支援',
    image: '/illustrations/case-technical-planning.svg',
    body: '作るべきものと優先順位を整理し、システムの構成や技術の選択を検討します。事業の段階や運用体制に合う開発方針を一緒に考えます。',
  },
];

export const newsCategories = [
  { id: 'company', label: '会社情報' },
  { id: 'service', label: 'サービス' },
  { id: 'news', label: 'お知らせ' },
];

export const news = [
  {
    id: 'company-information',
    date: '2026.10',
    category: 'company',
    title: '合同会社YottaByteの会社情報について',
    body: '合同会社YottaByteは神奈川県葉山町を拠点に、システム開発、業務改善・自動化、AI・LLM活用を通じて事業の課題解決を支援します。逗子・横須賀など湘南・三浦半島の企業のご相談に対応しています。会社の基本情報は企業情報ページからご覧いただけます。',
  },
  {
    id: 'system-development',
    date: '2026.10',
    category: 'service',
    title: 'システム開発のご相談について',
    body: 'Webアプリケーションや業務システムの企画・要件整理、設計、実装、保守・改善のご相談に対応します。構想の段階でも、お気軽にお問い合わせください。',
  },
  {
    id: 'automation-support',
    date: '2026.10',
    category: 'service',
    title: '業務改善・自動化の支援内容について',
    body: '日々の手作業や情報の分散、属人化した運用などの課題を整理し、使い続けられる仕組みづくりを支援します。事業内容ページで支援内容をご紹介しています。',
  },
  {
    id: 'ai-solutions',
    date: '2026.10',
    category: 'service',
    title: 'AI・LLM活用のご相談について',
    body: '問い合わせ対応、文章生成、社内検索など、業務に合うAIの使い方を一緒に検討します。既存サービスへの組み込みや、プロトタイプ開発のご相談も承ります。',
  },
  {
    id: 'contact-guide',
    date: '2026.10',
    category: 'news',
    title: 'お問い合わせのご案内',
    body: '新規開発、既存システムの改善、AI活用や技術設計のご相談は、お問い合わせページからご連絡ください。ご相談内容を確認し、個別にご案内いたします。',
  },
];

export const faqs = [
  [
    '構想の段階から相談できますか？',
    'はい。具体的な仕様が決まっていない段階でも、課題や目的を整理するところからご相談いただけます。',
  ],
  [
    '予算はどのくらい必要ですか？',
    '開発内容や支援範囲に応じて、個別にお見積もりいたします。ご希望の範囲や条件をお問い合わせ時にお知らせください。',
  ],
  [
    '納品後の運用も相談できますか？',
    '保守運用や機能の改善についてもご相談いただけます。運用体制や必要な支援内容に合わせて対応方針を検討します。',
  ],
] as const;

export const routePaths = [
  '/company',
  '/service',
  '/service/automation',
  '/case',
  '/news',
  '/contact',
  '/contact-thanks',
  '/privacypolicy',
  '/navigation',
  '/404',
  ...services.map((s) => `/case/category/${s.id}`),
  ...cases.map((c) => `/case/${c.id}`),
  ...newsCategories.map((c) => `/news/category/${c.id}`),
  ...news.map((n) => `/news/${n.id}`),
];
