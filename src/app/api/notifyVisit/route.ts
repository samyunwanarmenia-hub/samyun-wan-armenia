import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import { NotifyVisitBody } from '@/types/global';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing environment variables for Supabase or Telegram.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const headersList = headers();
    const { searchParams } = new URL(request.url);
    const body: NotifyVisitBody = await request.json();

    // 1️⃣ Get IP
    const ipHeader = headersList.get('x-forwarded-for') || '';
    const ip = ipHeader.split(',')[0].trim() || 'unknown';

    // 2️⃣ GeoIP via ipapi.co
    let geoData: { city?: string; country_name?: string } = { city: 'unknown', country_name: 'unknown' };
    if (ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (geoResponse.ok) {
          const responseJson = await geoResponse.json();
          geoData = {
            city: responseJson.city || 'unknown',
            country_name: responseJson.country_name || 'unknown'
          };
        } else {
          console.warn(`Geo API (ipapi.co) returned error for IP ${ip}:`, geoResponse.status, await geoResponse.text());
        }
      } catch (geoError: unknown) {
        console.error(`Geo API (ipapi.co) error for IP ${ip}:`, geoError instanceof Error ? geoError.message : geoError);
      }
    } else {
      geoData = { city: 'localhost', country_name: 'localhost' };
    }

    // 3️⃣ Read UTM parameters from query string
    let utmParams = '';
    if (searchParams.get('utm_source') || searchParams.get('utm_medium') || searchParams.get('utm_campaign')) {
      utmParams = `<b>UTM:</b> Source=${searchParams.get('utm_source') || 'N/A'}, Medium=${searchParams.get('utm_medium') || 'N/A'}, Campaign=${searchParams.get('utm_campaign') || 'N/A'}`;
    }

    // 4️⃣ Geolocation and screen resolution from request body
    let preciseLocation = '';
    if (body.lat && body.lon) {
      preciseLocation = `<b>Precise Position:</b> ${body.lat.toFixed(5)}, ${body.lon.toFixed(5)}`;
    }
    const screenResolution = `<b>Screen Resolution:</b> ${body.screenWidth || 'N/A'}x${body.screenHeight || 'N/A'}`;

    // 5️⃣ Parse User-Agent
    const ua = new UAParser(headersList.get('user-agent') || '').getResult();
    const deviceType = ua.device.type || 'unknown';
    const osName = ua.os.name || 'unknown';
    const osVersion = ua.os.version || 'N/A';
    const browserName = ua.browser.name || 'unknown';
    const browserVersion = ua.browser.version || 'N/A';

    // New device details from body or UA
    const deviceVendor = body.deviceVendor || ua.device.vendor || 'N/A';
    const deviceModel = body.deviceModel || ua.device.model || 'N/A';
    const cpuArchitecture = body.cpuArchitecture || ua.cpu.architecture || 'N/A';
    const clientTimezone = body.clientTimezone || 'N/A';
    const browserLang = headersList.get('accept-language') || 'N/A';
    const referrer = headersList.get('referer') || 'N/A';

    // 6️⃣ Format message
    const messageTitle = body.isQrScan ? '<b>🚨 New QR Scan Verification!</b>' : '<b>🚀 New Visit!</b>';

    const message = `${messageTitle}

<b>🗓️ Time:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yerevan' })}
<b>🌍 Client Timezone:</b> ${clientTimezone}
<b>🔗 Path:</b> ${body.pagePath}

<b>📍 Location:</b>
  IP: ${ip}
  City: ${geoData.city}
  Country: ${geoData.country_name}
  ${preciseLocation ? `${preciseLocation}\n` : ''}

<b>📱 Device Info:</b>
  Type: ${deviceType}
  Vendor: ${deviceVendor}
  Model: ${deviceModel}
  OS: ${osName} ${osVersion}
  CPU Arch: ${cpuArchitecture}
  ${screenResolution}

<b>🌐 Browser Info:</b>
  Name: ${browserName} ${browserVersion}
  Language: ${browserLang}
  Referrer: ${referrer}

${utmParams ? `<b>📊 ${utmParams}</b>\n` : ''}
`;

    // 7️⃣ Send to Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram credentials not set' }, { status: 500 });
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true, data, message });
    } else {
      return NextResponse.json({ success: false, data }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('Error in notifyVisit function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}