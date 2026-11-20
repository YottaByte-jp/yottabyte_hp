import ShonanHome from '@/app/_components/shonan/ShonanHome';
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
      <ShonanHome />
    </>
  );
}
