import { MetadataRoute } from 'next';
import { translations } from '@/i18n/translations';
import { navigationSections } from '@/data/navigationSections';
import { SITE_URL } from '@/config/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.keys(translations);
  // Filter out 'home' as it's handled by the root and language-specific roots
  // 'verify/qr' is a special page and will be added separately.
  const mainNavPages = navigationSections.map(section => section.id).filter(id => id !== 'home');

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const lastModifiedDate = new Date().toISOString(); // Use dynamic date

  // 1. Add root URL
  sitemapEntries.push({
    url: SITE_URL,
    lastModified: lastModifiedDate,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        'hy-AM': `${SITE_URL}/hy`,
        'ru-RU': `${SITE_URL}/ru`,
        'en-US': `${SITE_URL}/en`,
        'x-default': SITE_URL,
      },
    },
  });

  // 2. Add language-specific home pages and all other main navigation pages
  languages.forEach(lang => {
    // Language-specific home page (e.g., /hy, /ru, /en)
    sitemapEntries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'hy-AM': `${SITE_URL}/hy`,
          'ru-RU': `${SITE_URL}/ru`,
          'en-US': `${SITE_URL}/en`,
          'x-default': `${SITE_URL}/hy`, // x-default for language root points to default language root
        },
      },
    });

    // All other main navigation pages for each language (e.g., /hy/about, /ru/benefits, /hy/track-order)
    mainNavPages.forEach(page => {
      const alternates: Record<string, string> = {};
      languages.forEach(altLang => {
        alternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${SITE_URL}/${altLang}/${page}`;
      });
      // x-default for sub-pages points to the default language version of that specific page
      alternates['x-default'] = `${SITE_URL}/hy/${page}`;
      sitemapEntries.push({
        url: `${SITE_URL}/${lang}/${page}`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly',
        priority: 0.8, // Default priority for main navigation pages
        alternates: {
          languages: alternates,
        },
      });
    });

    // --- ADD PRIVACY/TERMS LEGAL PAGES ---
    ['privacy', 'terms'].forEach(legalPage => {
      const legalAlternates: Record<string, string> = {};
      languages.forEach(altLang => {
        legalAlternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${SITE_URL}/${altLang}/${legalPage}`;
      });
      legalAlternates['x-default'] = `${SITE_URL}/hy/${legalPage}`;
      sitemapEntries.push({
        url: `${SITE_URL}/${lang}/${legalPage}`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: legalAlternates,
        },
      });
    });

    // Explicitly add the /verify/qr page for each language
    const qrVerifyAlternates: Record<string, string> = {};
    languages.forEach(altLang => {
      qrVerifyAlternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${SITE_URL}/${altLang}/verify/qr`;
    });
    qrVerifyAlternates['x-default'] = `${SITE_URL}/hy/verify/qr`; // x-default for verify/qr page points to default language verify/qr page

    sitemapEntries.push({
      url: `${SITE_URL}/${lang}/verify/qr`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly',
      priority: 0.7, // Lower priority as it's a utility page
      alternates: {
        languages: qrVerifyAlternates,
      },
    });

    // Add the /how-to-identify-fake page for each language
    const fakeIdentifyAlternates: Record<string, string> = {};
    languages.forEach(altLang => {
      fakeIdentifyAlternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${SITE_URL}/${altLang}/how-to-identify-fake`;
    });
    fakeIdentifyAlternates['x-default'] = `${SITE_URL}/hy/how-to-identify-fake`;

    sitemapEntries.push({
      url: `${SITE_URL}/${lang}/how-to-identify-fake`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly',
      priority: 0.9, // High priority for anti-fraud page
      alternates: {
        languages: fakeIdentifyAlternates,
      },
    });
  });

  return sitemapEntries;
}
