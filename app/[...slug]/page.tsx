import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage, RouteContent } from '@/app/_components/CorporatePages';
import { cases, news, routePaths, services } from '@/app/_data/site';
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
  const labels: Record<string, string> = {
    company: '企業情報',
    service: '事業内容',
    case: '対応事例',
    news: 'お知らせ',
    contact: 'お問い合わせ',
    'contact-thanks': 'お問い合わせ完了',
    privacypolicy: '個人情報保護方針',
    navigation: 'メニュー',
    '404': 'ページが見つかりません',
  };
  const title =
    path === 'service/automation'
      ? '業務改善・自動化'
      : path.startsWith('case/category/')
        ? services.find((s) => s.id === slug[2])?.title
        : path.startsWith('case/')
          ? cases.find((c) => c.id === slug[1])?.title
          : path.startsWith('news/category/')
            ? 'お知らせ'
            : path.startsWith('news/')
              ? news.find((n) => n.id === slug[1])?.title
              : labels[path];
  return {
    title: title ?? '合同会社YottaByte',
    alternates: { canonical: `/${path}/` },
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
