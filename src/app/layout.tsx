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

import { generateLocalBusinessSchema, SOCIAL_LINKS } from "@/utils/schemaUtils";
import { SEO_KEYWORDS } from "@/config/seoKeywords";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = 'AW-17742658374';

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

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
  keywords: SEO_KEYWORDS.hy.join(', '),
};

/* --------- ORGANIZATION SCHEMA --------- */
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}#organization`,
  "@type": "Organization",
  name: "Samyun Wan Armenia",
  legalName: OFFICIAL_BUSINESS_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description: `${OFFICIAL_ACTIVITY}. ${OFFICIAL_CLASSIFICATION}. ${OFFICIAL_CITY}.`,
  keywords: [OFFICIAL_ACTIVITY, OFFICIAL_CLASSIFICATION].join(", "),
  sameAs: SOCIAL_LINKS,
  inLanguage: ["hy-AM", "ru-RU", "en-US"],
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

/* --------- LOCAL BUSINESS SCHEMA --------- */
const localBusinessStructuredData = generateLocalBusinessSchema(SEO_KEYWORDS.hy);

/* --------- ROOT LAYOUT --------- */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="hy" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script id="ld-org" type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </Script>
        <Script id="ld-local" type="application/ld+json">
          {JSON.stringify(localBusinessStructuredData)}
        </Script>
      </head>

      <body>
        {(GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              id="google-gtag-aw-script"
              src="https://www.googletagmanager.com/gtag/js?id=AW-17742658374"
              strategy="afterInteractive"
            />
            <Script id="google-gtag-aw-init" strategy="afterInteractive">
              {`
                // Google tag (gtag.js)
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
                ${GOOGLE_ANALYTICS_ID ? `gtag('config', '${GOOGLE_ANALYTICS_ID}', { anonymize_ip: true, send_page_view: false });` : ''}
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
