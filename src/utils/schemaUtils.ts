import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { resolveLang, type SupportedLang } from '@/config/locales';
import type { Testimonial } from '@/types/global';

const LOGO_URL = `${SITE_URL}/optimized/logo.png`;
export const SOCIAL_LINKS = [
  'https://instagram.com/samyunwanarmenia',
  'https://facebook.com/samyunwanarmenia',
  'https://t.me/samyunwanarmenia',
  'https://www.tiktok.com/@samyunwanarmenia',
  'https://www.youtube.com/@samyunwanarmenia',
  'https://wa.me/37495653666',
  'https://wa.me/37496653666',
  'https://m.me/samyunwanarmenia',
];

const toAbsoluteUrl = (value?: string) => {
  if (!value) {
    return SITE_URL;
  }

  return value.startsWith('http') ? value : `${SITE_URL}${value}`;
};

// Product Schema with Reviews and AggregateRating
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number | string;
  priceCurrency?: string;
  reviews?: Testimonial[];
  keywords?: string[];
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
    ...(product.keywords?.length ? { keywords: product.keywords } : {}),
  };

  return schema;
};

// FAQPage Schema
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
  options?: { lang?: string; pageUrl?: string },
) => {
  const langCode =
    options?.lang === 'hy' ? 'hy-AM' : options?.lang === 'ru' ? 'ru-RU' : options?.lang === 'en' ? 'en-US' : undefined;

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
    ...(langCode ? { inLanguage: langCode } : {}),
    ...(options?.pageUrl
      ? {
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': toAbsoluteUrl(options.pageUrl),
          },
        }
      : {}),
  };
};

export const generateFAQSchemaFromTranslations = (lang: string) => {
  const normalized: SupportedLang = resolveLang(lang);
  const t = translations[normalized] || translations.hy;
  const faqPairs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPairs.map(pair => ({
      '@type': 'Question',
      name: pair.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: pair.a,
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

export const generateBreadcrumbs = ({
  lang,
  segments,
}: {
  lang: string;
  segments: string[];
}) => {
  const normalized: SupportedLang = resolveLang(lang);
  const t = translations[normalized] || translations.hy;

  const labelMap: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    benefits: t.nav.benefits,
    products: t.nav.products,
    testimonials: t.nav.testimonials,
    contact: t.nav.contact,
    faq: t.nav.faq,
    'track-order': t.nav.trackOrder ?? 'Track order',
    blogs: t.article?.title ?? 'Blogs',
    'how-to-identify-fake': t.authenticity?.title ?? 'Authenticity',
    privacy: 'Privacy',
    terms: 'Terms',
  };

  const items = [
    { name: t.nav.home, url: `${SITE_URL}/${normalized}` },
    ...segments.map((segment, idx) => {
      const slug = segments.slice(0, idx + 1).join('/');
      return {
        name: labelMap[segment] || segment,
        url: `${SITE_URL}/${normalized}/${slug}`,
      };
    }),
  ];

  return generateBreadcrumbSchema(items);
};

// LocalBusiness Schema
export const generateLocalBusinessSchema = (keywords?: string[]) => {
  const sameAs = Array.from(
    new Set([
      ...SOCIAL_LINKS,
      `https://wa.me/${PRIMARY_PHONE.replace(/\+/g, '')}`,
      `https://wa.me/${SECONDARY_PHONE.replace(/\+/g, '')}`,
    ]),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Samyun Wan Armenia',
    image: LOGO_URL,
    '@id': `${SITE_URL}#local-business`,
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
    sameAs,
    ...(keywords?.length ? { keywords } : {}),
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
    '@id': toAbsoluteUrl(options.url),
  },
  headline: options.headline,
  description: options.description,
  image: toAbsoluteUrl(options.image),
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
  dateModified?: string;
  publisherName: string;
  inLanguage: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': toAbsoluteUrl(options.url),
  },
  headline: options.headline,
  description: options.description,
  image: toAbsoluteUrl(options.image),
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
  dateModified: options.dateModified ?? options.datePublished,
  inLanguage: options.inLanguage,
  keywords: options.keywords,
});
