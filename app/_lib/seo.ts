import { cases, company, news, newsCategories, services } from '@/app/_data/site';

export const siteTitle = '湘南・葉山のシステム開発・AI活用 | 合同会社YottaByte';
export const siteDescription =
  '湘南・葉山のIT企業、合同会社YottaByte。逗子・横須賀・鎌倉など湘南・三浦半島の企業に、Webシステム開発、kintone・APIによる業務改善・自動化、生成AI・LLM活用を支援します。構想の整理から設計・実装・運用までご相談ください。';

const pages: Record<string, { title: string; description: string }> = {
  company: {
    title: '企業情報｜湘南・葉山のIT企業',
    description:
      '合同会社YottaByteの企業情報。神奈川県三浦郡葉山町を拠点に、逗子・横須賀など湘南・三浦半島の企業のシステム開発・業務改善・生成AI活用を支援します。会社概要、代表メッセージ、大切にしている考えをご紹介します。',
  },
  service: {
    title: '湘南のシステム開発・業務改善・AI活用',
    description:
      '葉山・逗子・横須賀など湘南のシステム開発・AI活用ならYottaByteへ。Webアプリ開発、kintone構築、API連携、業務自動化、社内検索や問い合わせ対応への生成AI・LLM導入を、設計から実装・運用まで支援します。',
  },
  'service/automation': {
    title: '湘南の業務改善・自動化｜kintone・API連携',
    description:
      '湘南・葉山のYottaByteが、逗子・横須賀などの企業の業務改善・自動化を支援。転記・集計・情報の分散を見直し、kintoneやAPI連携、業務システム開発で使い続けられる仕組みをつくります。',
  },
  case: {
    title: 'システム開発・AI活用の対応例',
    description:
      '湘南・葉山のYottaByteにご相談いただける支援内容の例。Webアプリケーション開発、業務自動化、生成AIの組み込み、技術設計など、構想の整理から運用・改善までの対応内容をご紹介します。',
  },
  news: {
    title: 'お知らせ',
    description:
      '湘南・葉山のIT企業、合同会社YottaByteからのお知らせ。会社情報、システム開発・業務改善・AI活用のサービス情報、ご相談のご案内を掲載しています。',
  },
  contact: {
    title: 'お問い合わせ｜湘南の開発・AI活用のご相談',
    description:
      '湘南・葉山のYottaByteへのお問い合わせ。逗子・横須賀などの企業のシステム開発、業務改善・自動化、生成AI・LLM活用や協業について、構想の段階からご相談いただけます。',
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
      description: `湘南・葉山のYottaByteによる${service?.title ?? 'サービス'}の支援内容の例。${service?.description ?? ''}`,
    };
  }
  if (path.startsWith('news/category/')) {
    const category = newsCategories.find((item) => item.id === path.split('/')[2]);
    return {
      title: category?.id === 'news' ? 'お知らせ一覧' : `${category?.label ?? '会社'}のお知らせ`,
      description: `合同会社YottaByteの${category?.label ?? '会社'}に関するお知らせ。湘南・葉山を拠点とするIT企業の最新情報をご案内します。`,
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
  areaServed: ['葉山町', '逗子市', '横須賀市', '鎌倉市'].map((name) => ({ '@type': 'City', name })),
  knowsAbout: [
    'システム開発',
    'Webアプリケーション開発',
    '業務改善・自動化',
    '生成AI・LLM活用',
    'kintone',
    'API連携',
  ],
};
