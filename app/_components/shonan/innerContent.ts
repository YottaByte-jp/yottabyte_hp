import { cases, news, services, websiteService } from '@/app/_data/site';
import { blogCategories, blogPosts } from '@/app/_data/blog';

export type ServiceId = 'development' | 'website' | 'automation' | 'ai' | 'mobile';
export type InnerService = {
  id: ServiceId;
  title: string;
  en: string;
  lead: string;
  description: string;
  items: string[];
  picture: 'development' | 'website' | 'mobile';
};

export const innerServices: InnerService[] = [
  {
    ...services[0],
    id: 'development',
    title: 'システム・AI開発',
    en: 'SYSTEM & AI',
    lead: 'その仕事に合う、\n使い続けられる仕組みを。',
    picture: 'development',
    description:
      'Webサービス、業務システム、AIを活用した機能、モバイルアプリまで。事業の目的と現場の使い方を理解し、企画・設計から開発、運用・改善まで一緒に取り組みます。',
    items: [...services[0].items, 'AIを活用した機能の開発', 'モバイルアプリ開発'],
  },
  {
    ...websiteService,
    id: 'website',
    en: 'WEBSITE',
    lead: 'その事業らしさを、\n伝わるホームページに。',
    picture: 'website',
  },
  {
    ...services[1],
    id: 'automation',
    en: 'AUTOMATION',
    lead: '日々の手作業を減らし、\n事業が進む仕組みへ。',
    picture: 'development',
  },
  {
    ...services[2],
    id: 'ai',
    en: 'AI SOLUTIONS',
    lead: '新しい技術を、\nいつもの仕事の力に。',
    picture: 'development',
  },
  {
    id: 'mobile',
    title: 'モバイルアプリ開発',
    en: 'MOBILE APP',
    lead: 'そのアイデアを、\n手のひらで動くかたちに。',
    picture: 'mobile',
    description:
      'スマートフォンで使うアプリを、目的に合わせて設計・開発します。使う人の動きや画面のわかりやすさを考え、必要な機能から一緒に具体化します。',
    items: [
      'アプリの企画・要件整理',
      '使う人に合わせた画面・操作の設計',
      'サーバーや外部サービスとの連携',
      'プロトタイプの開発・検証',
      '公開に向けた準備と機能改善のご相談',
    ],
  },
];

export const strengths = [
  {
    title: '目的と課題から考える',
    bubble: '仕様が決まる前から、一緒に考えます。',
    body: '技術ありきではなく、事業の目的と現場の課題から。今の仕事や情報の流れを整理し、必要な機能と進め方を一緒に具体化します。',
    items: ['課題の整理', '使う人の目線', '要件・画面設計', '小さく試す'],
    picture: 'development',
    href: '/service/development/',
    link: 'システム・AI開発',
  },
  {
    title: '運用まで見据えてつくる',
    bubble: '使い始めてからの仕事まで、見据えて。',
    body: '開発だけで終わらせず、使い続けられる仕組みとして届けること。日々の運用や更新のしやすさを大切に、導入後の改善についてもご相談いただけます。',
    items: ['運用しやすい設計', '既存機能の改善', '外部サービス連携', '保守・機能追加'],
    picture: 'development',
    href: '/case/',
    link: '対応事例を見る',
  },
  {
    title: '伝わる、使いやすいを大切に',
    bubble: '見る人、使う人の「わかりやすい」を。',
    body: '情報を整理し、迷わず使える画面へ。Webサービス、アプリ、ホームページそれぞれの目的に合わせて、構成・画面設計から実装まで取り組みます。',
    items: ['情報の整理', '画面と操作の設計', 'スマートフォン対応', '公開後の改善'],
    picture: 'website',
    href: '/service/website/',
    link: 'HP制作について',
  },
  {
    title: '湘南から、身近な技術の相談相手に',
    bubble: '「何から始めよう？」から相談できます。',
    body: '葉山・湘南に根ざし、技術のことを身近に相談できる存在へ。地域の事業と新しい技術をつなぎ、一つひとつの状況や課題に丁寧に向き合います。',
    items: ['構想段階のご相談', '事業に合う技術', '進め方のご提案', '対話しながら開発'],
    picture: 'coast',
    href: '/contact/',
    link: 'まずは相談する',
  },
] as const;

export const supportAreas = [
  {
    id: 'development',
    title: 'アイデアを形に',
    name: 'システム・アプリ開発',
    body: 'Webサービスや業務システム、モバイルアプリを、使う人と仕事に合わせて設計・開発します。',
    tags: ['Webサービス', '業務システム', 'モバイルアプリ', 'kintone'],
    href: '/service/development/',
    kind: 0,
  },
  {
    id: 'integration',
    title: '情報をひとつに',
    name: 'API・システム連携',
    body: '別々に扱っている情報をつなぎ、入力や確認の手間を減らします。今使っている仕組みを生かしながら、業務全体を見渡せるかたちを考えます。',
    tags: ['API連携', 'データ同期', '既存ツールの活用', 'データの集計'],
    href: '/service/automation/',
    kind: 1,
  },
  {
    id: 'automation',
    title: '仕事を軽やかに',
    name: '業務改善・自動化',
    body: '転記、集計、月次の作業。日々繰り返している仕事と情報の流れを整理し、必要なところから仕組みへ置き換えます。',
    tags: ['業務整理', '転記・集計', '帳票・CSV', '運用改善'],
    href: '/service/automation/',
    kind: 2,
  },
  {
    id: 'ai',
    title: '可能性をひろげる',
    name: 'AI・LLM活用',
    body: '資料を探す、文章をまとめる、問い合わせを支える。AIを業務に役立つ機能として、いつものシステムに組み込みます。',
    tags: ['社内検索', '文章生成', '問い合わせ支援', '試作・検証'],
    href: '/service/ai/',
    kind: 3,
  },
  {
    id: 'website',
    title: '魅力を届ける',
    name: 'HP制作',
    body: '伝えたい魅力や情報を整理し、事業らしさが伝わるホームページへ。構成とデザイン、実装、スマートフォン対応、公開後の改善まで考えます。',
    tags: ['コーポレートサイト', '情報・導線設計', 'スマートフォン対応', '更新・改善'],
    href: '/service/website/',
    kind: 5,
  },
];

export const developmentFlow = [
  ['ご相談', '目的やお困りごとをお聞かせください。'],
  ['整理・ご提案', '課題と優先順位、必要な支援範囲を整理します。'],
  ['設計・試作', '画面や仕組みを具体化し、使い方を確かめます。'],
  ['開発・確認', '状況を共有しながら実装と動作確認を進めます。'],
  ['導入・公開', '実際に使うための準備と確認を進めます。'],
] as const;

export const innerPaths = [
  'features',
  'company',
  'service',
  'solutions',
  'partner',
  'case',
  'blog',
  'news',
  'contact',
  'contact-thanks',
  'privacypolicy',
  '404',
  ...innerServices.map((s) => `service/${s.id}`),
  ...services.map((s) => `case/category/${s.id}`),
  ...cases.map((c) => `case/${c.id}`),
  ...blogPosts.map((post) => `blog/${post.slug}`),
  ...blogCategories
    .filter((category) => blogPosts.some((post) => post.category === category.id))
    .map((category) => `blog/category/${category.id}`),
  'news/category/news',
  ...news.map((n) => `news/${n.id}`),
];

export function innerPageInfo(path: string): { jp: string; en: string } {
  if (path.startsWith('service/')) {
    const service = innerServices.find((s) => `service/${s.id}` === path);
    if (service) return { jp: service.title, en: service.en };
  }
  if (path.startsWith('case')) return { jp: '対応事例', en: 'WORK' };
  if (path.startsWith('blog') || path.startsWith('preview/blog'))
    return { jp: 'ブログ', en: 'BLOG' };
  if (path.startsWith('news')) return { jp: 'お知らせ', en: 'NEWS' };
  const pages: Record<string, { jp: string; en: string }> = {
    features: { jp: '特徴と強み', en: 'FEATURES' },
    company: { jp: '企業情報', en: 'COMPANY' },
    service: { jp: '事業紹介', en: 'BUSINESS' },
    solutions: { jp: '支援領域', en: 'SOLUTIONS' },
    partner: { jp: '協業相談', en: 'PARTNERSHIP' },
    contact: { jp: 'お問い合わせ', en: 'CONTACT' },
    'contact-thanks': { jp: 'お問い合わせ完了', en: 'THANK YOU' },
    privacypolicy: { jp: '個人情報保護方針', en: 'PRIVACY POLICY' },
    '404': { jp: 'ページが見つかりません', en: 'NOT FOUND' },
  };
  return pages[path] ?? pages['404'];
}
