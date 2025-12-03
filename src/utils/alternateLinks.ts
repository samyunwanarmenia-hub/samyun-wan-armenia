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
  const hyPath = `/hy${normalized}`;
  const ruPath = `/ru${normalized}`;
  const enPath = `/en${normalized}`;

  return {
    canonical: hyPath,
    languages: {
      hy: hyPath,
      ru: ruPath,
      en: enPath,
      'x-default': hyPath,
    },
  };
};
