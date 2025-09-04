import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
// Removed dynamic imports for ThemeProvider, ToastProvider, and MovingBallsBackground

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

const QrVerifyLayout = ({ children }: QrVerifyLayoutProps) => {
  return (
    <>
      {/* All dynamic components removed, leaving only global CSS background */}
      {children}
    </>
  );
};

export default QrVerifyLayout;