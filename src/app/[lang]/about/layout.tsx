import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AboutLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.nav.about;
  const pageDescription = t.about.description;
  const pageKeywords = `${t.hero.title}, ${t.nav.about}, samyun wan, armenia, official representative, natural ingredients, proven effectiveness, safe to use, fast results`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-original-600w.jpg'; // Generic image for about page
  const pageImageAlt = t.nav.about;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'about',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return <>{children}</>;
};

export default AboutLayout;