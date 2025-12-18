import { UAParser } from 'ua-parser-js';
import { NotifyVisitBody } from '@/types/global';
import { API_LIMITS, GEO_API, TIME, TELEGRAM } from '@/config/constants';

// Types
export type ParsedVisitBody = {
  pagePath: string;
  lat?: number;
  lon?: number;
  screenWidth?: number;
  screenHeight?: number;
  deviceVendor?: string;
  deviceModel?: string;
  cpuArchitecture?: string;
  clientTimezone?: string;
  isQrScan?: boolean;
};

export type GeoData = {
  city?: string;
  country_name?: string;
};

export type VisitMessageData = {
  body: ParsedVisitBody;
  geoData: GeoData;
  ip: string;
  utmParams: string;
  userAgent: string;
  browserLang: string;
  referrer: string;
};

// Utility functions
export const sanitizeText = (input?: string | null, fallback = 'N/A'): string => {
  if (!input || typeof input !== 'string') return fallback;
  return input.replace(/[^\x20-\x7E\u0400-\u052F]/g, '').slice(0, API_LIMITS.TEXT_SANITIZE_MAX_LENGTH) || fallback;
};

export const safeNumber = (value: unknown): number | undefined => {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
};

// Parse request body
export function parseVisitRequest(raw: unknown): ParsedVisitBody {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid request payload');
  }
  const body = raw as Partial<NotifyVisitBody>;

  const parsed: ParsedVisitBody = {
    pagePath: sanitizeText(body.pagePath, '/'),
    lat: safeNumber(body.lat),
    lon: safeNumber(body.lon),
    screenWidth: safeNumber(body.screenWidth),
    screenHeight: safeNumber(body.screenHeight),
    deviceVendor: sanitizeText(body.deviceVendor),
    deviceModel: sanitizeText(body.deviceModel),
    cpuArchitecture: sanitizeText(body.cpuArchitecture),
    clientTimezone: sanitizeText(body.clientTimezone),
    isQrScan: Boolean(body.isQrScan),
  };

  return parsed;
}

// Fetch geo data
const GEO_CACHE_TTL_MS = GEO_API.CACHE_TTL_MS;
const GEO_TIMEOUT_MS = GEO_API.TIMEOUT_MS;
const geoCache = new Map<string, { data: GeoData; expires: number }>();

export async function fetchGeoData(ip: string): Promise<GeoData> {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    return { city: 'localhost', country_name: 'localhost' };
  }

  const cached = geoCache.get(ip);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal });
    if (geoResponse.ok) {
      const responseJson = await geoResponse.json();
      const data: GeoData = {
        city: sanitizeText(responseJson.city, 'unknown'),
        country_name: sanitizeText(responseJson.country_name, 'unknown'),
      };
      geoCache.set(ip, { data, expires: Date.now() + GEO_CACHE_TTL_MS });
      return data;
    }
    console.warn(`Geo API (ipapi.co) returned error for IP ${ip}:`, geoResponse.status, await geoResponse.text());
  } catch (geoError: unknown) {
    const reason = geoError instanceof Error ? geoError.message : geoError;
    console.error(`Geo API (ipapi.co) error for IP ${ip}:`, reason);
  } finally {
    clearTimeout(timer);
  }

  return { city: 'unknown', country_name: 'unknown' };
}

// Parse UTM parameters
export function parseUtmParams(searchParams: URLSearchParams): string {
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');

  if (!utmSource && !utmMedium && !utmCampaign) {
    return '';
  }

  return `<b>UTM:</b> Source=${sanitizeText(utmSource, 'N/A')}, Medium=${sanitizeText(utmMedium, 'N/A')}, Campaign=${sanitizeText(utmCampaign, 'N/A')}`;
}

// Parse device info from User-Agent
export function parseDeviceInfo(userAgent: string, body: ParsedVisitBody) {
  const ua = new UAParser(userAgent).getResult();
  const deviceType = ua.device.type || 'unknown';
  const osName = ua.os.name || 'unknown';
  const osVersion = ua.os.version || 'N/A';
  const browserName = ua.browser.name || 'unknown';
  const browserVersion = ua.browser.version || 'N/A';

  const deviceVendor = body.deviceVendor || sanitizeText(ua.device.vendor || undefined);
  const deviceModel = body.deviceModel || sanitizeText(ua.device.model || undefined);
  const cpuArchitecture = body.cpuArchitecture || sanitizeText(ua.cpu.architecture || undefined);

  return {
    deviceType,
    deviceVendor,
    deviceModel,
    osName,
    osVersion,
    cpuArchitecture,
    browserName,
    browserVersion,
  };
}

// Build visit message
export function buildVisitMessage(data: VisitMessageData): string {
  const { body, geoData, ip, utmParams, userAgent, browserLang, referrer } = data;

  const deviceInfo = parseDeviceInfo(userAgent, body);
  const messageTitle = body.isQrScan ? '<b>🚨 New QR Scan Verification!</b>' : '<b>🚀 New Visit!</b>';

  // Precise location
  let preciseLocation = '';
  if (body.lat && body.lon) {
    preciseLocation = `<b>Precise Position:</b> ${body.lat.toFixed(5)}, ${body.lon.toFixed(5)}`;
  }

  // Screen resolution
  const screenResolution = `<b>Screen Resolution:</b> ${body.screenWidth || 'N/A'}x${body.screenHeight || 'N/A'}`;

  // Client timezone
  const clientTimezone = body.clientTimezone || 'N/A';

  const message = `${messageTitle}

<b>🗓️ Time:</b> ${new Date().toLocaleString(TIME.DEFAULT_LOCALE, { timeZone: TIME.DEFAULT_TIMEZONE })}
<b>🌍 Client Timezone:</b> ${clientTimezone}
<b>🔗 Path:</b> ${body.pagePath}

<b>📍 Location:</b>
  IP: ${ip}
  City: ${geoData.city}
  Country: ${geoData.country_name}
  ${preciseLocation ? `${preciseLocation}\n` : ''}

<b>📱 Device Info:</b>
  Type: ${deviceInfo.deviceType}
  Vendor: ${deviceInfo.deviceVendor}
  Model: ${deviceInfo.deviceModel}
  OS: ${deviceInfo.osName} ${deviceInfo.osVersion}
  CPU Arch: ${deviceInfo.cpuArchitecture}
  ${screenResolution}

<b>🌐 Browser Info:</b>
  Name: ${deviceInfo.browserName} ${deviceInfo.browserVersion}
  Language: ${browserLang}
  Referrer: ${referrer}

${utmParams ? `<b>📊 ${utmParams}</b>\n` : ''}
`;

  return message;
}

// Send notification to Telegram
export async function sendVisitNotificationToTelegram(
  message: string,
  botToken: string,
  chatId: string
): Promise<{ ok: boolean; data: unknown }> {
  const response = await fetch(`${TELEGRAM.API_BASE_URL}/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: TELEGRAM.PARSE_MODE_HTML,
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json();
  return { ok: data.ok === true, data };
}

