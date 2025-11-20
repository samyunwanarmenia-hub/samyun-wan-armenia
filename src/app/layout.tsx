import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../app/globals.css";

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
} from "@/config/siteConfig";

import { productShowcaseData } from "@/data/productShowcaseData";
import { generateProductSchema, generateLocalBusinessSchema } from "@/utils/schemaUtils";
import { baseTestimonials } from "@/data/testimonials";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = 'AW-17742658374';

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const OG_IMAGE = `${SITE_URL}/optimized/og-image.jpg`;
const LOGO_URL = `${SITE_URL}/optimized/logo.png`;

/* 
 RootLayout metadata must stay MINIMAL.
 FULL SEO is handled inside [lang]/layout.tsx
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

/* --------- ORGANIZATION SCHEMA --------- */
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Samyun Wan Armenia",
  legalName: OFFICIAL_BUSINESS_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description: `${OFFICIAL_ACTIVITY}. ${OFFICIAL_CLASSIFICATION}. ${OFFICIAL_CITY}.`,
  keywords: [OFFICIAL_ACTIVITY, OFFICIAL_CLASSIFICATION].join(", "),
  sameAs: [
    "https://instagram.com/samyunwanarmenia",
    "https://facebook.com/samyunwanarmenia",
    "https://t.me/samyunwanarmenia",
    "https://www.tiktok.com/@samyunwanarmenia",
    "https://www.youtube.com/@samyunwanarmenia",
    "https://wa.me/37495653666",
    "https://wa.me/37496653666",
    "https://m.me/samyunwanarmenia",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PRIMARY_PHONE,
      contactType: "customer support",
      areaServed: "AM",
      availableLanguage: ["hy", "ru", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: SECONDARY_PHONE,
      contactType: "sales",
      areaServed: "AM",
      availableLanguage: ["hy", "ru", "en"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "AM",
    addressLocality: OFFICIAL_CITY,
  },
  areaServed: { "@type": "Country", name: "Armenia" },
  founder: { "@type": "Person", name: DIRECTOR_NAME },
  identifier: [
    { "@type": "PropertyValue", propertyID: "Registry Update", value: OFFICIAL_REGISTRY_LAST_UPDATE },
  ],
};

/* --------- PRODUCT SCHEMA --------- */
const heroProduct = productShowcaseData[0];

const productStructuredData = generateProductSchema({
  name: "Samyun Wan Armenia Original",
  description:
    "Authentic Samyun Wan complex with QR verification delivered directly from the official representative in Armenia.",
  image: OG_IMAGE,
  price: heroProduct.price ?? 0,
  priceCurrency: "AMD",
  reviews: baseTestimonials,
});

/* --------- LOCAL BUSINESS SCHEMA --------- */
const localBusinessStructuredData = generateLocalBusinessSchema();

/* --------- ROOT LAYOUT --------- */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="hy" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script id="ld-org" type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </Script>
        <Script id="ld-product" type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </Script>
        <Script id="ld-local" type="application/ld+json">
          {JSON.stringify(localBusinessStructuredData)}
        </Script>
      </head>

      <body>
        {(GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              id="ga-tag-manager"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GOOGLE_ANALYTICS_ID ? `gtag('config', '${GOOGLE_ANALYTICS_ID}', { anonymize_ip: true, send_page_view: false });` : ''}
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}

        {children}

        <noscript>
          <img
            src="https://mc.yandex.ru/watch/103962073"
            alt=""
            style={{ position: "absolute", left: "-9999px" }}
          />
        </noscript>
      </body>
    </html>
  );
};

export default RootLayout;
