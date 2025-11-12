import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import type { Testimonial } from '@/types/global';

// Product Schema with Reviews and AggregateRating
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
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
      price: product.price,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Samyun Wan Armenia',
      },
    },
  };

  // Add reviews if available
  if (product.reviews && product.reviews.length > 0) {
    const validReviews = product.reviews.slice(0, 10).filter(r => r.rating >= 4);
    
    if (validReviews.length > 0) {
      // Add aggregate rating
      const totalRating = validReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = (totalRating / validReviews.length).toFixed(1);

      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        reviewCount: validReviews.length,
        bestRating: '5',
        worstRating: '1',
      };

      // Add individual reviews
      schema.review = validReviews.map((review, index) => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: review.name,
        },
        reviewBody: review.textRu || review.textHy || review.textEn,
        datePublished: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
      }));
    }
  }

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
    image: `${SITE_URL}/optimized/og-image.jpg`,
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
      'https://facebook.com/samyunwanarmenia',
      'https://instagram.com/samyunwanarmenia',
      'https://tiktok.com/@samyunwanarmenia',
      'https://t.me/samyunwanarmenia',
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

