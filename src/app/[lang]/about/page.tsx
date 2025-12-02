import AboutSection from '@/components/AboutSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'about');

const AboutPage = ({ params }: { params: { lang: string } }) => {
  const _lang: SupportedLang = resolveLang(params.lang);

  return (
    <>
      <AboutSection />
    </>
  );
};

export default AboutPage;
