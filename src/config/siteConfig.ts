export const DEFAULT_SITE_URL = 'https://samyunwanarmenia.netlify.app';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : DEFAULT_SITE_URL;

export const PRIMARY_PHONE = '+37495653666';
export const SECONDARY_PHONE = '+37496653666';
