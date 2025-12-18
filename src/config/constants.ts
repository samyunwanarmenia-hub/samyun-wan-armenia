/**
 * Application-wide constants
 * All magic numbers and strings should be defined here
 */

// ============================================================================
// API Limits
// ============================================================================

export const API_LIMITS = {
  /** Maximum length for Telegram messages (Telegram API limit) */
  MESSAGE_MAX_LENGTH: 2000,
  /** Maximum length for sanitized text fields */
  TEXT_SANITIZE_MAX_LENGTH: 500,
  /** Maximum video file size in bytes (50MB - Telegram limit) */
  MAX_VIDEO_SIZE_BYTES: 50 * 1024 * 1024,
} as const;

// ============================================================================
// Rate Limiting
// ============================================================================

export const RATE_LIMIT = {
  /** Rate limit window in milliseconds (1 minute) */
  WINDOW_MS: 60 * 1000,
  /** Maximum requests per window for sendTelegramMessage */
  MAX_REQUESTS_MESSAGE: 5,
  /** Maximum requests per window for notifyVisit */
  MAX_REQUESTS_VISIT: 10,
} as const;

// ============================================================================
// Geo IP API
// ============================================================================

export const GEO_API = {
  /** Cache TTL for geo data in milliseconds (5 minutes) */
  CACHE_TTL_MS: 5 * 60 * 1000,
  /** Request timeout in milliseconds (3 seconds) */
  TIMEOUT_MS: 3000,
} as const;

// ============================================================================
// HTTP Status Codes
// ============================================================================

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================================================
// Cookie Settings
// ============================================================================

export const COOKIE = {
  /** Cookie name for language preference */
  LANG_NAME: 'current_lang',
  /** Cookie name for analytics consent */
  ANALYTICS_CONSENT_NAME: 'analytics_consent',
  /** Cookie name for marketing consent */
  MARKETING_CONSENT_NAME: 'marketing_consent',
  /** Language cookie max age in seconds (1 year) */
  LANG_MAX_AGE_SECONDS: 60 * 60 * 24 * 365,
} as const;

// ============================================================================
// Redirect Status Codes
// ============================================================================

export const REDIRECT_STATUS = {
  /** Temporary redirect (302) */
  TEMPORARY: 302,
  /** Permanent redirect (308) */
  PERMANENT: 308,
} as const;

// ============================================================================
// Video Upload
// ============================================================================

export const VIDEO_UPLOAD = {
  /** Allowed MIME types for video uploads */
  ALLOWED_MIME_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'] as const,
  /** Maximum filename length */
  MAX_FILENAME_LENGTH: 255,
} as const;

// ============================================================================
// Telegram API
// ============================================================================

export const TELEGRAM = {
  /** Telegram API base URL */
  API_BASE_URL: 'https://api.telegram.org',
  /** HTML parse mode for messages */
  PARSE_MODE_HTML: 'HTML',
} as const;

// ============================================================================
// Time & Date
// ============================================================================

export const TIME = {
  /** Timezone for date formatting (Asia/Yerevan) */
  DEFAULT_TIMEZONE: 'Asia/Yerevan',
  /** Locale for date formatting (ru-RU) */
  DEFAULT_LOCALE: 'ru-RU',
} as const;

