import { InnerExperience } from '@/app/_components/shonan/InnerExperience';
import { InnerPages } from '@/app/_components/shonan/InnerPages';
import { ShonanFooter } from '@/app/_components/shonan/ShonanFooter';
import { shonanFonts } from '@/app/_components/shonan/typography';
export default function NotFound() {
  return (
    <InnerExperience fontClass={shonanFonts} footer={<ShonanFooter />}>
      <InnerPages path="404" />
    </InnerExperience>
  );
}
