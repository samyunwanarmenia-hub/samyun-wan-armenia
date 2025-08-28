import { Handler, APIGatewayProxyEvent, Context } from '@netlify/functions';

export const handler: Handler = async (event: APIGatewayProxyEvent, _context: Context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Telegram credentials not set' }) };
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
      return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ success: false, data }) };
    }

  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};