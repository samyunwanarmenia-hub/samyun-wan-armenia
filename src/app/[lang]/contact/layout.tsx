import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { contactInfoData } from '@/data/contactInfo';
import { ContactLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;

  const contactDetails = contactInfoData
    .map(item => (item.key === 'phone' ? t.contact.phoneNumbers.description : item.details))
    .join('; ');

  const pageTitle = `${t.hero.title} - ${t.nav.contact}`;
  const pageDescription = `${t.contact.title}. ${contactDetails}`.trim();
  const pageKeywords = [
    t.hero.title,
    t.nav.contact,
    'Samyun Wan Armenia',
    'контакты Samyun Wan',
    'Samyun Wan կապ',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-armenia-600w.jpg`;
  const pageImageAlt = t.nav.contact;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'contact',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const ContactLayout = ({ children }: ContactLayoutProps) => {
  return <>{children}</>;
};

export default ContactLayout;
