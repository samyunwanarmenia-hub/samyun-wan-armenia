import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { benefitsItemsData } from '@/data/benefitsItems';
import { BenefitsLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: BenefitsLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;

  const benefitKeywords = benefitsItemsData.map(item => t.benefits[item.key].title).join(', ');
  const benefitDescriptions = benefitsItemsData.map(item => t.benefits[item.key].desc).join('; ');

  const pageTitle = `${t.hero.title} - ${t.benefits.title}`;
  const pageDescription = `${t.benefits.subtitle} ${benefitDescriptions}`.trim();
  const pageKeywords = [
    t.hero.title,
    t.benefits.title,
    t.benefits.subtitle,
    'Samyun Wan Armenia',
    benefitKeywords,
    'Samyun Wan преимущества',
    'Samyun Wan արդյունքներ',
  ]
    .filter(Boolean)
    .join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-vitamin-gain-whey-600w.jpg`;
  const pageImageAlt = t.benefits.title;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'benefits',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const BenefitsLayout = ({ children }: BenefitsLayoutProps) => {
  return <>{children}</>;
};

export default BenefitsLayout;
