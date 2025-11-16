const DEFAULT_SITE_URL = 'https://samyunwanarmenia.netlify.app';

const SUPPORTED_LANGS = ['hy', 'ru', 'en'];
const LOCALE_CODES = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US',
};
const DEFAULT_LANG = 'hy';

const normalizeUrl = url => url.replace(/\/+$/, '');

const buildHref = (baseUrl, lang, pathSegments) => {
  const parts = [lang, ...pathSegments].filter(Boolean);
  const joined = parts.join('/');
  return `${baseUrl}/${joined}`.replace(/\/+$/, '');
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: './public',
  transform: async (config, path) => {
    const normalizedBaseUrl = normalizeUrl(config.siteUrl);
    const cleanedPath = path.replace(/^\/+|\/+$/g, '');
    const segments = cleanedPath.split('/').filter(Boolean);
    const hasLangPrefix = SUPPORTED_LANGS.includes(segments[0]);
    const pathSegments = hasLangPrefix ? segments.slice(1) : segments;
    const pathForLoc = path.startsWith('/') ? path : `/${path}`;
    const loc = `${normalizedBaseUrl}${pathForLoc}`;

    const alternateRefs = SUPPORTED_LANGS.map(lang => ({
      hreflang: LOCALE_CODES[lang],
      href: buildHref(normalizedBaseUrl, lang, pathSegments),
    }));

    alternateRefs.push({
      hreflang: 'x-default',
      href: buildHref(normalizedBaseUrl, DEFAULT_LANG, pathSegments),
    });

    const basePriority = path === '/' || cleanedPath === '' ? 1 : 0.8;

    return {
      loc,
      changefreq: 'weekly',
      priority: basePriority,
      alternateRefs,
    };
  },
};
