import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { TrackOrderLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.nav.trackOrder;
  const pageDescription = t.trackOrder.subtitle;
  const pageKeywords = `${t.hero.title}, ${t.nav.trackOrder}, samyun wan, armenia, order tracking, track delivery, order status, отследить заказ, статус заказа, доставка`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-product-600w.jpg'; // Generic product image
  const pageImageAlt = t.nav.trackOrder;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'track-order',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const TrackOrderLayout = ({ children }: TrackOrderLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default TrackOrderLayout;