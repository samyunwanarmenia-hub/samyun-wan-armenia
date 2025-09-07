import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { generateFaqStructuredData } from '@/utils/structuredDataUtils';
import { FaqLayoutProps } from '@/types/global';

// The interface FaqLayoutProps is now imported from '@/types/global'
// and should not be redefined here.

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  return {
    title: t.hero.title + ' - ' + t.nav.faq,
    description: t.faq.q1, // Use the first FAQ question as description
    keywords: `${t.hero.title}, ${t.nav.faq}, samyun wan, armenia, FAQ, часто задаваемые вопросы, Samyun Wan вопросы, authenticity, side effects, usage`,
    openGraph: {
      title: t.hero.title + ' - ' + t.nav.faq,
      description: t.faq.q1,
      url: `https://samyunwanarmenia.netlify.app/${lang}/faq`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-product-600w.jpg', // Generic image for FAQ
          width: 600,
          height: 600,
          alt: t.nav.faq,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/faq`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/faq',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/faq',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/faq',
        'x-default': 'https://samyunwanarmenia.netlify.app/faq',
      },
    },
  };
}

const FaqLayout = ({ children, params }: FaqLayoutProps) => {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;
  const faqStructuredData = generateFaqStructuredData(t, lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
};

export default FaqLayout;