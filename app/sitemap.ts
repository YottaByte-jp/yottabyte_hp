import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yottabyte.jp',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
