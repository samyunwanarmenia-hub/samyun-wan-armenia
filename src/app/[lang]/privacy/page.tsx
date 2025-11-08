import { LEGAL_COPY, type SupportedLang, buildPageMetadata } from '@/utils/pageMetadata';

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
    <div className="max-w-3xl mx-auto py-16 px-4 text-center text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{copy.privacyTitle}</h1>
      <p className="mb-8 text-lg">{copy.privacyDescription}</p>
      <p className="mb-8 text-md text-warning-500">{notice}</p>
    </div>
  );
};

export default PrivacyPage;
