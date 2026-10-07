import type { MetadataRoute } from 'next';
import { routePaths } from '@/app/_data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    ...routePaths.filter((p) => !['/404', '/navigation', '/contact-thanks'].includes(p)),
  ].map((path) => ({
    url: `https://yottabyte.jp${path === '/' ? '/' : `${path}/`}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
