import { translations } from '@/i18n/translations';
import { statsData } from '@/data/stats'; // Import statsData directly
import HeroSection from '@/components/HeroSection';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'home');

const LangPage = async ({ params }: { params: { lang: string } }) => {
  const currentLang = params.lang as keyof typeof translations;
  const _t = translations[currentLang] || translations.hy;

  return (
    <>
      <HeroSection stats={statsData} />
      <ProductShowcaseSection />
    </>
  );
};

export default LangPage;
