import Script from 'next/script';

type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
  postalCode?: string;
};

type ContactSchemaProps = {
  name: string;
  url: string;
  telephone: string;
  secondaryTelephone?: string;
  address: Address;
  openingHours?: string[];
  sameAs?: string[];
};

const ContactSchema = ({
  name,
  url,
  telephone,
  secondaryTelephone,
  address,
  openingHours,
  sameAs,
}: ContactSchemaProps) => {
  const contactPoints = [
    {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer support',
      availableLanguage: ['hy', 'ru', 'en'],
    },
  ];

  if (secondaryTelephone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: secondaryTelephone,
      contactType: 'sales',
      availableLanguage: ['hy', 'ru', 'en'],
    });
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    telephone,
    ...(secondaryTelephone ? { additionalProperty: [{ '@type': 'PropertyValue', name: 'Secondary Phone', value: secondaryTelephone }] } : {}),
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    contactPoint: contactPoints,
    ...(openingHours?.length ? { openingHours } : {}),
    ...(sameAs?.length ? { sameAs } : {}),
  };

  return (
    <Script id="contact-schema" type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  );
};

export default ContactSchema;
