import { cases, company, news, newsCategories, services } from '@/app/_data/site';

export const siteTitle = '葉山・湘南のシステム開発・AI活用 | 合同会社YottaByte';
export const siteDescription =
  '葉山・湘南を拠点とするIT企業、合同会社YottaByte。Webシステム開発、kintone・APIによる業務改善・自動化、生成AI・LLM活用を、構想の整理から設計・実装・運用まで支援します。全国からご相談・ご依頼を承ります。';

const pages: Record<string, { title: string; description: string }> = {
  company: {
    title: '企業情報｜葉山・湘南のIT企業',
    description:
      '葉山・湘南を拠点とする合同会社YottaByteの企業情報。システム開発・業務改善・生成AI活用を通じて事業を支援します。会社概要、代表メッセージ、大切にしている考えをご紹介します。',
  },
  service: {
    title: '葉山・湘南のシステム開発・業務改善・AI活用',
    description:
      '葉山・湘南のYottaByteが、Webアプリ開発、kintone構築、API連携、業務自動化、生成AI・LLM導入を支援します。事業の目的と現場の課題を整理し、設計から実装・運用まで使い続けられる仕組みをつくります。',
  },
  'service/automation': {
    title: '葉山・湘南の業務改善・自動化｜kintone・API連携',
    description:
      '葉山・湘南のYottaByteが、業務改善・自動化を支援。転記・集計・情報の分散を見直し、kintoneやAPI連携、業務システム開発で使い続けられる仕組みをつくります。',
  },
  case: {
    title: 'システム開発・業務改善・AI活用の対応事例',
    description:
      'Webサービス、決済、kintone・会計API連携、データ可視化、生成AI、API保守の開発事例。案件ごとの取り組み、担当範囲、使用技術をご紹介します。',
  },
  news: {
    title: 'お知らせ',
    description:
      '葉山・湘南のIT企業、合同会社YottaByteからのお知らせ。ホームページの開設など、会社からのご案内を掲載しています。',
  },
  contact: {
    title: 'お問い合わせ｜システム開発・AI活用のご相談',
    description:
      'YottaByteへのお問い合わせ。システム開発、業務改善・自動化、生成AI・LLM活用や協業のご相談・ご依頼を全国から承ります。構想の段階でも、お気軽にご相談ください。',
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
      title: `${service?.title ?? 'サービス'}の対応事例`,
      description: `${service?.title ?? 'サービス'}の開発・改善事例。案件ごとの取り組みと担当範囲、使用技術をご紹介します。`,
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
