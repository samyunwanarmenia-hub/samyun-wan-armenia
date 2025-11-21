import { ReactNode } from 'react';
import { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import LayoutClientProvider from '@/components/LayoutClientProvider';
import HtmlLangSetter from '@/components/HtmlLangSetter';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import ScriptLD from '@/components/ScriptLD';

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const lang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  return generatePageMetadata({
    lang,
    titleKey: 'hero.title',
    descriptionKey: 'hero.tagline',
    keywords: [
      t.hero.subtitle,
      t.hero.tagline,
      t.authenticity.title,
      t.contact.title,
    ],
    pagePath: '',
    image: `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(t.hero.title)}`,
    imageAlt: `${t.hero.title} - ${t.hero.subtitle}`,
    titleOverride: `${t.hero.title} - ${t.hero.subtitle}`,
    descriptionOverride: `${t.hero.tagline} ${t.about.description} ${t.benefits.subtitle}`.trim(),
  });
}

export async function generateStaticParams() {
  const locales = Object.keys(translations);
  return locales.map(lang => ({ lang }));
}

const LangLayout = ({ children, params }: LangLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const webSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: t.hero.title,
    inLanguage: lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
  };

  return (
    <>
      <HtmlLangSetter lang={lang} />

      <ScriptLD json={webSiteStructuredData} />

      <LayoutClientProvider initialLang={lang}>
        {children}
      </LayoutClientProvider>
    </>
  );
};

export default LangLayout;
