import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram credentials not set' }, { status: 500 });
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, data }, { status: 500 });
    }

  } catch (error: unknown) { // Changed to unknown
    console.error('Error in sendTelegramMessage function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}