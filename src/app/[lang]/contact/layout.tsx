import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { contactInfoData } from '@/data/contactInfo';
import { ContactLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

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
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.nav.contact;

  return generatePageMetadata({
    lang,
    titleKey: 'nav.contact',
    descriptionKey: 'contact.title',
    keywords: pageKeywords,
    pagePath: 'contact',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const ContactLayout = ({ children }: ContactLayoutProps) => {
  return <>{children}</>;
};

export default ContactLayout;
