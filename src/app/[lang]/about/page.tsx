import AboutSection from '@/components/AboutSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'about');

const AboutPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.hero.title, url: `${SITE_URL}/${lang}` },
    { name: t.about.title, url: `${SITE_URL}/${lang}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <AboutSection />
    </>
  );
};

export default AboutPage;
