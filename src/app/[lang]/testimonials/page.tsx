import dynamic from 'next/dynamic';

import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/testimonials');
  return {
    ...buildPageMetadata(params.lang, 'testimonials', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const TestimonialsPageClient = dynamic(() => import('./Client'), { ssr: false });

const TestimonialsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const _t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['testimonials'] });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <TestimonialsPageClient />
    </>
  );
};

export default TestimonialsPage;
