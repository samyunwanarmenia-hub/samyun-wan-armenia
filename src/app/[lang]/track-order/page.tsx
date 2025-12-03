import TrackOrderSection from '@/components/TrackOrderSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/track-order');
  return {
    ...buildPageMetadata(params.lang, 'track-order', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const TrackOrderPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const _t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['track-order'] });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <TrackOrderSection />
    </>
  );
};

export default TrackOrderPage;
