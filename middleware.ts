import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isSupportedLang, resolveLang } from './src/config/locales';
import { COOKIE, REDIRECT_STATUS } from './src/config/constants';

const splitPath = (pathname: string) => pathname.split('/').filter(Boolean);

const setLangCookie = (response: NextResponse, lang: string) => {
  response.cookies.set({
    name: COOKIE.LANG_NAME,
    value: lang,
    path: '/',
    sameSite: 'lax',
    maxAge: COOKIE.LANG_MAX_AGE_SECONDS,
  });
};

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

  // Redirect root path to the user's language (temporary redirect)
  if (pathname === '/') {
    const targetLang = detectBrowserLanguage(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}`;
    const response = NextResponse.redirect(url, REDIRECT_STATUS.TEMPORARY);
    setLangCookie(response, targetLang);
    return response;
  }

  const isQrVerificationPath = pathname === '/verify/qr' || pathname.startsWith('/verify/qr/');

  if (!hasLangPrefix(pathname) && isQrVerificationPath) {
    const targetLang = detectBrowserLanguage(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLang}/verify/qr`;
    const response = NextResponse.redirect(url, REDIRECT_STATUS.PERMANENT);
    setLangCookie(response, targetLang);
    return response;
  }

  const lang = resolveLangFromPath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-lang', lang);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  setLangCookie(response, lang);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|webp|api)).*)'],
};
