import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import '../app/globals.css';

import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  variable: '--font-inter',
  display: 'swap',
});

const DEFAULT_META_TITLE = 'Samyun Wan Armenia — Официальный дистрибьютор';
const DEFAULT_META_DESCRIPTION =
  'Официальный дистрибьютор Samyun Wan в Армении. Оригинальная продукция с QR-проверкой подлинности, консультацией и доставкой по всей стране.';
const OG_IMAGE = `${SITE_URL}/optimized/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META_TITLE,
    template: `%s | Samyun Wan Armenia`,
  },
  description: DEFAULT_META_DESCRIPTION,
  keywords:
    'Samyun Wan Armenia, оригинальный Samyun Wan, проверка QR-кода, официальный дистрибьютор, натуральные добавки, контроль веса, доставка по Армении',
  authors: [{ name: 'Samyun Wan Armenia' }, { name: 'Aleksandr Gevorgyan' }],
  openGraph: {
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Samyun Wan Armenia — Официальный дистрибьютор',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Samyun Wan Armenia — оригинальная продукция с QR-проверкой',
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
    'Samyun Wan Armenia — официальный дистрибьютор оригинальных продуктов Samyun Wan в Армении с проверкой QR-кода и поддержкой производителя.',
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
    'Оригинальный комплекс Samyun Wan с проверкой QR-кода для комфортного набора или контроля веса. Доступно только у официального дистрибьютора в Армении.',
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

const resolveHtmlLang = (paramsLang?: string) => {
  if (!paramsLang) {
    return 'hy';
  }

  const normalizedLang = paramsLang.toLowerCase();
  return SUPPORTED_HTML_LANGS.has(normalizedLang) ? normalizedLang : 'hy';
};

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) => {
  const htmlLang = resolveHtmlLang(params?.lang);

  return (
    <html lang={htmlLang} className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="ld-organization" type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </Script>
        <Script id="ld-product" type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </Script>
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


