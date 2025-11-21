import FaqSection from '@/components/FaqSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs, generateFAQSchemaFromTranslations } from '@/utils/schemaUtils';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'faq');

const FaqPage = ({ params }: { params: { lang: string } }) => {
  const currentLang: SupportedLang = resolveLang(params.lang);
  const t = translations[currentLang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang: currentLang, segments: ['faq'] });
  const faqSchema = generateFAQSchemaFromTranslations(currentLang);

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <ScriptLD json={faqSchema} />
      <FaqSection />
    </>
  );
};

export default FaqPage;
