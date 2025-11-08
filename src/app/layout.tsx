import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { headers } from 'next/headers';

import '../app/globals.css';

import {
  SITE_URL,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  OFFICIAL_BUSINESS_NAME,
  DIRECTOR_NAME,
  OFFICIAL_ACTIVITY,
  OFFICIAL_CLASSIFICATION,
  OFFICIAL_CITY,
  OFFICIAL_REGISTRY_LAST_UPDATE,
} from '@/config/siteConfig';
import { productShowcaseData } from '@/data/productShowcaseData';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const DEFAULT_META_TITLE = 'Samyun Wan Armenia — Official distributor in Armenia';
const DEFAULT_META_DESCRIPTION =
  'Official store of Samyun Wan Armenia. Authentic Samyun Wan products with QR verification, multilingual support, and fast nationwide delivery.';
const OG_IMAGE = `${SITE_URL}/optimized/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META_TITLE,
    template: `%s | Samyun Wan Armenia`,
  },
  description: DEFAULT_META_DESCRIPTION,
  keywords:
    'Samyun Wan, Samyun Wan Armenia, QR verification, weight gain supplements, authentic Samyun Wan, Armenia official store',
  authors: [{ name: 'Samyun Wan Armenia' }, { name: 'Aleksandr Gevorgyan' }],
  openGraph: {
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Samyun Wan Armenia',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Samyun Wan Armenia official distributor',
      },
    ],
    locale: 'hy_AM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@samyunwanarmenia',
    creator: '@samyunwanarmenia',
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'hy-AM': `${SITE_URL}/hy`,
      'ru-RU': `${SITE_URL}/ru`,
      'en-US': `${SITE_URL}/en`,
      'x-default': SITE_URL,
    },
  },
  verification: {
    google: 'zAW0LZsUTQ179ySPIQOmESS0xJZldVzO8ZhNvDMCSCg',
    other: {
      'google-site-verification': 'PgWy3NRrCwyiyKAUXBeTSNRMigT6X0ufwZ-OgVaDXP0',
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    apple: '/favicon.png',
  },
};

const organizationDescription = `${OFFICIAL_ACTIVITY}. ${OFFICIAL_CLASSIFICATION}. ${OFFICIAL_CITY}.`;

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Samyun Wan Armenia',
  legalName: OFFICIAL_BUSINESS_NAME,
  url: SITE_URL,
  logo: OG_IMAGE,
  description: organizationDescription,
  keywords: [OFFICIAL_ACTIVITY, OFFICIAL_CLASSIFICATION].join(', '),
  sameAs: [
    'https://facebook.com/samyunwanarmenia',
    'https://instagram.com/samyunwanarmenia',
    'https://tiktok.com/@samyunwanarmenia',
    'https://youtube.com/@samyunwanarmenia',
    'https://t.me/samyunwanarmenia',
    'https://wa.me/37495653666',
    'https://wa.me/37496653666',
    'https://m.me/samyunwanarmenia',
    'https://www.spyur.am/am/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/',
    'https://www.spyur.am/ru/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/',
    'https://www.spyur.am/en/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/',
    'https://www.spyur.am/en/trademarks/?trademark=%22SAMYUN+WAN%22&search=1',
    'https://share.google/CGBO0M5UovfwgV3JM',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: PRIMARY_PHONE,
      contactType: 'customer support',
      areaServed: 'AM',
      availableLanguage: ['hy', 'ru', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: SECONDARY_PHONE,
      contactType: 'sales',
      areaServed: 'AM',
      availableLanguage: ['hy', 'ru', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AM',
    addressLocality: OFFICIAL_CITY,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Armenia',
  },
  founder: {
    '@type': 'Person',
    name: DIRECTOR_NAME,
  },
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'Spyur ID',
      value: '52453',
      url: 'https://www.spyur.am/en/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/',
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'Last update',
      value: OFFICIAL_REGISTRY_LAST_UPDATE,
    },
  ],
  hasCredential: [
    {
      '@type': 'CreativeWork',
      url: 'https://www.spyur.am/en/trademarks/?trademark=%22SAMYUN+WAN%22&search=1',
      name: 'Spyur trademark register entry for “SAMYUN WAN”',
    },
  ],
};

const heroProduct = productShowcaseData[0];
const priceValidUntil = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

const productStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Samyun Wan Armenia Original',
  description:
    'Authentic Samyun Wan complex with QR verification delivered directly from the official representative in Armenia.',
  image: OG_IMAGE,
  brand: {
    '@type': 'Brand',
    name: 'Samyun Wan',
  },
  offers: {
    '@type': 'Offer',
    url: SITE_URL,
    priceCurrency: 'AMD',
    price: heroProduct.price ?? 0,
    priceValidUntil,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Samyun Wan Armenia',
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: heroProduct.price ?? 0,
      priceCurrency: 'AMD',
      priceValidUntil,
    },
  },
};

const SUPPORTED_HTML_LANGS = new Set(['hy', 'ru', 'en']);

const resolveHtmlLang = () => {
  const headerLang = headers().get('x-current-lang');
  if (headerLang && SUPPORTED_HTML_LANGS.has(headerLang)) {
    return headerLang;
  }
  return 'hy';
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const htmlLang = resolveHtmlLang();

  return (
    <html lang={htmlLang} className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="ld-organization" type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </Script>
        <Script id="ld-product" type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </Script>
        {GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              id="ga-tag-manager"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-initializer" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                  anonymize_ip: true,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}
        {children}
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/103962073"
              alt=""
              style={{ position: 'absolute', left: '-9999px' }}
            />
          </div>
        </noscript>
      </body>
    </html>
  );
};

export default RootLayout;
