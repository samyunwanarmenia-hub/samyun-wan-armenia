import FaqSection from '@/components/FaqSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateFAQSchema } from '@/utils/schemaUtils';
import Script from 'next/script';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'faq');

const FaqPage = ({ params }: { params: { lang: string } }) => {
  const currentLang = params.lang as keyof typeof translations;
  const t = translations[currentLang] || translations.hy;

  // Generate FAQ schema for rich snippets
  const faqData = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
  ];

  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <FaqSection />
    </>
  );
};

export default FaqPage;
