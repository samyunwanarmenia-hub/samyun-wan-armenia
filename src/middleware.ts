import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['hy', 'ru', 'en'];
const defaultLocale = 'hy';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If locale is present, do nothing
    return;
  }

  // If no locale, rewrite the URL to include the default locale.
  // This will handle both '/' and other paths like '/about'.
  // For '/', it becomes '/hy'.
  // For '/about', it becomes '/hy/about'.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Match all paths except for static files and API routes
    // Ensure all new page routes are covered by this matcher
    '/((?!_next|api|favicon.ico|site.webmanifest|robots.txt|images|fonts|optimized|loading.gif|testimonial-video.mp4).*)',
  ],
};