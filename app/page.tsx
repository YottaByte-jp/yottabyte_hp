import { HomePage } from '@/app/_components/CorporatePages';
import { organizationData, websiteData } from '@/app/_lib/seo';
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData).replace(/</g, '\\u003c'),
        }}
      />
      <HomePage />
    </>
  );
}
