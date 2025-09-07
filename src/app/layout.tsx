import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Removed Image import as it's no longer needed for noscript

import '../app/globals.css';
import { translations } from '@/i18n/translations';
// Removed: import { ThemeProvider } from '@/context/ThemeContext';
// Removed: import ToastProvider from '@/components/ToastProvider';


const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  variable: '--font-inter',
  display: 'swap',
});

const tHy = translations.hy;

export const metadata: Metadata = {
  title: {
    default: tHy.hero.title + ' - ' + tHy.hero.subtitle + ' | ' + tHy.hero.seo_title_addon,
    template: `%s | ${tHy.hero.title}`,
  },
  description: tHy.hero.tagline + ' ' + tHy.about.description + ' ' + tHy.benefits.subtitle,
  keywords: `${tHy.hero.title}, ${tHy.hero.subtitle}, ${tHy.hero.tagline}, samyun wan, armenia, քաշի ավելացում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան, Samyun Wan Armenia, weight gain, natural capsules, Indonesian, original Samyun Wan Yerevan, weight loss Armenia, sports nutrition, health supplements, ${tHy.about.natural.title}, ${tHy.benefits.appetite.title}, ${tHy.productShowcase.weightGainLabel}, ${tHy.productShowcase.weightLossLabel}, ${tHy.authenticity.title}, ${tHy.testimonials.title}`,
  authors: [{ name: 'Samyun Wan Armenia' }, { name: 'Aleksandr Gevorgyan' }],
  openGraph: {
    title: tHy.hero.title + ' - ' + tHy.hero.subtitle,
    description: tHy.hero.tagline + ' ' + tHy.about.description,
    url: 'https://samyunwanarmenia.netlify.app',
    siteName: 'Samyun Wan Armenia - Official',
    images: [
      {
        url: 'https://samyunwanarmenia.netlify.app/optimized/og-image.jpg',
        width: 1200,
        height: 630,
        alt: tHy.hero.title + ' - ' + tHy.hero.subtitle,
      },
    ],
    locale: 'hy_AM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: tHy.hero.title + ' - ' + tHy.hero.subtitle,
    description: tHy.hero.tagline + ' ' + tHy.about.description,
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
    google: 'googleae71d8a26990efe6',
  },
  // PWA Manifest
  manifest: '/site.webmanifest',
  icons: {
    apple: '/favicon.png', // Using favicon.png as apple-touch-icon
  },
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html className={`${inter.variable}`}>
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
  );
};

export default RootLayout;