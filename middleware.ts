import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isSupportedLang, resolveLang } from './src/config/locales';

const splitPath = (pathname: string) => pathname.split('/').filter(Boolean);

const resolveLangFromPath = (pathname: string): string => {
  const segments = splitPath(pathname);
  const candidate = segments[0]?.toLowerCase();
  return resolveLang(candidate);
};

const detectBrowserLanguage = (request: NextRequest): string => {
  const acceptLang = request.headers.get('accept-language') || '';
  const browserLang = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase() || '';
  return resolveLang(browserLang);
};

const hasLangPrefix = (pathname: string): boolean => {
  const segments = splitPath(pathname);
  const candidate = segments[0]?.toLowerCase();
  return isSupportedLang(candidate);
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
  
  const isQrVerificationPath = pathname === '/verify/qr' || pathname.startsWith('/verify/qr/');

  if (!hasLangPrefix(pathname) && isQrVerificationPath) {
    const targetLang = detectBrowserLanguage(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}/verify/qr`;
    return NextResponse.redirect(url, 308);
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
