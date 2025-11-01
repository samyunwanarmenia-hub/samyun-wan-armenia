import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || 'hy';
  const t = translations[lang as keyof typeof translations] || translations.hy;

  const pageTitle = `${t.hero.title} | Terms & Conditions`;
  const pageDescription =
    'Условия использования официального сайта Samyun Wan Armenia. Правила заказа, доставки и проверки оригинальности продукции.';
  const pageImage = `${SITE_URL}/optimized/og-image.jpg`;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'terms',
    title: pageTitle,
    description: pageDescription,
    keywords: `${t.hero.title}, terms, Samyun Wan Armenia`,
    image: pageImage,
    imageAlt: pageTitle,
  });
}

const TermsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TermsLayout;
