import { ReactNode } from 'react';
import { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { generateBreadcrumbSchema } from '@/utils/schemaUtils';
import LayoutClientProvider from '@/components/LayoutClientProvider';
import HtmlLangSetter from '@/components/HtmlLangSetter';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const lang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const pageTitle = `${t.hero.title} - ${t.hero.subtitle} | ${t.hero.seo_title_addon}`;
  const pageDescription = `${t.hero.tagline} ${t.about.description} ${t.benefits.subtitle}`.trim();
  const pageKeywords = [
    t.hero.title,
    t.hero.subtitle,
    t.hero.tagline,
    'Samyun Wan Armenia',
    'Samyun Wan QR verification',
    'Samyun Wan authenticity check',
    t.authenticity.title,
    t.testimonials.title,
    t.contact.title,
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/og-image.jpg`;
  const pageImageAlt = `${t.hero.title} - ${t.hero.subtitle}`;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: '',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

export async function generateStaticParams() {
  const locales = Object.keys(translations);
  return locales.map(lang => ({ lang }));
}

const LangLayout = ({ children, params }: LangLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const logoUrl = `${SITE_URL}/optimized/logo.png`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    url: SITE_URL,
    logo: logoUrl,
    sameAs: [
      'https://instagram.com/samyunwanarmenia',
      'https://facebook.com/samyunwanarmenia',
      'https://t.me/samyunwanarmenia',
      'https://www.tiktok.com/@samyunwanarmenia',
      'https://www.youtube.com/@samyunwanarmenia',
    ],
  };

  const webSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: t.hero.title,
    inLanguage: lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.hero.title, url: `${SITE_URL}/${lang}` },
  ]);

  return (
    <>
      <HtmlLangSetter lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <LayoutClientProvider initialLang={params.lang}>
        {children}
      </LayoutClientProvider>
    </>
  );
};

export default LangLayout;
