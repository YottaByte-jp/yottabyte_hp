import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShonanHome from '@/app/_components/shonan/ShonanHome';
import { InnerExperience } from '@/app/_components/shonan/InnerExperience';
import { InnerPages } from '@/app/_components/shonan/InnerPages';
import { ShonanFooter } from '@/app/_components/shonan/ShonanFooter';
import { innerPaths } from '@/app/_components/shonan/innerContent';
import { shonanFonts } from '@/app/_components/shonan/typography';
import { getPageSeo, siteName } from '@/app/_lib/seo';
const paths = [...innerPaths, 'navigation'];
export const dynamicParams = false;
export function generateStaticParams() {
  return paths.map((path) => ({ slug: path.split('/') }));
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
      siteName,
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
  if (!paths.includes(path)) notFound();
  if (path === 'navigation') return <ShonanHome />;
  return (
    <InnerExperience key={path} fontClass={shonanFonts} footer={<ShonanFooter />}>
      <InnerPages path={path} />
    </InnerExperience>
  );
}
