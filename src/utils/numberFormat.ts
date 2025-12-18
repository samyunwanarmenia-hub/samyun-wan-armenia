import { LOCALE_CODES, SupportedLang, isSupportedLang } from '@/config/locales';

/**
 * Formats a number consistently for both server and client rendering.
 * Uses a locale that matches the current language to prevent hydration mismatches.
 * 
 * @param value - The number to format
 * @param currentLang - Optional current language string (defaults to 'hy')
 * @returns Formatted number string
 */
export function formatNumber(value: number, currentLang: string | SupportedLang = 'hy'): string {
  // Use locale that matches the current language to ensure consistent server/client rendering
  // 'hy-AM' and 'ru-RU' use space as thousand separator (e.g., "14 000")
  // 'en-US' uses comma (e.g., "14,000")
  const lang: SupportedLang = isSupportedLang(currentLang) ? currentLang : 'hy';
  const locale = LOCALE_CODES[lang] || 'hy-AM';
  return value.toLocaleString(locale);
}

