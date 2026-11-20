import type { CaseStudy } from '@/app/_data/case-studies';

const artwork: Record<string, { src: string; alt: string }> = {
  'subscription-platform': {
    src: '/illustrations/shonan-cases/subscription-platform.svg',
    alt: '学習画面と決済カードを、利用する人物とともに描いた線画イラスト',
  },
  'kintone-accounting': {
    src: '/illustrations/shonan-cases/kintone-accounting.svg',
    alt: '業務管理の画面と会計の帳票をAPIでつなぐ線画イラスト',
  },
  'llm-customization': {
    src: '/illustrations/shonan-cases/llm-customization.svg',
    alt: '資料を活用してAIからの応答を受け取る画面と人物の線画イラスト',
  },
  'video-research-saas': {
    src: '/illustrations/shonan-cases/video-research-saas.svg',
    alt: '動画の検索画面と分析グラフ、開発する人物の線画イラスト',
  },
  'kintone-data-analytics': {
    src: '/illustrations/shonan-cases/kintone-data-analytics.svg',
    alt: '業務データの表からデータベースと分析画面につながる線画イラスト',
  },
  'healthcare-api': {
    src: '/illustrations/shonan-cases/healthcare-api.svg',
    alt: 'APIの稼働状況を確認する画面と、保守に取り組む人物の線画イラスト',
  },
};

export function caseArtwork(item: CaseStudy): { src: string; alt: string } {
  return artwork[item.id] ?? { src: item.image, alt: item.imageAlt };
}
