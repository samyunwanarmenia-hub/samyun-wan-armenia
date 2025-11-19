import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const htmlPath = path.join(process.cwd(), 'src', 'app', 'en', 'blogs', 'page.html');

async function readHtml(): Promise<string> {
  return fs.readFile(htmlPath, 'utf8');
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
