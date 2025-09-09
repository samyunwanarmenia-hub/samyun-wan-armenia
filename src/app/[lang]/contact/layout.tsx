import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { contactInfoData } from '@/data/contactInfo';
import { ContactLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const contactDetails = contactInfoData.map(item => {
    if (item.key === 'phone') return t.contact.phoneNumbers.description;
    return item.details;
  }).join('; ');

  const pageTitle = t.hero.title + ' - ' + t.nav.contact;
  const pageDescription = t.contact.title + ' ' + contactDetails;
  const pageKeywords = `${t.hero.title}, ${t.nav.contact}, samyun wan, armenia, contact us, address, phone, working hours, связаться, адрес, телефон, часы работы`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-600w.jpg'; // Generic image for contact
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