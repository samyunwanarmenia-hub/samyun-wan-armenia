import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { QrVerifyLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.authenticity.title;
  const pageDescription = t.authenticity.qrScanInstructions;
  const pageKeywords = `${t.hero.title}, ${t.authenticity.title}, samyun wan, armenia, QR verification, authenticity check, original product, подлинность, проверка QR, Samyun Wan оригинал`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-product-600w.jpg'; // Generic product image
  const pageImageAlt = t.authenticity.title;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'verify/qr',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const QrVerifyLayout = ({ children }: QrVerifyLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default QrVerifyLayout;