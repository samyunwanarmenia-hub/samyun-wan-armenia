import BenefitsSection from '@/components/BenefitsSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'benefits');

const BenefitsPage = () => {
  return <BenefitsSection />;
};

export default BenefitsPage;
