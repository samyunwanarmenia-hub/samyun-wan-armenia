import ContactSection from '@/components/ContactSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { SOCIAL_LINKS, buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ContactSchema from '@/components/ContactSchema';
import { CONTACT_ADDRESS_HTML } from '@/config/siteConfig';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/contact');
  return {
    ...buildPageMetadata(params.lang, 'contact', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const ContactPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['contact'] });

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

  const cleanAddress = CONTACT_ADDRESS_HTML.replace(/<br\s*\/?>/gi, ', ').replace(/\s+/g, ' ').trim();
  const addressParts = cleanAddress.split(',').map(part => part.trim());
  const address = {
    streetAddress: addressParts[0] || '1 Teryan St',
    addressLocality: addressParts[1] || 'Yerevan',
    addressCountry: addressParts[addressParts.length - 1] || 'Armenia',
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ScriptLD json={contactSchema} />
      <ContactSchema
        name="Samyun Wan Armenia"
        url={`${SITE_URL}/${lang}/contact`}
        telephone={PRIMARY_PHONE}
        secondaryTelephone={SECONDARY_PHONE}
        address={address}
        openingHours={[
          'Mo-Sa 09:00-23:00',
          'Su 10:00-18:00',
        ]}
        sameAs={SOCIAL_LINKS}
      />
      <ContactSection translations={t} />
    </>
  );
};

export default ContactPage;
