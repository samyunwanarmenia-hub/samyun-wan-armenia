import type { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import type { TranslationKeys } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang as normalizeLang, type SupportedLang, DEFAULT_LANG } from '@/config/locales';
import { getSeoKeywords } from '@/config/seoKeywords';

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
  | 'blogs'
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

const buildKeywords = (...values: Array<string | undefined>) => values.filter(Boolean) as string[];

const resolveTranslationKey = (obj: unknown, key: string | undefined) => {
  if (!key) return undefined;
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

const truncateDescription = (text: string, limit = 160) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

type GenerateMetadataOptions = {
  lang: string;
  titleKey: string;
  descriptionKey: string;
  keywords?: string[];
  pagePath?: string;
  image?: string;
  imageAlt?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  titleOverride?: string;
  descriptionOverride?: string;
};

export const generateMetadata = ({
  lang,
  titleKey,
  descriptionKey,
  keywords = [],
  pagePath = '',
  image,
  imageAlt,
  canonicalPath,
  type = 'website',
  titleOverride,
  descriptionOverride,
}: GenerateMetadataOptions): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;

  const translatedTitle = titleOverride ?? (resolveTranslationKey(t, titleKey) as string) ?? titleKey;
  const translatedDescription =
    descriptionOverride ?? (resolveTranslationKey(t, descriptionKey) as string) ?? descriptionKey;

  const finalDescription = truncateDescription(translatedDescription);
  const keywordList = Array.from(new Set([...(keywords || []), ...getSeoKeywords(normalizedLang)]));
  const ogImage = image ?? `${SITE_URL}/api/og/${normalizedLang}?title=${encodeURIComponent(translatedTitle)}`;

  return generateCommonMetadata({
    lang: normalizedLang,
    t,
    pagePath,
    title: `${translatedTitle} | Samyun Wan Armenia`,
    description: finalDescription,
    keywords: keywordList.join(', '),
    image: ogImage,
    imageAlt: imageAlt ?? translatedTitle,
    type,
    canonicalPath,
  });
};

export const LEGAL_COPY: Record<
  SupportedLang,
  { privacyTitle: string; privacyDescription: string; termsTitle: string; termsDescription: string }
> = {
  hy: {
    privacyTitle: 'Գաղտնիության քաղաքականություն',
    privacyDescription:
      'Samyun Wan Armenia-ն հավաքում և օգտագործում է միայն այն տվյալները, որոնք անհրաժեշտ են պատվերի մշակման, վճարման, առաքման և հաճախորդի աջակցության համար։ Տվյալները չեն փոխանցվում երրորդ կողմերին՝ բացառությամբ օրենքով պահանջված դեպքերի։',
    termsTitle: 'Օգտագործման պայմաններ և պատասխանատվության սահմանափակում',
    termsDescription:
      'Պատվերների, վճարման և վերադարձի հիմնական պայմաններ Samyun Wan Armenia-ի համար, տվյալների օգտագործում և բժշկական հայտարարագիր. կայքի տեղեկանքը տեղեկացնող է, մինչև ընդունելը խորհրդակցեք բժշկի հետ, հակացուցված է հղիության/կրծքով կերակրման դեպքում, մինչև 18 տարեկանում կամ քրոնիկ հիվանդությունների դեպքում առանց բժշկի հաստատման։',
  },
  ru: {
    privacyTitle: 'Политика конфиденциальности',
    privacyDescription:
      'Samyun Wan Armenia собирает и использует только данные, необходимые для оформления заказа, оплаты, доставки и поддержки клиента. Данные не передаются третьим лицам, кроме как по закону или для выполнения доставки.',
    termsTitle: 'Пользовательское соглашение и отказ от ответственности',
    termsDescription:
      'Условия заказа и оплаты: заявки через сайт/мессенджеры, предоплата по согласованию, возврат возможен при целостности упаковки и сохранности товара. Обработка персональных данных — только для оплаты, доставки и поддержки. Медицинский отказ: информация на сайте не является рекомендацией, перед приемом консультируйтесь с врачом; противопоказано при беременности/ГВ, до 18 лет и при хронических заболеваниях без разрешения врача.',
  },
  en: {
    privacyTitle: 'Privacy Policy',
    privacyDescription:
      'Samyun Wan Armenia collects and uses only the data needed to process orders, take payments, deliver products, and support customers. Data is not shared with third parties except when required by law or to fulfill delivery.',
    termsTitle: 'User Agreement & Medical Disclaimer',
    termsDescription:
      'Ordering and payment terms, personal data use for payments/shipping/support, and medical disclaimer: site info is not medical advice; consult your doctor; not for pregnancy/breastfeeding, under 18, or chronic conditions without physician approval.',
  },
};

export const SITE_PAGE_CONFIG: Record<SitePageKey, SitePageDefinition> = {
  home: {
    path: '',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => ({
      title: `${t.hero.title} – ${t.hero.subtitle}`,
      description: lang === 'ru'
        ? 'Оригинальный Samyun Wan Armenia с QR-проверкой. 60,000+ довольных клиентов. Официальный представитель. Доставка по Еревану. Закажите сейчас!'
        : lang === 'en'
        ? 'Original Samyun Wan Armenia with QR verification. 60,000+ happy customers. Official representative. Delivery in Yerevan. Order now!'
        : 'Օրիգինալ Samyun Wan Armenia QR ստուգմամբ: 60,000+ գոհ հաճախորդ: Պաշտոնական ներկայացուցիչ: Երևան առաքում: Պատվիրեք հիմա:',
      keywords: buildKeywords(
        t.hero.title,
        t.hero.subtitle,
        // Long-tail keywords for better SEO
        lang === 'ru' 
          ? 'как набрать вес безопасно в Армении 2025'
          : lang === 'en'
          ? 'how to gain weight safely in Armenia 2025'
          : 'ինչպես անվտանգ քաշ ավելացնել Հայաստանում 2025',
        lang === 'ru'
          ? 'оригинальный Samyun Wan с QR проверкой Ереван'
          : lang === 'en'
          ? 'original Samyun Wan with QR verification Yerevan'
          : 'օրիգինալ Samyun Wan QR ստուգմամբ Երևան',
        lang === 'ru'
          ? 'где купить настоящий Samyun Wan Armenia доставка'
          : lang === 'en'
          ? 'where to buy authentic Samyun Wan Armenia delivery'
          : 'որտեղ գնել իրական Samyun Wan Armenia առաքում',
        t.nav.products,
        t.benefits.title,
        t.contact.title
      ),
      imageAlt: `${t.hero.title} - оригинальный продукт для набора веса с QR верификацией`,
    }),
  },
  about: {
    path: 'about',
    priority: 0.8,
    changeFrequency: 'monthly',
    buildCopy: (t, lang) => ({
      title: t.about.title,
      description: lang === 'ru'
        ? 'Почему выбирают Samyun Wan Armenia: 6 лет на рынке, 60,000+ клиентов, единственный официальный представитель. 100% натуральный состав, QR-проверка.'
        : lang === 'en'
        ? 'Why choose Samyun Wan Armenia: 6 years on market, 60,000+ customers, only official representative. 100% natural, QR verification included.'
        : 'Ինչու՞ ընտրել Samyun Wan Armenia: 6 տարի շուկայում, 60,000+ հաճախորդ, միակ պաշտոնական ներկայացուցիչ: 100% բնական, QR ստուգում:',
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
    buildCopy: (t, lang) => ({
      title: t.benefits.title,
      description: lang === 'ru'
        ? 'Преимущества Samyun Wan: повышение аппетита, набор веса, укрепление иммунитета, энергия. Доказано тысячами клиентов. Первые результаты за 1-2 недели.'
        : lang === 'en'
        ? 'Samyun Wan benefits: appetite boost, weight gain, immunity, energy. Proven by thousands. First results in 1-2 weeks. Natural ingredients.'
        : 'Samyun Wan առավելություններ: ախորժակի բարձրացում, քաշի ավելացում, իմունիտետ, էներգիա: Ապացուցված հազարավոր հաճախորդներով:',
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
    buildCopy: (t, lang) => ({
      title: t.nav.products,
      description: lang === 'ru'
        ? 'Купить оригинальный Samyun Wan Armenia: для набора и снижения веса. С QR-проверкой подлинности. Доставка по Еревану. Официальный представитель.'
        : lang === 'en'
        ? 'Buy original Samyun Wan Armenia: for weight gain and loss. With QR authenticity check. Delivery in Yerevan. Official representative.'
        : 'Գնել օրիգինալ Samyun Wan Armenia: քաշի ավելացման և նվազեցման համար: QR ստուգմամբ: Երևան առաքում: Պաշտոնական ներկայացուցիչ:',
      keywords: buildKeywords(
        t.nav.products,
        // Long-tail keywords
        lang === 'ru'
          ? 'купить Samyun Wan Armenia для набора веса с доставкой Ереван'
          : lang === 'en'
          ? 'buy Samyun Wan Armenia for weight gain delivery Yerevan'
          : 'գնել Samyun Wan Armenia քաշի ավելացման առաքում Երևան',
        lang === 'ru'
          ? 'цена оригинального Samyun Wan Armenia 2025 официальный представитель'
          : lang === 'en'
          ? 'price original Samyun Wan Armenia 2025 official representative'
          : 'գին օրիգինալ Samyun Wan Armenia 2025 պաշտոնական ներկայացուցիչ',
        t.productShowcase.orderWeightGain,
        t.productShowcase.orderWeightLoss,
        t.hero.guarantee,
      ),
      imageAlt: `${t.nav.products} - оригинальные витамины для набора и снижения веса с сертификатом`,
    }),
  },
  testimonials: {
    path: 'testimonials',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: (t, lang) => ({
      title: t.testimonials.title,
      description: lang === 'ru'
        ? 'Отзывы о Samyun Wan Armenia от реальных клиентов. Узнайте о результатах, оставьте свой отзыв. 60,000+ довольных покупателей.'
        : lang === 'en'
        ? 'Samyun Wan Armenia reviews from real customers. See results, leave your review. 60,000+ satisfied buyers. Read testimonials now.'
        : 'Samyun Wan Armenia կարծիքներ իրական հաճախորդներից: Տեսեք արդյունքները, թողեք ձեր կարծիքը: 60,000+ գոհ գնորդ:',
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
    buildCopy: (t, lang) => ({
      title: t.nav.faq,
      description: lang === 'ru'
        ? 'Частые вопросы о Samyun Wan Armenia: как проверить подлинность, доставка, применение, побочные эффекты. Ответы на все вопросы здесь.'
        : lang === 'en'
        ? 'FAQ about Samyun Wan Armenia: authenticity check, delivery, usage, side effects. All answers here. Official representative answers.'
        : 'Հաճախակի հարցեր Samyun Wan Armenia-ի մասին: իսկության ստուգում, առաքում, օգտագործում: Բոլոր պատասխանները այստեղ:',
      keywords: buildKeywords(t.nav.faq, t.faq.q1, t.faq.q2, t.faq.q3),
      imageAlt: t.nav.faq,
    }),
  },
  contact: {
    path: 'contact',
    priority: 0.7,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => ({
      title: t.contact.title,
      description: lang === 'ru'
        ? 'Свяжитесь с Samyun Wan Armenia: +374 96 653666, +374 95 653666. WhatsApp, звонок, доставка по Еревану. Официальный представитель.'
        : lang === 'en'
        ? 'Contact Samyun Wan Armenia: +374 96 653666, +374 95 653666. WhatsApp, call, delivery in Yerevan. Official representative.'
        : 'Կապ Samyun Wan Armenia-ի հետ: +374 96 653666, +374 95 653666: WhatsApp, զանգ, Երևան առաքում: Պաշտոնական ներկայացուցիչ:',
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
    buildCopy: (t, lang) => ({
      title: t.trackOrder.title,
      description: lang === 'ru'
        ? 'Отследить заказ Samyun Wan Armenia по номеру заказа. Узнайте статус доставки. Быстрая проверка статуса вашего заказа онлайн.'
        : lang === 'en'
        ? 'Track your Samyun Wan Armenia order by order number. Check delivery status. Quick online order status check. Official representative.'
        : 'Հետևել Samyun Wan Armenia պատվերին պատվերի համարով: Ստուգեք առաքման կարգավիճակը: Արագ առցանց ստուգում:',
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
    buildCopy: (t, lang) => ({
      title: t.authenticity.howToDistinguish,
      description: lang === 'ru'
        ? 'Как отличить поддельный Samyun Wan от оригинала: признаки подделки, проверка QR-кода, сертификат. Защитите себя от фальшивок.'
        : lang === 'en'
        ? 'How to distinguish fake Samyun Wan from original: fake signs, QR code check, certificate. Protect yourself from counterfeits.'
        : 'Ինչպես տարբերել կեղծ Samyun Wan-ը օրիգինալից: կեղծիքի նշաններ, QR կոդի ստուգում, վկայագիր:',
      keywords: buildKeywords(
        t.authenticity.howToDistinguish,
        t.authenticity.title,
        // Long-tail keywords
        lang === 'ru'
          ? 'как отличить поддельный Samyun Wan от оригинала 2025'
          : lang === 'en'
          ? 'how to distinguish fake Samyun Wan from original 2025'
          : 'ինչպես տարբերել կեղծ Samyun Wan-ը օրիգինալից 2025',
        lang === 'ru'
          ? 'признаки подделки Samyun Wan Armenia проверка QR кода'
          : lang === 'en'
          ? 'signs of fake Samyun Wan Armenia QR code verification'
          : 'կեղծ Samyun Wan Armenia նշաններ QR կոդի ստուգում',
        t.authenticity.attention,
        t.authenticity.qrScanInstructions,
      ),
      imageAlt: `${t.authenticity.title} - сравнение оригинального и поддельного продукта с QR кодом`,
    }),
  },
  blogs: {
    path: 'blogs',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => {
      const article = t.article;
      const extraKeywords = article.metaKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(Boolean);

      return {
        title: article.metaTitle,
        description: article.metaDescription,
        keywords: buildKeywords(
          article.title,
          article.subtitle,
          ...extraKeywords,
          lang === 'ru' ? 'блог Samyun Wan' : lang === 'en' ? 'Samyun Wan blog guide' : 'Samyun Wan բլոգ',
          article.ctaLabel
        ),
        imageAlt: article.title,
      };
    },
  },
  'verify/qr': {
    path: 'verify/qr',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: (t, lang) => ({
      title: t.authenticity.qrScanInstructions,
      description: lang === 'ru'
        ? 'Проверка подлинности Samyun Wan по QR-коду. Отсканируйте код на упаковке и убедитесь в оригинальности продукта. Быстрая проверка.'
        : lang === 'en'
        ? 'Verify Samyun Wan authenticity by QR code. Scan code on package to confirm original product. Quick verification process.'
        : 'Samyun Wan իսկության ստուգում QR կոդով: Սկանավորեք կոդը և համոզվեք օրիգինալ լինելու մեջ: Արագ ստուգում:',
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
      const shortDescription = lang === 'ru'
        ? 'Политика конфиденциальности Samyun Wan Armenia. Мы защищаем ваши данные. Используем только для обработки заказов и доставки.'
        : lang === 'en'
        ? 'Samyun Wan Armenia privacy policy. We protect your data. Used only for order processing and delivery. Secure and confidential.'
        : 'Samyun Wan Armenia գաղտնիության քաղաքականություն: Մենք պաշտպանում ենք ձեր տվյալները: Օգտագործվում է միայն պատվերների համար:';
      return {
        title: copy.privacyTitle,
        description: shortDescription,
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
      const shortDescription = lang === 'ru'
        ? 'Условия использования Samyun Wan Armenia: заказ, оплата, доставка, возврат. Медицинский отказ. Перед применением консультируйтесь с врачом.'
        : lang === 'en'
        ? 'Samyun Wan Armenia terms: ordering, payment, delivery, returns. Medical disclaimer. Consult doctor before use. Official representative.'
        : 'Samyun Wan Armenia պայմաններ: պատվեր, վճարում, առաքում, վերադարձ: Բժշկական զգուշացում: Խորհրդակցեք բժշկի հետ:';
      return {
        title: copy.termsTitle,
        description: shortDescription,
        keywords: buildKeywords(copy.termsTitle, copy.termsDescription),
        imageAlt: copy.termsTitle,
      };
    },
  },
};

interface BuildPageMetadataOptions {
  canonicalPath?: string;
  type?: 'website' | 'article';
}

export const buildPageMetadata = (
  lang: string,
  key: SitePageKey,
  options?: BuildPageMetadataOptions
): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;
  const config = SITE_PAGE_CONFIG[key];

  if (!config) {
    throw new Error(`Unknown site page metadata key: ${key}`);
  }

  const { title, description, keywords, imageAlt } = config.buildCopy(t, normalizedLang);
  const keywordList = keywords.length ? keywords : [title, t.hero.title];
  const extendedKeywords = Array.from(new Set([...keywordList, ...getSeoKeywords(normalizedLang)]));
  const canonicalPath =
    options?.canonicalPath ?? `/${DEFAULT_LANG}${config.path ? `/${config.path.replace(/^\/+|\/+$/g, '')}` : ''}`;

  return generateMetadata({
    lang: normalizedLang,
    titleKey: 'hero.title',
    descriptionKey: 'hero.tagline',
    pagePath: config.path,
    keywords: extendedKeywords,
    image: `${SITE_URL}/api/og/${normalizedLang}?title=${encodeURIComponent(title)}`,
    imageAlt: imageAlt ?? title,
    canonicalPath,
    type: options?.type,
    titleOverride: title,
    descriptionOverride: description,
  });
};
