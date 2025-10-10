import { TranslationKeys, FaqQuestionKey, FaqAnswerKey, ProductShowcaseItem, Testimonial } from '@/types/global';

export const generateOrganizationStructuredData = (t: TranslationKeys, currentLang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    url: 'https://samyunwanarmenia.netlify.app/',
    logo: 'https://samyunwanarmenia.netlify.app/images/og-image.jpg', // TODO: Replace with official logo if available as PNG/SVG
    sameAs: [
      'https://www.facebook.com/samyunwanarmenia', // TODO: Verify official Facebook URL
      'https://t.me/samyunwanarmenia', // TODO: Confirm Telegram link is official
      'https://www.instagram.com/samyunwanarmenia' // TODO: Confirm correct Instagram handle
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+37495653666', // TODO: Confirm this is the main business phone for customer service
      contactType: 'customer service',
      areaServed: 'AM',
    }],
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
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity,
    "inLanguage": currentLang,
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
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": imageUrl,
    "description": productDescription,
    "sku": `SW-${product.labelKey.toUpperCase()}-${currentLang.toUpperCase()}`, // Unique SKU
    "brand": {
      "@type": "Brand",
      "name": t.hero.title // Samyun Wan Armenia
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "AMD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": t.hero.title
      }
    },
    // You can add aggregateRating here if you have reviews for individual products
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "4.8", // Example average rating
    //   "reviewCount": "250" // Example number of reviews
    // }
  };
};

export const generateWebSiteStructuredData = (baseUrl: string, t: TranslationKeys) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: t.hero.title,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
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