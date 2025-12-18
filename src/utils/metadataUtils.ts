import { Metadata } from 'next';
import { TranslationKeys } from '@/types/global';
import { SITE_URL } from '@/config/siteConfig';
import { LOCALE_CODES, DEFAULT_LANG } from '@/config/locales';

interface CommonMetadataOptions {
  lang: keyof typeof LOCALE_CODES;
  t: TranslationKeys;
  pagePath: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
  type?: 'website' | 'article';
  canonicalPath?: string;
}

const sanitizePath = (value: string) => value.replace(/^\/+|\/+$/g, '');

const buildLocalizedUrl = (lang: string, segments: string[]) => {
  const suffix = segments.length ? `/${segments.join('/')}` : '';
  return `${SITE_URL}/${lang}${suffix}`;
};

const ensureAbsolute = (value: string | undefined) => {
  if (!value) {
    return SITE_URL;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') {
    return SITE_URL;
  }

  if (trimmed.startsWith('http')) {
    return trimmed.replace(/\/+$/, '');
  }

  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${SITE_URL}${withSlash}`.replace(/\/+$/, '');
};

const buildAlternateLanguages = (segments: string[]) => {
  const suffix = segments.length ? `/${segments.join('/')}` : '';

  // x-default should point to the default language (usually the main market language)
  // For Armenia, hy (Armenian) is the primary language, but DEFAULT_LANG is 'en'
  // We'll use DEFAULT_LANG to maintain consistency
  const defaultPath = `${SITE_URL}/${DEFAULT_LANG}${suffix}`;

  return {
    'hy-AM': `${SITE_URL}/hy${suffix}`,
    'ru-RU': `${SITE_URL}/ru${suffix}`,
    'en-US': `${SITE_URL}/en${suffix}`,
    'x-default': defaultPath,
  };
};

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
  canonicalPath,
}: CommonMetadataOptions): Metadata => {
  const sanitizedPagePath = sanitizePath(pagePath);
  const pathSegments = sanitizedPagePath ? sanitizedPagePath.split('/').filter(Boolean) : [];
  const defaultPageUrl = buildLocalizedUrl(lang, pathSegments);
  const canonicalUrl = canonicalPath ? ensureAbsolute(canonicalPath) : defaultPageUrl;
  const locale = LOCALE_CODES[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${t.hero.title}`,
    },
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: t.hero.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(pathSegments),
    },
  };
};
