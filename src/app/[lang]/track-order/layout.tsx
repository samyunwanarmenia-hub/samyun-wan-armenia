import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { TrackOrderLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;

  const pageTitle = `${t.hero.title} - ${t.nav.trackOrder}`;
  const pageDescription = t.trackOrder.subtitle;
  const pageKeywords = [
    t.hero.title,
    t.nav.trackOrder,
    'Samyun Wan Armenia',
    'отследить заказ Samyun Wan',
    'Samyun Wan պատվերի ստուգում',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-product-600w.jpg`;
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
  return <>{children}</>;
};

export default TrackOrderLayout;
