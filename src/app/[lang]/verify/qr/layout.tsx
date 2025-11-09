import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { QrVerifyLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;

  const pageTitle = `${t.hero.title} - ${t.authenticity.title}`;
  const pageDescription = t.authenticity.qrScanInstructions;
  const pageKeywords = [
    t.hero.title,
    t.authenticity.title,
    'Samyun Wan Armenia',
    'QR проверка Samyun Wan',
    'Samyun Wan ստուգում',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-product-600w.jpg`;
  const pageImageAlt = t.authenticity.title;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'https://qr-wan.netlify.app/',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const QrVerifyLayout = ({ children }: QrVerifyLayoutProps) => {
  return <>{children}</>;
};

export default QrVerifyLayout;
