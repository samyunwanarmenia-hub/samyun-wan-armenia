export const DEFAULT_SITE_URL = 'https://samyunwanarmenia.netlify.app';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const normalizedSiteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : undefined;

if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !normalizedSiteUrl) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL must be defined with the public production domain (e.g. https://example.com).',
  );
}

export const SITE_URL = normalizedSiteUrl && normalizedSiteUrl.length > 0 ? normalizedSiteUrl : DEFAULT_SITE_URL;

export const PRIMARY_PHONE = '+37495653666';
export const SECONDARY_PHONE = '+37496653666';

export const OFFICIAL_BUSINESS_NAME = '«САМЮН ВАН АРМЕНИЯ» Центр снижения и набора веса';
export const DIRECTOR_NAME = 'Александр Геворкян';
export const OFFICIAL_ACTIVITY =
  'Представитель торговой марки «Samyun Wan» — консультации и сопровождение по снижению и набору веса';
export const OFFICIAL_CLASSIFICATION =
  'Spyur классификатор: Компании и НКО → Здравоохранение → Коррекция веса';
export const OFFICIAL_CITY = 'Армения, Ереван';
export const OFFICIAL_REGISTRY_LAST_UPDATE = '24.06.2025';
