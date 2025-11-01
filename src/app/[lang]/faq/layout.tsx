import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { FaqLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;

  const pageTitle = `${t.hero.title} - ${t.nav.faq}`;
  const pageDescription = t.faq.q1;
  const pageKeywords = [
    t.hero.title,
    t.nav.faq,
    'Samyun Wan Armenia FAQ',
    'Samyun Wan հարցեր',
    'Samyun Wan вопросы',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-product-600w.jpg`;
  const pageImageAlt = t.nav.faq;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'faq',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const FaqLayout = ({ children }: FaqLayoutProps) => {
  return <>{children}</>;
};

export default FaqLayout;
