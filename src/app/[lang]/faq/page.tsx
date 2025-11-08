import FaqSection from '@/components/FaqSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'faq');

const FaqPage = () => {
  return (
    <FaqSection />
  );
};

export default FaqPage;
