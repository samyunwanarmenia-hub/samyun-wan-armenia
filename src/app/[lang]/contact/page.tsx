import ContactSection from '@/components/ContactSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'contact');

const ContactPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.hero.title, url: `${SITE_URL}/${lang}` },
    { name: t.contact.title, url: `${SITE_URL}/${lang}/contact` },
  ]);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Samyun Wan Armenia',
      url: `${SITE_URL}/${lang}/contact`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PRIMARY_PHONE,
          contactType: 'customer support',
          availableLanguage: ['hy', 'ru', 'en'],
        },
        {
          '@type': 'ContactPoint',
          telephone: SECONDARY_PHONE,
          contactType: 'customer support',
          availableLanguage: ['hy', 'ru', 'en'],
        },
      ],
    },
    inLanguage: lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
    name: t.contact.title,
    description: t.contact.phoneNumbers.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;
