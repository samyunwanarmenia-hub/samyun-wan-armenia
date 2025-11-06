import { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/siteConfig';

const normalize = (url: string) => (url.endsWith('/') ? url : `${url}/`);

export default function robots(): MetadataRoute.Robots {
  const base = normalize(SITE_URL);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${base}sitemap.xml`,
    host: base.slice(0, -1),
  };
}
