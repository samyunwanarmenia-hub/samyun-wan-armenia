import { LEGAL_COPY, type SupportedLang, buildPageMetadata } from '@/utils/pageMetadata';
import LegalPageLayout from '@/components/LegalPageLayout';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'privacy');

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Վերջնական իրավական տեքստը շուտով կավելացնենք այս բաժնում։',
  ru: 'Окончательный юридический текст появится в этом разделе совсем скоро.',
  en: 'Full legal text will be published here soon.',
};

const PrivacyPage = ({ params }: { params: { lang: string } }) => {
  const lang = (params.lang as SupportedLang) || 'hy';
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;

  return (
    <LegalPageLayout
      title={copy.privacyTitle}
      description={copy.privacyDescription}
      notice={notice}
      type="privacy"
    />
  );
};

export default PrivacyPage;
