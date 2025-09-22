import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { generateProductStructuredData } from '@/utils/structuredDataUtils';
import { productShowcaseData } from '@/data/productShowcaseData';
import { ProductsLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const pageTitle = t.hero.title + ' - ' + t.productShowcase.weightGainLabel + ' & ' + t.productShowcase.weightLossLabel + ' | ' + t.nav.products;
  const pageDescription = t.productShowcase.weightGainDesc + ' | ' + t.productShowcase.weightLossDesc + ' | ' + t.hero.tagline + ' ' + t.authenticity.howToDistinguish;
  const pageKeywords = `${t.hero.title}, ${t.productShowcase.weightGainLabel}, ${t.productShowcase.weightLossLabel}, samyun wan, armenia, քաշի ավելացում, քաշի նվազեցում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереվան, նաբոր վеса հայաստան, Samyun Wan products, weight gain capsules, weight loss capsules, original product, authenticity check`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-weight-gain-vitamin-original-whay-arm-600w.jpg'; // Specific image for products
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
    type: 'website', // Changed from 'product' to 'website'
  });
}

const ProductsLayout = ({ children, params }: ProductsLayoutProps) => {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian
  const baseUrl = 'https://samyunwanarmenia.netlify.app'; // Define your base URL

  const productStructuredData = productShowcaseData.map(product => 
    generateProductStructuredData(t, product, lang, baseUrl)
  );

  return (
    <>
      {productStructuredData.map((data, index) => (
        <script
          key={`product-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {children}
    </>
  );
};

export default ProductsLayout;