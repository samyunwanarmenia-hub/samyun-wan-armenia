import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED_LANGS = new Set(['hy', 'ru', 'en']);

const resolveLangFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const candidate = segments[0]?.toLowerCase();
  return candidate && SUPPORTED_LANGS.has(candidate) ? candidate : 'hy';
};

export function middleware(request: NextRequest) {
  const lang = resolveLangFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-lang', lang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|webp)).*)'],
};
