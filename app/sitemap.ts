import type { MetadataRoute } from 'next';
import { innerPaths } from '@/app/_components/shonan/innerContent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', ...innerPaths.filter((p) => !['404', 'contact-thanks'].includes(p))].map((path) => ({
    url: new URL(path ? `${path}/` : '/', 'https://yottabyte.jp/').href,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
