import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { FaqLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

// The FAQ structured data is now generated in the root [lang]/layout.tsx
// so it's removed from here to avoid duplication.

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.nav.faq;
  const pageDescription = t.faq.q1; // Use the first FAQ question as description
  const pageKeywords = `${t.hero.title}, ${t.nav.faq}, samyun wan, armenia, FAQ, часто задаваемые вопросы, Samyun Wan вопросы, authenticity, side effects, usage`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-product-600w.jpg'; // Generic image for FAQ
  const pageImageAlt = t.nav.faq;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'faq',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const FaqLayout = ({ children }: FaqLayoutProps) => {
  return (
    <>
      {/* FAQ structured data is now generated in src/app/[lang]/layout.tsx */}
      {children}
    </>
  );
};

export default FaqLayout;