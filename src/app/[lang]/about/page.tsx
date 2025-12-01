import AboutSection from '@/components/AboutSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { translations } from '@/i18n/translations';
import { resolveLang, type SupportedLang } from '@/config/locales';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'about');

const AboutPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  return (
    <>
      <AboutSection />
    </>
  );
};

export default AboutPage;
