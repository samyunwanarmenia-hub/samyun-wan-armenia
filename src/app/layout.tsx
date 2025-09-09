import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
    google: 'googleae71d8a26990efe6',
  },
  // PWA Manifest
  manifest: '/site.webmanifest',
  icons: {
    apple: '/favicon.png', // Using favicon.png as apple-touch-icon
  },
  // Explicitly add theme-color meta tag
  themeColor: '#86b486', // Using primary-500 for theme color
  // Removed 'other' property as preconnect links are now directly in the component
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="hy" className={`${inter.variable}`}>
      <head>
        {/* Add preconnect links here */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://randomuser.me" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
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