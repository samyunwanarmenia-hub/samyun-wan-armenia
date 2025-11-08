import { LEGAL_COPY, type SupportedLang, buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'terms');

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Վերջնական կանոնները կհրապարակենք շուտով։',
  ru: 'Окончательная версия условий будет опубликована в ближайшее время.',
  en: 'Full terms & conditions will be published here soon.',
};

const TermsPage = ({ params }: { params: { lang: string } }) => {
  const lang = (params.lang as SupportedLang) || 'hy';
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{copy.termsTitle}</h1>
      <p className="mb-8 text-lg">{copy.termsDescription}</p>
      <p className="mb-8 text-md text-warning-500">{notice}</p>
    </div>
  );
};

export default TermsPage;
