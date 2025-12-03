import Script from 'next/script';

import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { SOCIAL_LINKS } from '@/utils/schemaUtils';

const OrganizationSchema = () => {
  const contactPoints = [
    {
      '@type': 'ContactPoint',
      telephone: PRIMARY_PHONE,
      contactType: 'customer support',
      availableLanguage: ['hy', 'ru', 'en'],
    },
  ];

  if (SECONDARY_PHONE) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: SECONDARY_PHONE,
      contactType: 'sales',
      availableLanguage: ['hy', 'ru', 'en'],
    });
  }

  const sameAs = SOCIAL_LINKS?.length ? SOCIAL_LINKS : undefined;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    url: SITE_URL,
    logo: `${SITE_URL}/optimized/logo.png`,
    ...(sameAs ? { sameAs } : {}),
    contactPoint: contactPoints,
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  );
};

export default OrganizationSchema;
