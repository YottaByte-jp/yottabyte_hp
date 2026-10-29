import { cases, company, news, newsCategories, services } from '@/app/_data/site';

export const siteTitle = '葉山・湘南のシステム開発・AI活用｜全国対応 | 合同会社YottaByte';
export const siteDescription =
  '葉山・湘南を拠点とするIT企業、合同会社YottaByte。Webシステム開発、kintone・APIによる業務改善・自動化、生成AI・LLM活用を支援します。横須賀・三浦半島エリアにも対応し、東京・大阪をはじめ全国からのご依頼を承ります。';

const pages: Record<string, { title: string; description: string }> = {
  company: {
    title: '企業情報｜葉山・湘南のIT企業',
    description:
      '合同会社YottaByteの企業情報。葉山・湘南を拠点に、システム開発・業務改善・生成AI活用を支援します。横須賀・三浦半島エリアにも対応し、全国からご相談・ご依頼を承ります。会社概要、代表メッセージ、大切にしている考えをご紹介します。',
  },
  service: {
    title: '葉山・湘南のシステム開発・業務改善・AI活用',
    description:
      '葉山・湘南を拠点に全国対応。YottaByteがWebアプリ開発、kintone構築、API連携、業務自動化、生成AI・LLM導入を設計から実装・運用まで支援します。湘南地域に加え、横須賀・三浦半島エリアからのご相談も承ります。',
  },
  'service/automation': {
    title: '葉山・湘南の業務改善・自動化｜kintone・API連携',
    description:
      '葉山・湘南のYottaByteが、全国の企業の業務改善・自動化を支援。転記・集計・情報の分散を見直し、kintoneやAPI連携、業務システム開発で使い続けられる仕組みをつくります。横須賀・三浦半島エリアからもご相談いただけます。',
  },
  case: {
    title: 'システム開発・AI活用の対応例',
    description:
      '葉山・湘南を拠点に全国対応するYottaByteの支援内容の例。Webアプリケーション開発、業務自動化、生成AIの組み込み、技術設計など、構想の整理から運用・改善までの対応内容をご紹介します。',
  },
  news: {
    title: 'お知らせ',
    description:
      '葉山・湘南のIT企業、合同会社YottaByteからのお知らせ。会社情報、システム開発・業務改善・AI活用のサービス情報、ご相談のご案内を掲載しています。',
  },
  contact: {
    title: 'お問い合わせ｜システム開発・AI活用のご相談',
    description:
      '葉山・湘南のYottaByteへのお問い合わせ。東京・大阪をはじめ全国から、システム開発、業務改善・自動化、生成AI・LLM活用や協業のご相談・ご依頼を承ります。湘南地域、横須賀・三浦半島エリアの企業も、構想の段階からお気軽にご相談ください。',
  },
  'contact-thanks': {
    title: 'お問い合わせ完了',
    description: '合同会社YottaByteへのお問い合わせを受け付けました。',
  },
  privacypolicy: {
    title: '個人情報保護方針',
    description:
      '合同会社YottaByteの個人情報保護方針。お問い合わせ情報の利用目的と管理、アクセス解析、個人情報に関するご相談窓口をご案内します。',
  },
  navigation: { title: 'メニュー', description: siteDescription },
  '404': {
    title: 'ページが見つかりません',
    description:
      'お探しのページが見つかりませんでした。合同会社YottaByteのトップページからご覧ください。',
  },
};

export function getPageSeo(path: string) {
  if (pages[path]) return pages[path];
  if (path.startsWith('case/category/')) {
    const service = services.find((item) => item.id === path.split('/')[2]);
    return {
      title: `${service?.title ?? 'サービス'}の対応例`,
      description: `葉山・湘南を拠点に全国対応するYottaByteによる${service?.title ?? 'サービス'}の支援内容の例。${service?.description ?? ''}`,
    };
  }
  if (path.startsWith('news/category/')) {
    const category = newsCategories.find((item) => item.id === path.split('/')[2]);
    return {
      title: category?.id === 'news' ? 'お知らせ一覧' : `${category?.label ?? '会社'}のお知らせ`,
      description: `合同会社YottaByteの${category?.label ?? '会社'}に関するお知らせ。葉山・湘南を拠点とするIT企業の最新情報をご案内します。`,
    };
  }
  const item = path.startsWith('case/')
    ? cases.find((entry) => entry.id === path.split('/')[1])
    : news.find((entry) => entry.id === path.split('/')[1]);
  return { title: item?.title ?? company.name, description: item?.body ?? siteDescription };
}

export const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://yottabyte.jp/#organization',
  name: company.name,
  alternateName: 'YottaByte',
  url: 'https://yottabyte.jp/',
  logo: 'https://yottabyte.jp/yottabyte_logo-removebg-preview.png',
  description: siteDescription,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
    addressRegion: '神奈川県',
    addressLocality: '三浦郡葉山町',
    streetAddress: '木古庭426-1',
  },
  areaServed: { '@type': 'Country', name: '日本' },
  knowsAbout: [
    'システム開発',
    'Webアプリケーション開発',
    '業務改善・自動化',
    '生成AI・LLM活用',
    'kintone',
    'API連携',
  ],
};
