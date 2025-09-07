import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { benefitsItemsData } from '@/data/benefitsItems';
import { BenefitsLayoutProps } from '@/types/global'; // Import the new interface

export async function generateMetadata({ params }: BenefitsLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const benefitKeywords = benefitsItemsData.map(item => t.benefits[item.key].title).join(', ');
  const benefitDescriptions = benefitsItemsData.map(item => t.benefits[item.key].desc).join('; ');

  return {
    title: t.hero.title + ' - ' + t.benefits.title,
    description: t.benefits.subtitle + ' ' + benefitDescriptions,
    keywords: `${t.hero.title}, ${t.benefits.title}, ${t.benefits.subtitle}, samyun wan, armenia, ${benefitKeywords}, քաշի ավելացում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան, appetite enhancement, weight gain, immunity boost, energy levels, metabolism improvement, mood enhancement`,
    openGraph: {
      title: t.hero.title + ' - ' + t.benefits.title,
      description: t.benefits.subtitle + ' ' + benefitDescriptions,
      url: `https://samyunwanarmenia.netlify.app/${lang}/benefits`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-vitamin-gain-whey-600w.jpg', // Specific image for benefits page
          width: 600,
          height: 600,
          alt: t.benefits.title,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/benefits`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/benefits',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/benefits',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/benefits',
        'x-default': 'https://samyunwanarmenia.netlify.app/benefits',
      },
    },
  };
}

const BenefitsLayout = ({ children }: BenefitsLayoutProps) => {
  return <>{children}</>;
};

export default BenefitsLayout;