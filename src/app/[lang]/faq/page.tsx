import FaqSection from '@/components/FaqSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { generateBreadcrumbs, generateFAQSchemaFromTranslations } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/faq');
  return {
    ...buildPageMetadata(params.lang, 'faq', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const FaqPage = ({ params }: { params: { lang: string } }) => {
  const currentLang: SupportedLang = resolveLang(params.lang);

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
