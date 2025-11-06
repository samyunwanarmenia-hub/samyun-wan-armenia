import fs from 'node:fs';
import path from 'node:path';

import { MetadataRoute } from 'next';

import { translations } from '@/i18n/translations';
import { navigationSections } from '@/data/navigationSections';
import { SITE_URL } from '@/config/siteConfig';

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
  const mainNavPages = navigationSections.map(section => section.id).filter(id => id !== 'home');

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
    sitemapEntries.push({
      url: buildUrl(lang),
      lastModified: getLastModifiedForKey('home'),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'hy-AM': buildUrl('hy'),
          'ru-RU': buildUrl('ru'),
          'en-US': buildUrl('en'),
          'x-default': buildUrl('hy'),
        },
      },
    });

    mainNavPages.forEach(page => {
      const alternates: Record<string, string> = {};
      languages.forEach(altLang => {
        alternates[mapLanguageCode(altLang)] = buildUrl(altLang, page);
      });
      alternates['x-default'] = buildUrl('hy', page);
      sitemapEntries.push({
        url: buildUrl(lang, page),
        lastModified: getLastModifiedForKey(page),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });

    ['privacy', 'terms'].forEach(legalPage => {
      const legalAlternates: Record<string, string> = {};
      languages.forEach(altLang => {
        legalAlternates[mapLanguageCode(altLang)] = buildUrl(altLang, legalPage);
      });
      legalAlternates['x-default'] = buildUrl('hy', legalPage);
      sitemapEntries.push({
        url: buildUrl(lang, legalPage),
        lastModified: getLastModifiedForKey(legalPage),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: legalAlternates,
        },
      });
    });

    const qrVerifyAlternates: Record<string, string> = {};
    languages.forEach(altLang => {
      qrVerifyAlternates[mapLanguageCode(altLang)] = buildUrl(altLang, 'verify', 'qr');
    });
    qrVerifyAlternates['x-default'] = buildUrl('hy', 'verify', 'qr');

    sitemapEntries.push({
      url: buildUrl(lang, 'verify', 'qr'),
      lastModified: getLastModifiedForKey('verify/qr'),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: qrVerifyAlternates,
      },
    });

    const fakeIdentifyAlternates: Record<string, string> = {};
    languages.forEach(altLang => {
      fakeIdentifyAlternates[mapLanguageCode(altLang)] = buildUrl(altLang, 'how-to-identify-fake');
    });
    fakeIdentifyAlternates['x-default'] = buildUrl('hy', 'how-to-identify-fake');

    sitemapEntries.push({
      url: buildUrl(lang, 'how-to-identify-fake'),
      lastModified: getLastModifiedForKey('how-to-identify-fake'),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: fakeIdentifyAlternates,
      },
    });
  });

  return sitemapEntries;
}
