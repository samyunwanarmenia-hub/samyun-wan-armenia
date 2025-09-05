import { MetadataRoute } from 'next';
import { translations } from '@/i18n/translations';
import { navigationSections } from '@/data/navigationSections';

const baseUrl = 'https://samyunwanarmenia.netlify.app'; // Replace with your actual base URL

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.keys(translations);
  // Filter out 'home' as it's handled by the root and language-specific roots
  // Now all navigationSections are treated as potential pages
  const staticPages = navigationSections.map(section => section.id).filter(id => id !== 'home');

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const lastModifiedDate = new Date().toISOString(); // Use dynamic date

  // 1. Add root URL
  sitemapEntries.push({
    url: baseUrl,
    lastModified: lastModifiedDate,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        'hy-AM': `${baseUrl}/hy`,
        'ru-RU': `${baseUrl}/ru`,
        'en-US': `${baseUrl}/en`,
        'x-default': baseUrl,
      },
    },
  });

  // 2. Add language-specific home pages and other static pages
  languages.forEach(lang => {
    // Language-specific home page (e.g., /hy, /ru, /en)
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'hy-AM': `${baseUrl}/hy`,
          'ru-RU': `${baseUrl}/ru`,
          'en-US': `${baseUrl}/en`,
          'x-default': `${baseUrl}/hy`, // x-default for language root points to default language root
        },
      },
    });

    // Other static pages for each language (e.g., /hy/about, /ru/benefits)
    staticPages.forEach(page => {
      const alternates: Record<string, string> = {};
      languages.forEach(altLang => {
        alternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${baseUrl}/${altLang}/${page}`;
      });
      // x-default for sub-pages points to the default language version of that specific page
      alternates['x-default'] = `${baseUrl}/hy/${page}`; 

      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: lastModifiedDate,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });

    // Add the new /verify/qr page for each language
    const qrVerifyAlternates: Record<string, string> = {};
    languages.forEach(altLang => {
      qrVerifyAlternates[`${altLang}-${altLang === 'hy' ? 'AM' : altLang === 'ru' ? 'RU' : 'US'}`] = `${baseUrl}/${altLang}/verify/qr`;
    });
    qrVerifyAlternates['x-default'] = `${baseUrl}/hy/verify/qr`; // x-default for verify/qr page points to default language verify/qr page

    sitemapEntries.push({
      url: `${baseUrl}/${lang}/verify/qr`,
      lastModified: lastModifiedDate,
      changeFrequency: 'monthly',
      priority: 0.7, // Lower priority as it's a utility page
      alternates: {
        languages: qrVerifyAlternates,
      },
    });
  });

  return sitemapEntries;
}