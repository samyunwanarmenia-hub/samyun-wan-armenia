import { LEGAL_COPY, buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import LegalPageLayout from '@/components/LegalPageLayout';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import ScriptLD from '@/components/ScriptLD';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'privacy');

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Վերջնական իրավական տեքստը շուտով կավելացնենք այս բաժնում։',
  ru: 'Окончательный юридический текст появится в этом разделе совсем скоро.',
  en: 'Full legal text will be published here soon.',
};

const PrivacyPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['privacy'] });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <LegalPageLayout
        title={copy.privacyTitle}
        description={copy.privacyDescription}
        notice={notice}
        type="privacy"
      />
    </>
  );
};

export default PrivacyPage;
