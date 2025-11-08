import type { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import type { TranslationKeys } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

const SUPPORTED_LANGS = ['hy', 'ru', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export type SitePageKey =
  | 'home'
  | 'about'
  | 'benefits'
  | 'products'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'track-order'
  | 'how-to-identify-fake'
  | 'verify/qr'
  | 'privacy'
  | 'terms';

type ChangeFrequency = 'daily' | 'weekly' | 'monthly';

interface SitePageDefinition {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  buildCopy: (t: TranslationKeys, lang: SupportedLang) => {
    title: string;
    description: string;
    keywords: string[];
    imageAlt?: string;
  };
}

const OG_IMAGE = `${SITE_URL}/optimized/og-image.jpg`;

const buildKeywords = (...values: Array<string | undefined>) => values.filter(Boolean) as string[];

export const LEGAL_COPY: Record<
  SupportedLang,
  { privacyTitle: string; privacyDescription: string; termsTitle: string; termsDescription: string }
> = {
  hy: {
    privacyTitle: 'Գաղտնիության քաղաքականություն',
    privacyDescription:
      'Samyun Wan Armenia կայքը պաշտպանում է այցելուների տվյալները և օգտագործում է դրանք միայն պատվերների և կապի կազմակերպման համար։',
    termsTitle: 'Օգտագործման կանոններ',
    termsDescription:
      'Կայքը ներկայացնում է Samyun Wan Armenia-ի պաշտոնական առաջարկները, և դրա օգտագործումը ենթադրում է կանոնների ընդունում։',
  },
  ru: {
    privacyTitle: 'Политика конфиденциальности',
    privacyDescription:
      'Samyun Wan Armenia защищает персональные данные клиентов и использует их только для обработки заказов и обратной связи.',
    termsTitle: 'Пользовательское соглашение',
    termsDescription:
      'Используя сайт Samyun Wan Armenia, вы подтверждаете согласие с правилами заказа и проверки подлинности продукции.',
  },
  en: {
    privacyTitle: 'Privacy Policy',
    privacyDescription:
      'Samyun Wan Armenia protects visitor data and uses it solely to process orders and provide tailored support.',
    termsTitle: 'Terms & Conditions',
    termsDescription:
      'Using the Samyun Wan Armenia website implies agreement with our ordering rules and authenticity checks.',
  },
};

export const SITE_PAGE_CONFIG: Record<SitePageKey, SitePageDefinition> = {
  home: {
    path: '',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: `${t.hero.title} – ${t.hero.subtitle}`,
      description: `${t.hero.tagline} ${t.about.description}`,
      keywords: buildKeywords(t.hero.title, t.hero.subtitle, t.nav.products, t.benefits.title, t.contact.title),
      imageAlt: `${t.hero.title} hero`,
    }),
  },
  about: {
    path: 'about',
    priority: 0.8,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.about.title,
      description: `${t.about.subtitle}. ${t.about.description}`,
      keywords: buildKeywords(
        t.about.title,
        t.about.subtitle,
        t.about.natural.title,
        t.about.proven.title,
        t.about.safe.title,
      ),
      imageAlt: t.about.title,
    }),
  },
  benefits: {
    path: 'benefits',
    priority: 0.8,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.benefits.title,
      description: `${t.benefits.subtitle} ${t.benefits.appetite.desc} ${t.benefits.weight.desc}`,
      keywords: buildKeywords(
        t.benefits.title,
        t.benefits.subtitle,
        t.benefits.energy.title,
        t.benefits.immunity.title,
        t.benefits.metabolism.title,
      ),
      imageAlt: t.benefits.title,
    }),
  },
  products: {
    path: 'products',
    priority: 0.8,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.nav.products,
      description: `${t.productShowcase.weightGainDesc} / ${t.productShowcase.weightLossDesc}. ${t.orderModal.title}`,
      keywords: buildKeywords(
        t.nav.products,
        t.productShowcase.orderWeightGain,
        t.productShowcase.orderWeightLoss,
        t.hero.guarantee,
      ),
      imageAlt: t.nav.products,
    }),
  },
  testimonials: {
    path: 'testimonials',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.testimonials.title,
      description: `${t.testimonials.formSubtitle} ${t.testimonials.thankYou}`,
      keywords: buildKeywords(
        t.testimonials.title,
        t.testimonials.formTitle,
        t.testimonials.newReviewLabel,
        t.testimonials.submitButton,
      ),
      imageAlt: t.testimonials.title,
    }),
  },
  faq: {
    path: 'faq',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.nav.faq,
      description: `${t.faq.q1} ${t.faq.a1}`,
      keywords: buildKeywords(t.nav.faq, t.faq.q1, t.faq.q2, t.faq.q3),
      imageAlt: t.nav.faq,
    }),
  },
  contact: {
    path: 'contact',
    priority: 0.7,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.contact.title,
      description: `${t.contact.phoneNumbers.description}. ${t.contact.whatsappButton} / ${t.contact.callNowButton}`,
      keywords: buildKeywords(
        t.contact.title,
        t.contact.phone,
        t.contact.whatsappButton,
        t.contact.callNowButton,
        t.contact.address,
      ),
      imageAlt: t.contact.title,
    }),
  },
  'track-order': {
    path: 'track-order',
    priority: 0.7,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.trackOrder.title,
      description: `${t.trackOrder.subtitle} ${t.trackOrder.processingRequest}`,
      keywords: buildKeywords(
        t.trackOrder.title,
        t.trackOrder.orderIdPlaceholder,
        t.trackOrder.trackButton,
        t.trackOrder.statusNotFound,
      ),
      imageAlt: t.trackOrder.title,
    }),
  },
  'how-to-identify-fake': {
    path: 'how-to-identify-fake',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.authenticity.howToDistinguish,
      description: `${t.authenticity.differencesDesc} ${t.authenticity.certificateDesc}`,
      keywords: buildKeywords(
        t.authenticity.howToDistinguish,
        t.authenticity.title,
        t.authenticity.attention,
        t.authenticity.qrScanInstructions,
      ),
      imageAlt: t.authenticity.title,
    }),
  },
  'verify/qr': {
    path: 'verify/qr',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.authenticity.qrScanInstructions,
      description: `${t.authenticity.qrScanInstructions} ${t.authenticity.waitingForLink}`,
      keywords: buildKeywords(
        t.authenticity.title,
        t.authenticity.qrScanInstructions,
        t.authenticity.qrScanSuccess,
        t.authenticity.recordingInstructions,
      ),
      imageAlt: t.authenticity.qrScanInstructions,
    }),
  },
  privacy: {
    path: 'privacy',
    priority: 0.4,
    changeFrequency: 'monthly',
    buildCopy: (_t, lang) => {
      const copy = LEGAL_COPY[lang];
      return {
        title: copy.privacyTitle,
        description: copy.privacyDescription,
        keywords: buildKeywords(copy.privacyTitle, copy.privacyDescription),
        imageAlt: copy.privacyTitle,
      };
    },
  },
  terms: {
    path: 'terms',
    priority: 0.4,
    changeFrequency: 'monthly',
    buildCopy: (_t, lang) => {
      const copy = LEGAL_COPY[lang];
      return {
        title: copy.termsTitle,
        description: copy.termsDescription,
        keywords: buildKeywords(copy.termsTitle, copy.termsDescription),
        imageAlt: copy.termsTitle,
      };
    },
  },
};

const resolveLang = (lang: string): SupportedLang =>
  (SUPPORTED_LANGS.includes(lang as SupportedLang) ? (lang as SupportedLang) : 'hy');

export const buildPageMetadata = (lang: string, key: SitePageKey): Metadata => {
  const normalizedLang = resolveLang(lang);
  const t = translations[normalizedLang] || translations.hy;
  const config = SITE_PAGE_CONFIG[key];

  if (!config) {
    throw new Error(`Unknown site page metadata key: ${key}`);
  }

  const { title, description, keywords, imageAlt } = config.buildCopy(t, normalizedLang);
  const keywordList = keywords.length ? keywords : [title, t.hero.title];

  return generateCommonMetadata({
    lang: normalizedLang,
    t,
    pagePath: config.path,
    title,
    description,
    keywords: keywordList.join(', '),
    image: OG_IMAGE,
    imageAlt: imageAlt ?? title,
  });
};
