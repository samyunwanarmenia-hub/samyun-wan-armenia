import { translations } from '@/i18n/translations';
import { statsData } from '@/data/stats'; // Import statsData directly
import dynamic from 'next/dynamic';
import { buildPageMetadata } from '@/utils/pageMetadata';

// Lazy load sections to reduce initial bundle size
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: true, // Keep SSR for SEO
});

const ProductShowcaseSection = dynamic(() => import('@/components/ProductShowcaseSection'), {
  ssr: true, // Keep SSR for SEO
});

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
