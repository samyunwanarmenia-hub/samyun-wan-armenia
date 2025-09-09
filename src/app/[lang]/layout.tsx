import { ReactNode } from 'react';
import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { generateOrganizationStructuredData, generateFaqStructuredData, generateWebSiteStructuredData } from '@/utils/structuredDataUtils';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility
import LayoutClientProvider from '@/components/LayoutClientProvider'; // Import LayoutClientProvider

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

// Generate dynamic metadata for each language
export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.hero.subtitle + ' | ' + t.hero.seo_title_addon;
  const pageDescription = t.hero.tagline + ' ' + t.about.description + ' ' + t.benefits.subtitle;
  const pageKeywords = `${t.hero.title}, ${t.hero.subtitle}, ${t.hero.tagline}, samyun wan, armenia, քաշի ավելացում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան, Samyun Wan Armenia, weight gain, natural capsules, Indonesian, original Samyun Wan Yerevan, weight loss Armenia, sports nutrition, health supplements, ${t.about.natural.title}, ${t.benefits.appetite.title}, ${t.productShowcase.weightGainLabel}, ${t.productShowcase.weightLossLabel}, ${t.authenticity.title}, ${t.testimonials.title}, ${t.faq.q1}, ${t.contact.title}`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/og-image.jpg';
  const pageImageAlt = t.hero.title + ' - ' + t.hero.subtitle;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: '', // Home page
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

// This function tells Next.js which 'lang' parameters to pre-render or expect
export async function generateStaticParams() {
  const locales = Object.keys(translations);
  return locales.map((lang) => ({ lang: lang }));
}

const LangLayout = ({ children, params }: LangLayoutProps) => {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian
  const baseUrl = 'https://samyunwanarmenia.netlify.app';
  const organizationStructuredData = generateOrganizationStructuredData(t, lang);
  const faqStructuredData = generateFaqStructuredData(t, lang); // Generate FAQ structured data here
  const webSiteStructuredData = generateWebSiteStructuredData(baseUrl, t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }}
      />
      <LayoutClientProvider initialLang={params.lang}>
        {children}
      </LayoutClientProvider>
    </>
  );
};

export default LangLayout;