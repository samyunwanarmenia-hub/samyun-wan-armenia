import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import '../app/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // Generic title and description, will be overridden by [lang]/layout.tsx
  title: {
    default: 'Samyun Wan Armenia - Official Distributor',
    template: `%s | Samyun Wan Armenia`,
  },
  description: 'Official distributor of Samyun Wan products in Armenia. Natural weight gain and weight loss solutions.',
  keywords: 'samyun wan, armenia, weight gain, weight loss, natural supplements, original product',
  authors: [{ name: 'Samyun Wan Armenia' }, { name: 'Aleksandr Gevorgyan' }],
  openGraph: {
    title: 'Samyun Wan Armenia - Official Distributor',
    description: 'Official distributor of Samyun Wan products in Armenia. Natural weight gain and weight loss solutions.',
    url: 'https://samyunwanarmenia.netlify.app',
    siteName: 'Samyun Wan Armenia - Official',
    images: [
      {
        url: 'https://samyunwanarmenia.netlify.app/optimized/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Samyun Wan Armenia Official Products',
      },
    ],
    locale: 'hy_AM', // Default locale for root OG, will be overridden
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samyun Wan Armenia - Official Distributor',
    description: 'Official distributor of Samyun Wan products in Armenia. Natural weight gain and weight loss solutions.',
    images: ['https://samyunwanarmenia.netlify.app/optimized/og-image.jpg'],
    creator: '@samyunwanarmenia',
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
    canonical: 'https://samyunwanarmenia.netlify.app',
    languages: {
      'hy-AM': 'https://samyunwanarmenia.netlify.app/hy',
      'ru-RU': 'https://samyunwanarmenia.netlify.app/ru',
      'en-US': 'https://samyunwanarmenia.netlify.app/en',
      'x-default': 'https://samyunwanarmenia.netlify.app',
    },
  },
  verification: {
    google: 'zAW0LZsUTQ179ySPIQOmESS0xJZldVzO8ZhNvDMCSCg',
  },
  // PWA Manifest
  manifest: '/site.webmanifest',
  icons: {
    apple: '/favicon.png', // Using favicon.png as apple-touch-icon
  },
  // themeColor and viewport are now handled by generateViewport in src/app/viewport.ts
  // themeColor: '#86b486', 
  // viewport: viewport,
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Head>
        {/* SEO: Official branding and strong warnings */}
        <title>Samyun Wan Armenia — Официальный сайт и дистрибьютор | Купить оригинальный Samyun Wan в Армении</title>
        <meta name="description" content="Только на нашем сайте вы купите оригинальный Samyun Wan с QR-кодом подтверждения! Мы — единственный официальный поставщик в Армении. Осторожно: в сети много мошенников и подделок!" />
        <meta name="keywords" content="Samyun Wan Armenia, официальный сайт, купить Samyun Wan, оригинал, проверка QR, официальный дистрибьютор, Армения, подделка, мошенники, оригинальный самюнь ван, дистрибуция, armwhey мошенники, armwhey подделка, armwhey fake, не покупайте на armwhey, только у нас оригинал, սպորտային սնունդ, վիտամիններ, protein, gainer, creatine, amino, Yerevan, Gyumri, Vanadzor, Artik, ՀՀ, միջազգային առցանց խանութ, բարձր որակ, մրցունակ գներ, արագ առաքում, անվճար առաքում" />
        <meta name="author" content="Samyun Wan Armenia, Aleksandr Gevorgyan" />

        {/* OG & Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Samyun Wan Armenia — Официальный сайт и дистрибьютор" />
        <meta property="og:description" content="Только у нас — оригинальный Samyun Wan с гарантией, проверкой по QR-коду на упаковке и официальной поддержкой производителя! Остерегайтесь фейковых сайтов!" />
        <meta property="og:url" content="https://samyunwanarmenia.netlify.app/" />
        <meta property="og:image" content="https://samyunwanarmenia.netlify.app/optimized/og-image.jpg" />
        <meta property="og:site_name" content="Samyun Wan Armenia — Официальный сайт" />
        <meta property="og:locale" content="hy_AM" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Samyun Wan Armenia — Официальный сайт и дистрибьютор" />
        <meta name="twitter:description" content="Официальная продажа Samyun Wan в Армении. Только оригинал, только у дистрибьютора! QR-код подтверждения подлинности." />
        <meta name="twitter:image" content="https://samyunwanarmenia.netlify.app/optimized/og-image.jpg" />
        
        {/* Organization Schema.org — официальный дистрибьютор */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Samyun Wan Armenia",
          "url": "https://samyunwanarmenia.netlify.app",
          "logo": "https://samyunwanarmenia.netlify.app/optimized/og-image.jpg",
          "sameAs": [
            "https://www.facebook.com/samyunwanarmenia/",
            "https://www.instagram.com/samyunwanarmenia/",
            "https://www.tiktok.com/@samyunwanarmenia/",
            "https://t.me/samyunwanarmenia",
            "https://www.youtube.com/@samyunwanarmenia",
            "https://www.spyur.am/ru/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/",
            "https://www.spyur.am/en/companies/samyun-wan-armenia-weight-loss-and-weight-gain-center/52453/"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+37495653666",
              "contactType": "customer support",
              "areaServed": "AM"
            }
          ],
          "description": "Официальный сайт и дистрибьютор Samyun Wan в Армении. Только здесь можно купить оригинальный продукт с гарантией QR-кода. ВНИМАНИЕ: armwhey.com - мошенники! Armwhey.com продает подделки! Не покупайте на armwhey.com!",
          "keywords": "Samyun Wan Armenia, официальный сайт, купить Samyun Wan, оригинал, проверка QR, официальный дистрибьютор, Армения, подделка, мошенники, armwhey мошенники, armwhey подделка, armwhey fake, не покупайте на armwhey, только у нас оригинал, սպորտային սնունդ, վիտամիններ, protein, gainer, creatine, amino, Yerevan, Gyumri, Vanadzor, Artik, ՀՀ, միջազգային առցանց խանութ, բարձր որակ, մրցունակ գներ, արագ առաքում, անվճար առաքում",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AM",
            "addressLocality": "Yerevan"
          },
          "foundingDate": "2020",
          "founder": {
            "@type": "Person",
            "name": "Aleksandr Gevorgyan"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Armenia"
          }
        }
        `}</script>
        
        {/* FAQ Schema for better search visibility */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Где купить оригинальный Samyun Wan в Армении?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Только на официальном сайте samyunwanarmenia.netlify.app! ВНИМАНИЕ: armwhey.com - мошенники! Armwhey.com продает подделки! Не покупайте на armwhey.com!"
              }
            },
            {
              "@type": "Question", 
              "name": "Как отличить оригинальный Samyun Wan от подделки?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Оригинальный Samyun Wan имеет QR-код на упаковке для проверки подлинности. Покупайте только у официального дистрибьютора. Остерегайтесь armwhey.com - это мошенники!"
              }
            },
            {
              "@type": "Question",
              "name": "armwhey.com официальный дистрибьютор Samyun Wan?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "НЕТ! armwhey.com - МОШЕННИКИ! armwhey.com НЕ является официальным дистрибьютором! armwhey.com продает подделки! Единственный официальный дистрибьютор - samyunwanarmenia.netlify.app"
              }
            }
          ]
        }
        `}</script>
        
        {/* Product Schema */}
        <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Samyun Wan Armenia Original",
          "description": "Оригинальный Samyun Wan для регулирования веса с QR-кодом подлинности. ВНИМАНИЕ: armwhey.com продает подделки!",
          "brand": {
            "@type": "Brand",
            "name": "Samyun Wan Armenia"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Samyun Wan Armenia Official"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://samyunwanarmenia.netlify.app",
            "priceCurrency": "AMD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Samyun Wan Armenia Official"
            }
          },
          "keywords": "Samyun Wan, оригинал, QR-код, armwhey мошенники, armwhey подделка"
        }
        `}</script>
        {/* Warning for search engines (abuse/fraud alert) */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="google-site-verification" content="zAW0LZsUTQ179ySPIQOmESS0xJZldVzO8ZhNvDMCSCg" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="AM" />
        <meta name="geo.placename" content="Yerevan" />
        <meta name="geo.position" content="40.1792;44.4991" />
        <meta name="ICBM" content="40.1792, 44.4991" />
        <meta name="DC.title" content="Samyun Wan Armenia - Официальный дистрибьютор" />
        <meta name="DC.creator" content="Aleksandr Gevorgyan" />
        <meta name="DC.subject" content="Samyun Wan, оригинал, Армения, armwhey мошенники" />
        <meta name="DC.description" content="Официальный дистрибьютор Samyun Wan в Армении. ВНИМАНИЕ: armwhey.com - мошенники!" />
        <meta name="DC.publisher" content="Samyun Wan Armenia" />
        <meta name="DC.contributor" content="Aleksandr Gevorgyan" />
        <meta name="DC.date" content="2025-01-27" />
        <meta name="DC.type" content="Text" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://samyunwanarmenia.netlify.app" />
        <meta name="DC.language" content="hy,ru,en" />
        <meta name="DC.coverage" content="Armenia" />
        <meta name="DC.rights" content="© 2025 Samyun Wan Armenia" />
        
        {/* Additional Open Graph tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Samyun Wan Armenia - Официальный дистрибьютор" />
        <meta property="article:author" content="Aleksandr Gevorgyan" />
        <meta property="article:publisher" content="Samyun Wan Armenia" />
        <meta property="article:section" content="Health & Fitness" />
        <meta property="article:tag" content="Samyun Wan, оригинал, Армения, armwhey мошенники" />
        
        {/* Twitter Card additional tags */}
        <meta name="twitter:creator" content="@samyunwanarmenia" />
        <meta name="twitter:site" content="@samyunwanarmenia" />
        <meta name="twitter:label1" content="Официальный дистрибьютор" />
        <meta name="twitter:data1" content="Samyun Wan Armenia" />
        <meta name="twitter:label2" content="ВНИМАНИЕ" />
        <meta name="twitter:data2" content="armwhey.com - мошенники!" />
        {/* Preconnect for Google Fonts and Netlify assets for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* If Netlify serves static assets from a CDN domain, add it here */}
        {/* <link rel="preconnect" href="https://assets.samyunwanarmenia.netlify.app" crossOrigin="anonymous" /> */}
      </Head>
      <html lang="hy" className={`${inter.variable}`}> {/* Default lang to hy, will be updated by LayoutClientProvider */}
        <body>
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
    </>
  );
};

export default RootLayout;