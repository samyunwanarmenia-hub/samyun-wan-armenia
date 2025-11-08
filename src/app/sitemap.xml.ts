import fs from 'node:fs';
import path from 'node:path';

import { MetadataRoute } from 'next';

import { translations } from '@/i18n/translations';
import { SITE_URL } from '@/config/siteConfig';
import { SITE_PAGE_CONFIG, type SitePageKey } from '@/utils/pageMetadata';

const withTrailingSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);
const buildUrl = (...segments: string[]) => {
  const cleanedSegments = segments
    .filter(Boolean)
    .map(segment => segment.replace(/^\/+|\/+$/g, ''));

  return [SITE_URL, ...cleanedSegments].join('/').replace(/\/+$/g, '');
};

const mapLanguageCode = (locale: string) => {
  if (locale === 'hy') return 'hy-AM';
  if (locale === 'ru') return 'ru-RU';
  return 'en-US';
};

const SOURCE_FILE_MAP: Record<string, string> = {
  root: 'src/app/page.tsx',
  home: 'src/app/[lang]/page.tsx',
  about: 'src/app/[lang]/about/page.tsx',
  benefits: 'src/app/[lang]/benefits/page.tsx',
  products: 'src/app/[lang]/products/page.tsx',
  testimonials: 'src/app/[lang]/testimonials/page.tsx',
  faq: 'src/app/[lang]/faq/page.tsx',
  contact: 'src/app/[lang]/contact/page.tsx',
  'track-order': 'src/app/[lang]/track-order/page.tsx',
  privacy: 'src/app/[lang]/privacy/page.tsx',
  terms: 'src/app/[lang]/terms/page.tsx',
  'verify/qr': 'src/app/[lang]/verify/qr/page.tsx',
  'how-to-identify-fake': 'src/app/[lang]/how-to-identify-fake/page.tsx',
};

const fallbackLastModified =
  process.env.NEXT_BUILD_TIMESTAMP ??
  process.env.NETLIFY_BUILD_TIME ??
  new Date().toISOString();

const getLastModifiedForKey = (key: string) => {
  const source = SOURCE_FILE_MAP[key] ?? SOURCE_FILE_MAP.home;
  if (!source) {
    return fallbackLastModified;
  }

  try {
    const stats = fs.statSync(path.join(process.cwd(), source));
    return stats.mtime.toISOString();
  } catch {
    return fallbackLastModified;
  }
};

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.keys(translations);
  const getPathSegments = (path: string) => (path ? path.split('/').filter(Boolean) : []);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  sitemapEntries.push({
    url: withTrailingSlash(SITE_URL),
    lastModified: getLastModifiedForKey('root'),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        'hy-AM': buildUrl('hy'),
        'ru-RU': buildUrl('ru'),
        'en-US': buildUrl('en'),
        'x-default': withTrailingSlash(SITE_URL),
      },
    },
  });

  languages.forEach(lang => {
    (Object.entries(SITE_PAGE_CONFIG) as Array<[SitePageKey, (typeof SITE_PAGE_CONFIG)[SitePageKey]]>).forEach(
      ([key, config]) => {
        const segments = getPathSegments(config.path);
        const url = buildUrl(lang, ...segments);
        const alternates: Record<string, string> = {};
        languages.forEach(altLang => {
          alternates[mapLanguageCode(altLang)] = buildUrl(altLang, ...segments);
        });
        alternates['x-default'] = buildUrl('hy', ...segments);

        sitemapEntries.push({
          url,
          lastModified: getLastModifiedForKey(key),
          changeFrequency: config.changeFrequency,
          priority: config.priority,
          alternates: {
            languages: alternates,
          },
        });
      },
    );
  });

  return sitemapEntries;
}
