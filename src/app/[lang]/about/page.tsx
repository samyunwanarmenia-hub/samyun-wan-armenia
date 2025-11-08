import AboutSection from '@/components/AboutSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'about');

const AboutPage = () => {
  return (
    <>
      <AboutSection />
    </>
  );
};

export default AboutPage;
