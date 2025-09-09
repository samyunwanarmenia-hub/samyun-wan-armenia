import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { benefitsItemsData } from '@/data/benefitsItems';
import { BenefitsLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: BenefitsLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const benefitKeywords = benefitsItemsData.map(item => t.benefits[item.key].title).join(', ');
  const benefitDescriptions = benefitsItemsData.map(item => t.benefits[item.key].desc).join('; ');

  const pageTitle = t.hero.title + ' - ' + t.benefits.title;
  const pageDescription = t.benefits.subtitle + ' ' + benefitDescriptions;
  const pageKeywords = `${t.hero.title}, ${t.benefits.title}, ${t.benefits.subtitle}, samyun wan, armenia, ${benefitKeywords}, քաշի ավելացում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան, appetite enhancement, weight gain, immunity boost, energy levels, metabolism improvement, mood enhancement`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-vitamin-gain-whey-600w.jpg'; // Specific image for benefits page
  const pageImageAlt = t.benefits.title;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'benefits',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const BenefitsLayout = ({ children }: BenefitsLayoutProps) => {
  return <>{children}</>;
};

export default BenefitsLayout;