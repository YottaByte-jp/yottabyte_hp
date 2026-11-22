export const blogCategories = [
  { id: 'development', label: 'システム開発', badge: 'システム\n開発' },
  { id: 'automation', label: '業務改善・自動化', badge: '業務改善\n自動化' },
  { id: 'ai', label: 'AI活用', badge: 'AI\n活用' },
  { id: 'website', label: 'HP制作', badge: 'HP\n制作' },
] as const;

export type BlogCategory = (typeof blogCategories)[number]['id'];
export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: readonly string[] }
  | { type: 'image'; src: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  publishedAt: string;
  image: { src: string; alt: string };
  blocks: readonly BlogBlock[];
};

// New articles only. Existing media.yottabyte.jp articles are deliberately not imported.
// WordPress ingestion and publication-triggered builds will be connected in a later phase.
export const blogPosts: readonly BlogPost[] = [];

export function blogCategory(id: BlogCategory) {
  return blogCategories.find((category) => category.id === id)!;
}

export function blogDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  })
    .format(new Date(`${date}T00:00:00+09:00`))
    .replaceAll('/', '.');
}
