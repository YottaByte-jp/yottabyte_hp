import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage, RouteContent } from '@/app/_components/CorporatePages';
import { routePaths } from '@/app/_data/site';
import { getPageSeo } from '@/app/_lib/seo';
export const dynamicParams = false;
export function generateStaticParams() {
  return routePaths.map((path) => ({ slug: path.slice(1).split('/') }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join('/');
  const { title, description } = getPageSeo(path);
  return {
    title,
    description,
    alternates: { canonical: `/${path}/` },
    openGraph: {
      title: `${title} | 合同会社YottaByte`,
      description,
      url: `https://yottabyte.jp/${path}/`,
      type: 'website',
      locale: 'ja_JP',
      siteName: 'YottaByte',
      images: [{ url: '/yottabyte_logo.png', width: 1254, height: 1254, alt: 'YottaByte' }],
    },
    ...(['navigation', '404', 'contact-thanks'].includes(path)
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join('/');
  if (!routePaths.includes(`/${path}`)) notFound();
  if (path === 'navigation') return <HomePage />;
  return (
    <main id="main-content" className="inner-page">
      <RouteContent path={path} />
    </main>
  );
}
