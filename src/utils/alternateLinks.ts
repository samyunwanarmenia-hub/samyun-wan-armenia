import { SITE_URL } from '@/config/siteConfig';
import { DEFAULT_LANG } from '@/config/locales';

const normalizePath = (value: string) => {
  const trimmed = (value || '').trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
};

type AlternateLinks = {
  canonical: string;
  languages: Record<string, string>;
};

export const buildAlternates = (path = ''): AlternateLinks => {
  const normalized = normalizePath(path);
  const hyPath = `${SITE_URL}/hy${normalized}`;
  const ruPath = `${SITE_URL}/ru${normalized}`;
  const enPath = `${SITE_URL}/en${normalized}`;
  
  // x-default should point to the default language (usually the main market language)
  // For Armenia, hy (Armenian) is the primary language
  const defaultPath = `${SITE_URL}/${DEFAULT_LANG}${normalized}`;

  return {
    canonical: defaultPath,
    languages: {
      'hy-AM': hyPath,
      'ru-RU': ruPath,
      'en-US': enPath,
      'x-default': defaultPath,
    },
  };
};
