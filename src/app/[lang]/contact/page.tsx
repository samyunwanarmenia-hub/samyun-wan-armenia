import ContactSection from '@/components/ContactSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs, SOCIAL_LINKS } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'contact');

const ContactPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['contact'] });

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/contact`,
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Samyun Wan Armenia',
      url: `${SITE_URL}/${lang}/contact`,
      sameAs: SOCIAL_LINKS,
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
      <ScriptLD json={breadcrumbData} />
      <ScriptLD json={contactSchema} />
      <ContactSection translations={t} />
    </>
  );
};

export default ContactPage;
