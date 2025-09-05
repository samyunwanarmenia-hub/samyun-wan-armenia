import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic

// Re-introducing dynamic imports for client-side components
const LayoutClientProvider = dynamic(() => import('@/components/LayoutClientProvider')); // Удаляем ssr: false
const DynamicYandexMetrikaTracker = dynamic(() => import('@/components/YandexMetrikaTracker'), { ssr: false });
const DynamicVisitTrackerWrapper = dynamic(() => import('@/components/VisitTrackerWrapper'), { ssr: false });
const DynamicGoogleAnalyticsTracker = dynamic(() => import('@/components/GoogleAnalyticsTracker'), { ssr: false });
const DynamicServiceWorkerRegister = dynamic(() => import('@/components/ServiceWorkerRegister'), { ssr: false });


interface QrVerifyLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  return {
    title: t.hero.title + ' - ' + t.authenticity.title,
    description: t.authenticity.qrScanInstructions,
    keywords: `${t.hero.title}, ${t.authenticity.title}, samyun wan, armenia, QR verification, authenticity check, original product, подлинность, проверка QR, Samyun Wan оригинал`,
    openGraph: {
      title: t.hero.title + ' - ' + t.authenticity.title,
      description: t.authenticity.qrScanInstructions,
      url: `https://samyunwanarmenia.netlify.app/${lang}/verify/qr`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-product-600w.jpg', // Generic product image
          width: 600,
          height: 600,
          alt: t.authenticity.title,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/verify/qr`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/verify/qr',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/verify/qr',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/verify/qr',
        'x-default': 'https://samyunwanarmenia.netlify.app/verify/qr',
      },
    },
  };
}

const QrVerifyLayout = ({ children, params }: QrVerifyLayoutProps) => {
  return (
    <LayoutClientProvider initialLang={params.lang}> {/* Используем напрямую */}
      <DynamicYandexMetrikaTracker />
      <DynamicGoogleAnalyticsTracker />
      <DynamicVisitTrackerWrapper />
      <DynamicServiceWorkerRegister />
      {children}
    </LayoutClientProvider>
  );
};

export default QrVerifyLayout;