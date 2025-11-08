import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { TranslationKeys } from '@/types/global';
import { SITE_URL } from '@/config/siteConfig';

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
  const pageUrl = `${SITE_URL}/${lang}${pagePath ? `/${pagePath}` : ''}`;

  const alternatesLanguages: Record<string, string> = {};
  Object.keys(translations).forEach(locale => {
    alternatesLanguages[`${locale}-${locale === 'hy' ? 'AM' : locale === 'ru' ? 'RU' : 'US'}`] =
      `${SITE_URL}/${locale}${pagePath ? `/${pagePath}` : ''}`;
  });
  alternatesLanguages['x-default'] = `${SITE_URL}/hy${pagePath ? `/${pagePath}` : ''}`;

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
      siteName: 'Samyun Wan Armenia – Official representative in Armenia',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
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
