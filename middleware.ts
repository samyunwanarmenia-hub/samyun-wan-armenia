import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { resolveLang } from './src/config/locales';

const resolveLangFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const candidate = segments[0]?.toLowerCase();
  return resolveLang(candidate);
};

const detectBrowserLanguage = (request: NextRequest): string => {
  const acceptLang = request.headers.get('accept-language') || '';
  const browserLang = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase() || '';
  return resolveLang(browserLang);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Редирект с root path на язык пользователя (302 temporary redirect)
  if (pathname === '/') {
    const targetLang = detectBrowserLanguage(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}`;
    return NextResponse.redirect(url, 302);
  }
  
  const lang = resolveLangFromPath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-lang', lang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|webp|api)).*)'],
};
