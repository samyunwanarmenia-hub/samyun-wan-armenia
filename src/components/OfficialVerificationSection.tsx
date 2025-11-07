"use client";

import Link from 'next/link';
import Script from 'next/script';

import { useLayoutContext } from '@/context/LayoutContext';
import {
  evidenceDocuments,
  messengerChannels,
  officialSocialProfiles,
  registryRecords,
  trademarkRecords,
} from '@/data/officialEvidence';
import {
  DIRECTOR_NAME,
  OFFICIAL_ACTIVITY,
  OFFICIAL_BUSINESS_NAME,
  OFFICIAL_CITY,
  OFFICIAL_CLASSIFICATION,
  OFFICIAL_REGISTRY_LAST_UPDATE,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  SITE_URL,
} from '@/config/siteConfig';

const OfficialVerificationSection = () => {
  const { t } = useLayoutContext();

  const summaryItems = [
    { label: t.verification.legalNameLabel, value: OFFICIAL_BUSINESS_NAME },
    { label: t.verification.directorLabel, value: DIRECTOR_NAME },
    { label: t.verification.activityLabel, value: OFFICIAL_ACTIVITY },
    { label: t.verification.classificationLabel, value: OFFICIAL_CLASSIFICATION },
    { label: t.verification.addressLabel, value: OFFICIAL_CITY },
    { label: t.verification.lastUpdatedLabel, value: OFFICIAL_REGISTRY_LAST_UPDATE },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: OFFICIAL_BUSINESS_NAME,
    legalName: OFFICIAL_BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/optimized/og-image.jpg`,
    telephone: [PRIMARY_PHONE, SECONDARY_PHONE],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AM',
      addressLocality: 'Yerevan',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Republic of Armenia',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: PRIMARY_PHONE,
        availableLanguage: ['hy', 'ru', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: SECONDARY_PHONE,
        availableLanguage: ['hy', 'ru', 'en'],
      },
    ],
    founder: {
      '@type': 'Person',
      name: DIRECTOR_NAME,
    },
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'Spyur ID',
        value: '52453',
        url: registryRecords[2]?.url ?? registryRecords[0]?.url,
      },
    ],
    sameAs: [
      ...officialSocialProfiles.map(profile => profile.url),
      ...registryRecords.map(item => item.url),
      ...trademarkRecords.map(item => item.url),
      ...evidenceDocuments.map(item => item.url),
    ],
  };

  return (
    <>
      <Script id="ld-official-verification" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <span className="inline-flex items-center px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 bg-emerald-950/60 border border-emerald-500/60 rounded-full">
              {t.verification.badge}
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white">{t.verification.title}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">{t.verification.subtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-12">
            {summaryItems.map(item => (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/30"
              >
                <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
                <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">{t.verification.socialTitle}</h2>
              <p className="text-sm text-gray-300 mb-4">{t.verification.socialDescription}</p>
              <ul className="space-y-2">
                {officialSocialProfiles.map(profile => (
                  <li key={profile.url}>
                    <Link
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm font-medium"
                    >
                      {profile.name}
                      {profile.handle ? ` — ${profile.handle}` : ''}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">{t.verification.registryTitle}</h2>
              <p className="text-sm text-gray-300 mb-4">{t.verification.registryDescription}</p>
              <ul className="space-y-2">
                {registryRecords.map(record => (
                  <li key={record.url}>
                    <Link
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm font-medium"
                    >
                      {record.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">{t.verification.trademarkTitle}</h2>
              <p className="text-sm text-gray-300 mb-4">{t.verification.trademarkDescription}</p>
              <ul className="space-y-2">
                {trademarkRecords.map(record => (
                  <li key={record.url}>
                    <Link
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm font-medium"
                    >
                      {record.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">{t.verification.documentsTitle}</h2>
              <p className="text-sm text-gray-300 mb-4">{t.verification.documentsDescription}</p>
              <ul className="space-y-2">
                {evidenceDocuments.map(record => (
                  <li key={record.url}>
                    <Link
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm font-medium"
                    >
                      {record.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border border-white/5 rounded-2xl p-6 bg-white/5 shadow-xl shadow-black/40">
            <h2 className="text-xl font-semibold text-white mb-2">{t.verification.contactsTitle}</h2>
            <p className="text-sm text-gray-300 mb-4">{t.verification.contactsDescription}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 text-sm font-semibold text-white">
              <Link href={`tel:${PRIMARY_PHONE}`} className="hover:text-emerald-300 transition-colors">
                {PRIMARY_PHONE}
              </Link>
              <Link href={`tel:${SECONDARY_PHONE}`} className="hover:text-emerald-300 transition-colors mt-2 sm:mt-0">
                {SECONDARY_PHONE}
              </Link>
            </div>
            <ul className="mt-4 space-y-2">
              {messengerChannels.map(channel => (
                <li key={channel.url}>
                  <Link
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-emerald-200 transition-colors text-sm font-medium"
                  >
                    {channel.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfficialVerificationSection;
