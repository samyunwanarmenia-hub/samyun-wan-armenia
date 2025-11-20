import { TranslationKeys, FaqQuestionKey, FaqAnswerKey, ProductShowcaseItem, Testimonial } from '@/types/global';
import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';

const LOGO_URL = `${SITE_URL}/optimized/logo.png`;
const SOCIAL_LINKS = [
  'https://instagram.com/samyunwanarmenia',
  'https://facebook.com/samyunwanarmenia',
  'https://t.me/samyunwanarmenia',
  'https://www.tiktok.com/@samyunwanarmenia',
  'https://www.youtube.com/@samyunwanarmenia',
  'https://wa.me/37495653666',
  'https://wa.me/37496653666',
  'https://m.me/samyunwanarmenia',
];

export const generateOrganizationStructuredData = (t: TranslationKeys, currentLang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_LINKS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PRIMARY_PHONE,
        contactType: 'customer support',
        areaServed: 'AM',
        availableLanguage: ['hy', 'ru', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: SECONDARY_PHONE,
        contactType: 'sales',
        areaServed: 'AM',
        availableLanguage: ['hy', 'ru', 'en'],
      },
    ],
    inLanguage: currentLang,
  };
};

export const generateFaqStructuredData = (t: TranslationKeys, currentLang: string) => {
  const questions: { key: FaqQuestionKey; answerKey: FaqAnswerKey }[] = [
    { key: 'q1', answerKey: 'a1' },
    { key: 'q2', answerKey: 'a2' },
    { key: 'q3', answerKey: 'a3' },
    { key: 'q4', answerKey: 'a4' },
  ];

  const mainEntity = questions.map(q => ({
    "@type": "Question",
    "name": t.faq[q.key as FaqQuestionKey], // Explicit type assertion
    "acceptedAnswer": {
      "@type": "Answer",
      "text": t.faq[q.answerKey as FaqAnswerKey] // Explicit type assertion
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity,
    inLanguage: currentLang,
  };
};

export const generateProductStructuredData = (
  t: TranslationKeys,
  product: ProductShowcaseItem,
  currentLang: string,
  baseUrl: string
) => {
  const productName = t.productShowcase[product.labelKey as keyof TranslationKeys['productShowcase']]; // Explicit type assertion
  const productDescription = t.productShowcase[product.descKey as keyof TranslationKeys['productShowcase']]; // Explicit type assertion
  const productUrl = `${baseUrl}/${currentLang}/products`; // Link to the products page
  const imageUrl = `${baseUrl}${product.src}`; // Full URL for the image

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productName,
    image: imageUrl,
    description: productDescription,
    sku: `SW-${product.labelKey.toUpperCase()}-${currentLang.toUpperCase()}`, // Unique SKU
    brand: {
      '@type': 'Brand',
      name: t.hero.title, // Samyun Wan Armenia
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'AMD',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t.hero.title,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '9',
      bestRating: '5',
      worstRating: '1',
    },
  };
};

export const generateWebSiteStructuredData = (baseUrl: string, t: TranslationKeys) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: t.hero.title,
    description: t.hero.subtitle,
  };
};

export const generateReviewStructuredData = (
  t: TranslationKeys,
  testimonial: Testimonial,
  currentLang: string
) => {
  const authorName = currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn;
  const reviewBody = currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.textEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: reviewBody,
    itemReviewed: {
      '@type': 'Organization',
      name: t.hero.title,
    },
  };
};
