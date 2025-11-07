import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { headers } from 'next/headers';

import '../app/globals.css';

import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';

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

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Samyun Wan Armenia',
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    'Samyun Wan Armenia is the official representative delivering authentic Samyun Wan products with QR verification and direct support.',
  sameAs: [
    'https://facebook.com/samyunwanarmenia',
    'https://instagram.com/samyunwanarmenia',
    'https://tiktok.com/@samyunwanarmenia',
    'https://youtube.com/@samyunwanarmenia',
    'https://t.me/samyunwanarmenia',
    'https://wa.me/37495653666',
    'https://wa.me/37496653666',
    'https://m.me/samyunwanarmenia',
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
    addressLocality: 'Yerevan',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Armenia',
  },
};

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
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Samyun Wan Armenia',
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
