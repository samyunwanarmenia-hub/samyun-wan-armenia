import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { TranslationKeys } from '@/types/global';

const baseUrl = 'https://samyunwanarmenia.netlify.app'; // Your actual base URL

interface CommonMetadataOptions {
  lang: string;
  t: TranslationKeys;
  pagePath: string; // e.g., 'about', 'products', 'faq'
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
  type?: 'website' | 'article'; // Corrected: Removed 'product' from allowed types
}

export const generateCommonMetadata = ({
  lang,
  t,
  pagePath,
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = 'website',
}: CommonMetadataOptions): Metadata => {
  const pageUrl = `${baseUrl}/${lang}${pagePath ? `/${pagePath}` : ''}`;

  const alternatesLanguages: Record<string, string> = {};
  Object.keys(translations).forEach(locale => {
    alternatesLanguages[`${locale}-${locale === 'hy' ? 'AM' : locale === 'ru' ? 'RU' : 'US'}`] = 
      `${baseUrl}/${locale}${pagePath ? `/${pagePath}` : ''}`;
  });
  alternatesLanguages['x-default'] = `${baseUrl}/hy${pagePath ? `/${pagePath}` : ''}`;

  return {
    title: {
      default: title,
      template: `%s | ${t.hero.title}`,
    },
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      siteName: 'Samyun Wan Armenia - Official',
      images: [
        {
          url: image,
          width: 1200, // Default width, can be overridden
          height: 630, // Default height, can be overridden
          alt: imageAlt,
        },
      ],
      locale: lang === 'hy' ? 'hy_AM' : lang === 'ru' ? 'ru_RU' : 'en_US',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
      creator: '@samyunwanarmenia',
    },
    alternates: {
      canonical: pageUrl,
      languages: alternatesLanguages,
    },
  };
};