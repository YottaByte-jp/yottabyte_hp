import type { BlogPost } from './blog';

// Layout fixtures for development-only routes. These are never published blog posts.
export const blogPreviewPosts: readonly BlogPost[] = [
  {
    slug: 'layout-preview',
    title: '毎週の転記や集計、どこから見直す？',
    description: '記事のタイトルや本文、図の見え方を確認するためのプレビューです。',
    category: 'automation',
    publishedAt: '2026-11-22',
    image: {
      src: '/illustrations/shonan-cases/kintone-accounting.svg',
      alt: '業務の画面と帳票を線でつないだイラスト',
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'この記事は、ブログのデザインを確認するためのサンプルです。公開記事には含まれません。文章の行間や見出し、図を組み合わせたときの読みやすさを確認できます。',
      },
      { type: 'heading', text: 'いつもの仕事を、少し違う角度から。' },
      {
        type: 'paragraph',
        text: 'ここに記事の本文が入ります。スマートフォンでも読み進めやすいように、一行の長さと段落の間隔を整えています。専門的な話題も、図や具体例と一緒に伝えていくためのレイアウトです。',
      },
      {
        type: 'list',
        items: [
          '伝えたいことを見出しで整理する',
          '要点は箇条書きでわかりやすく',
          '仕組みや流れは図と一緒に伝える',
        ],
      },
      {
        type: 'image',
        src: '/illustrations/shonan-cases/kintone-data-analytics.svg',
        alt: '業務データを分析画面へつなぐ線画イラスト',
        caption: '図とキャプションの表示例です。',
      },
      { type: 'heading', text: '気になることを、相談につなげる。' },
      {
        type: 'paragraph',
        text: '記事を読み終えた方が、関連するサービスを知ったり、相談したりできるように。本文の下にも、HP内を自然に移動できる案内を配置しています。',
      },
    ],
  },
  {
    slug: 'ai-layout-preview',
    title: 'AIを仕事で使う前に、整理しておきたいこと',
    description: 'AI活用カテゴリーのカード表示例です。',
    category: 'ai',
    publishedAt: '2026-11-22',
    image: {
      src: '/illustrations/shonan-cases/llm-customization.svg',
      alt: '資料とAIの応答画面、利用する人物の線画イラスト',
    },
    blocks: [],
  },
  {
    slug: 'development-layout-preview',
    title: 'システムづくりの第一歩。目的と使い方を考える',
    description: 'システム開発カテゴリーのカード表示例です。',
    category: 'development',
    publishedAt: '2026-11-22',
    image: {
      src: '/illustrations/shonan-cases/subscription-platform.svg',
      alt: 'サービスの画面と利用する人物の線画イラスト',
    },
    blocks: [],
  },
];

export const blogPreviewPaths =
  process.env.NODE_ENV === 'development'
    ? [
        'preview/blog',
        'preview/blog/article',
        ...blogPreviewPosts.map((post) => `preview/blog/article/${post.slug}`),
      ]
    : [];
