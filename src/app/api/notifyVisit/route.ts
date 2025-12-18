import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import {
  parseVisitRequest,
  fetchGeoData,
  parseUtmParams,
  buildVisitMessage,
  sendVisitNotificationToTelegram,
} from '@/lib/visitNotification';
import { RATE_LIMIT, HTTP_STATUS } from '@/config/constants';

// Rate limiting (will be moved to shared utility in TASK 1)
const RATE_LIMIT_WINDOW_MS = RATE_LIMIT.WINDOW_MS;
const RATE_LIMIT_MAX_REQUESTS = RATE_LIMIT.MAX_REQUESTS_VISIT;
const rateLimitStore = new Map<string, { count: number; expires: number }>();

const checkRateLimit = (key: string) => {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);
  if (!bucket || bucket.expires < now) {
    rateLimitStore.set(key, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  return true;
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram credentials for notifyVisit.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
  }

  try {
    const headersList = headers();
    const { searchParams } = new URL(request.url);
    const rawBody = await request.json().catch(() => null);

    // 1️⃣ Parse request body
    const body = parseVisitRequest(rawBody);

    // 2️⃣ Get and validate IP
    const ipHeader = headersList.get('x-forwarded-for') || '';
    const ip = ipHeader.split(',')[0].trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: HTTP_STATUS.TOO_MANY_REQUESTS });
    }

    // 3️⃣ Fetch geo data
    const geoData = await fetchGeoData(ip);

    // 4️⃣ Parse UTM parameters
    const utmParams = parseUtmParams(searchParams);

    // 5️⃣ Get headers for message building
    const userAgent = headersList.get('user-agent') || '';
    const browserLang = headersList.get('accept-language') || 'N/A';
    const referrer = headersList.get('referer') || 'N/A';

    // 6️⃣ Build message
    const message = buildVisitMessage({
      body,
      geoData,
      ip,
      utmParams,
      userAgent,
      browserLang,
      referrer,
    });

    // 7️⃣ Send to Telegram
    const result = await sendVisitNotificationToTelegram(message, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);

    if (result.ok) {
      return NextResponse.json({ success: true, data: result.data, message });
    } else {
      return NextResponse.json({ success: false, data: result.data }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }
  } catch (error: unknown) {
    console.error('Error in notifyVisit function:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
