import { ReactNode } from 'react';
import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { generateOrganizationStructuredData, generateFaqStructuredData, generateWebSiteStructuredData } from '@/utils/structuredDataUtils';
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
  const pageUrl = `https://samyunwanarmenia.netlify.app/${lang}`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/og-image.jpg';
  const pageImageAlt = t.hero.title + ' - ' + t.hero.subtitle;

  return {
    title: {
      default: pageTitle,
      template: `%s | ${t.hero.title}`,
    },
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: 'Samyun Wan Armenia - Official',
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageImageAlt,
        },
      ],
      locale: lang === 'hy' ? 'hy_AM' : lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@samyunwanarmenia',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'hy-AM': `https://samyunwanarmenia.netlify.app/hy`,
        'ru-RU': `https://samyunwanarmenia.netlify.app/ru`,
        'en-US': `https://samyunwanarmenia.netlify.app/en`,
        'x-default': `https://samyunwanarmenia.netlify.app`,
      },
    },
  };
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
  const faqStructuredData = generateFaqStructuredData(t, lang); // Generate FAQ structured data
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