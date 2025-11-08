import ContactSection from '@/components/ContactSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'contact');

const ContactPage = () => {
  return (
    <ContactSection />
  );
};

export default ContactPage;
