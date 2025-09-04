import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { generateProductStructuredData } from '@/utils/structuredDataUtils'; // Import the new utility
import { productShowcaseData } from '@/data/productShowcaseData'; // Import product data

interface ProductsLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: ProductsLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  return {
    title: t.hero.title + ' - ' + t.productShowcase.weightGainLabel + ' & ' + t.productShowcase.weightLossLabel + ' | ' + t.nav.products,
    description: t.productShowcase.weightGainDesc + ' | ' + t.productShowcase.weightLossDesc + ' | ' + t.hero.tagline + ' ' + t.authenticity.howToDistinguish,
    keywords: `${t.hero.title}, ${t.productShowcase.weightGainLabel}, ${t.productShowcase.weightLossLabel}, samyun wan, armenia, քաշի ավելացում, քաշի նվազեցում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան, похудение армения, Samyun Wan products, weight gain capsules, weight loss capsules, original product, authenticity check`,
    openGraph: {
      title: t.hero.title + ' - ' + t.productShowcase.weightGainLabel + ' & ' + t.productShowcase.weightLossLabel,
      description: t.productShowcase.weightGainDesc + ' | ' + t.productShowcase.weightLossDesc + ' | ' + t.authenticity.howToDistinguish,
      url: `https://samyunwanarmenia.netlify.app/${lang}/products`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-weight-gain-vitamin-original-whay-arm-600w.jpg', // Specific image for products
          width: 600,
          height: 600,
          alt: t.productShowcase.weightGainLabel,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/products`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/products',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/products',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/products',
        'x-default': 'https://samyunwanarmenia.netlify.app/products',
      },
    },
  };
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