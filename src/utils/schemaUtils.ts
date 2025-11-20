import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import type { Testimonial } from '@/types/global';

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

// Product Schema with Reviews and AggregateRating
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number | string;
  priceCurrency?: string;
  reviews?: Testimonial[];
}) => {
  const priceValidUntil = new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .split('T')[0];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Samyun Wan',
    },
    offers: {
      '@type': 'Offer',
      url: SITE_URL,
      priceCurrency: product.priceCurrency || 'AMD',
      price: product.price.toString(),
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Samyun Wan Armenia',
      },
    },
  };

  return schema;
};

// FAQPage Schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// BreadcrumbList Schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

// LocalBusiness Schema
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Samyun Wan Armenia',
    image: LOGO_URL,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AM',
      addressLocality: 'Yerevan',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.1792,
      longitude: 44.4991,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
    sameAs: [
      ...SOCIAL_LINKS,
      `https://wa.me/${PRIMARY_PHONE.replace(/\+/g, '')}`,
      `https://wa.me/${SECONDARY_PHONE.replace(/\+/g, '')}`,
    ],
  };
};

// WebPage Schema
export const generateWebPageSchema = (data: {
  url: string;
  name: string;
  description: string;
  lang: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: data.url,
    name: data.name,
    description: data.description,
    inLanguage: data.lang === 'hy' ? 'hy-AM' : data.lang === 'ru' ? 'ru-RU' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Samyun Wan Armenia',
      url: SITE_URL,
    },
  };
};

export const generateArticleSchema = (options: {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  publisherName: string;
  datePublished: string;
  dateModified?: string;
  inLanguage: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': options.url,
  },
  headline: options.headline,
  description: options.description,
  image: options.image,
  author: {
    '@type': 'Organization',
    name: options.authorName,
  },
    publisher: {
      '@type': 'Organization',
      name: options.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
  datePublished: options.datePublished,
  dateModified: options.dateModified ?? options.datePublished,
  inLanguage: options.inLanguage,
});

export const generateBlogPostingSchema = (options: {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  datePublished: string;
  publisherName: string;
  inLanguage: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': options.url,
  },
  headline: options.headline,
  description: options.description,
  image: options.image,
  author: {
    '@type': 'Person',
    name: options.authorName,
  },
    publisher: {
      '@type': 'Organization',
      name: options.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
  datePublished: options.datePublished,
  inLanguage: options.inLanguage,
  keywords: options.keywords,
});
