import { LEGAL_COPY, buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import LegalPageLayout from '@/components/LegalPageLayout';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'terms');

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Վերջնական կանոնները կհրապարակենք շուտով։',
  ru: 'Окончательная версия условий будет опубликована в ближайшее время.',
  en: 'Full terms & conditions will be published here soon.',
};

const TermsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;

  return (
    <LegalPageLayout
      title={copy.termsTitle}
      description={copy.termsDescription}
      notice={notice}
      type="terms"
    />
  );
};

export default TermsPage;
