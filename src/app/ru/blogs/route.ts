import { promises as fs } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

async function readHtml(): Promise<string> {
  const fileUrl = new URL('./page.html', import.meta.url);
  return fs.readFile(fileUrl, 'utf8');
}

export async function GET() {
  const html = await readHtml();
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function HEAD() {
  await readHtml();
  return new Response(null, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
