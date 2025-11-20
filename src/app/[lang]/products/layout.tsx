import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { ProductsLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.productShowcase.weightGainLabel} & ${t.productShowcase.weightLossLabel} | ${t.nav.products}`;
  const pageDescription = `${t.productShowcase.weightGainDesc} | ${t.productShowcase.weightLossDesc} | ${t.hero.tagline} ${t.authenticity.howToDistinguish}`.trim();
  const pageKeywords = [
    t.hero.title,
    t.nav.products,
    t.productShowcase.weightGainLabel,
    t.productShowcase.weightLossLabel,
    'Samyun Wan Armenia',
    'Samyun Wan original',
    'Samyun Wan QR',
    'Самюн Ван продукция',
    'Սամյուն Վան',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-armenia-weight-gain-vitamin-original-whay-arm-600w.jpg`;
  const pageImageAlt = t.productShowcase.weightGainLabel;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'products',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
    type: 'website',
  });
}

const ProductsLayout = ({ children, params }: ProductsLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);

  return (
    <>{children}</>
  );
};

export default ProductsLayout;
