import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { contactInfoData } from '@/data/contactInfo';

interface ContactLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: ContactLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const contactDetails = contactInfoData.map(item => {
    if (item.key === 'phone') return t.contact.phoneNumbers.description;
    return item.details;
  }).join('; ');

  return {
    title: t.hero.title + ' - ' + t.nav.contact,
    description: t.contact.title + ' ' + contactDetails,
    keywords: `${t.hero.title}, ${t.nav.contact}, samyun wan, armenia, contact us, address, phone, working hours, связаться, адрес, телефон, часы работы`,
    openGraph: {
      title: t.hero.title + ' - ' + t.nav.contact,
      description: t.contact.title + ' ' + contactDetails,
      url: `https://samyunwanarmenia.netlify.app/${lang}/contact`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-600w.jpg', // Generic image for contact
          width: 600,
          height: 600,
          alt: t.nav.contact,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/contact`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/contact',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/contact',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/contact',
        'x-default': 'https://samyunwanarmenia.netlify.app/contact',
      },
    },
  };
}

const ContactLayout = ({ children }: ContactLayoutProps) => {
  return <>{children}</>;
};

export default ContactLayout;