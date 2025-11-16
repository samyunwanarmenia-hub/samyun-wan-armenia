import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { AboutLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = t.hero.title + ' - ' + t.nav.about;
  const pageDescription = t.about.description;
  const pageKeywords = `${t.hero.title}, ${t.nav.about}, samyun wan, armenia, official representative, natural ingredients, proven effectiveness, safe to use, fast results`;
  const pageImage = `${SITE_URL}/optimized/samyun-wan-armenia-original-600w.jpg`; // Generic image for about page
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
