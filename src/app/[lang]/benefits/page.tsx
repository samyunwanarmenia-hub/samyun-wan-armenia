import { Suspense } from 'react';
import BenefitsSection from '@/components/BenefitsSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/benefits');
  return {
    ...buildPageMetadata(params.lang, 'benefits', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

export const revalidate = 60 * 60 * 12; // refresh twice a day

const BenefitsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['benefits'] });
  const fallbackLabel = `${t.benefits.title} placeholder`;

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <Suspense
        fallback={
          <section
            className="min-h-[320px] rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse"
            aria-label={fallbackLabel}
          />
        }
      >
        <BenefitsSection />
      </Suspense>
    </>
  );
};

export default BenefitsPage;
