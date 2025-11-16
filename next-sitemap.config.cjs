const DEFAULT_SITE_URL = 'https://samyunwanarmenia.netlify.app';

const SUPPORTED_LANGS = ['hy', 'ru', 'en'];
const LOCALE_CODES = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US',
};
const DEFAULT_LANG = 'hy';

const SITE_PAGES = [
  { path: '', changefreq: 'weekly', priority: 0.9 },
  { path: 'about', changefreq: 'monthly', priority: 0.8 },
  { path: 'benefits', changefreq: 'monthly', priority: 0.8 },
  { path: 'products', changefreq: 'weekly', priority: 0.8 },
  { path: 'testimonials', changefreq: 'monthly', priority: 0.7 },
  { path: 'faq', changefreq: 'monthly', priority: 0.7 },
  { path: 'contact', changefreq: 'weekly', priority: 0.7 },
  { path: 'track-order', changefreq: 'weekly', priority: 0.7 },
  { path: 'how-to-identify-fake', changefreq: 'weekly', priority: 0.9 },
  { path: 'verify/qr', changefreq: 'monthly', priority: 0.7 },
  { path: 'privacy', changefreq: 'monthly', priority: 0.4 },
  { path: 'terms', changefreq: 'monthly', priority: 0.4 },
];

const normalizeUrl = url => url.replace(/\/+$/, '');

const formatSegments = segments =>
  segments
    .flatMap(segment => segment.split('/'))
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean);

const buildLocalizedUrl = (baseUrl, lang, segments) => {
  const sanitizedSegments = formatSegments(segments);
  const path = sanitizedSegments.length ? `/${sanitizedSegments.join('/')}` : '';
  return `${baseUrl}/${lang}${path}`.replace(/\/+$/, '');
};

const buildAlternateRefs = (baseUrl, segments) => {
  const sanitizedSegments = formatSegments(segments);

  const refs = SUPPORTED_LANGS.map(lang => ({
    hreflang: LOCALE_CODES[lang],
    href: buildLocalizedUrl(baseUrl, lang, sanitizedSegments),
    hrefIsAbsolute: true,
  }));

  refs.push({
    hreflang: 'x-default',
    href: buildLocalizedUrl(baseUrl, DEFAULT_LANG, sanitizedSegments),
    hrefIsAbsolute: true,
  });

  return refs;
};

const createLocalizedEntry = (baseUrl, lang, page) => ({
  loc: buildLocalizedUrl(baseUrl, lang, [page.path]),
  changefreq: page.changefreq,
  priority: page.priority,
  alternateRefs: buildAlternateRefs(baseUrl, [page.path]),
});

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: './public',
  additionalPaths: async config => {
    const baseUrl = normalizeUrl(config.siteUrl);
    const entries = [];

    SITE_PAGES.forEach(page => {
      SUPPORTED_LANGS.forEach(lang => {
        entries.push(createLocalizedEntry(baseUrl, lang, page));
      });
    });

    return entries;
  },
};
