import { SupportedLang } from './locales';

export const SEO_KEYWORDS: Record<SupportedLang, string[]> = {
  hy: [
    'Սամյուն Վան',
    'Samyun Wan Հայաստան',
    'Սամյուն Վան գնել',
    'քաշի ավելացման համար',
    'բնական հավելում',
    'օրիգինալ ապրանք Հայաստան',
    'դեղաչափեր քաշի համար',
    'առաքում Հայաստան',
    'weight gain supplement Armenia',
  ],
  ru: [
    'samyun wan',
    'samyun wan купить',
    'samyun wan армения',
    'samyun wan капсулы',
    'samyun wan оригинал',
    'купить в ереване',
    'доставка по армении',
    'натуральный продукт',
    'капсулы для набора веса',
    'витамины для массы',
    'оригинал samyun wan',
  ],
  en: [
    'Samuyn Wan',
    'Samyun Wan Armenia',
    'weight gain capsules',
    'natural weight gain product',
    'authentic Samyun Wan',
    'weight gain supplement',
    'buy Samyun Wan Armenia',
  ],
};

export const getSeoKeywords = (lang: SupportedLang) => {
  return SEO_KEYWORDS[lang] || SEO_KEYWORDS.hy;
};
