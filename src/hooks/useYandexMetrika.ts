"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SITE_URL } from '@/config/siteConfig';

const YANDEX_METRIKA_ID = 103962073; // Your Yandex.Metrika counter ID

export const useYandexMetrika = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const allowedHost = (() => {
      try { return new URL(SITE_URL).hostname; } catch { return null; }
    })();
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    // Load Metrika только на продакшн-домене, чтобы избежать cookie warning локально
    const domainOk = allowedHost ? hostname === allowedHost : false;

    // Ensure ym is defined globally before script injection
    // This allows ym calls to be queued even before the main script loads.
    if (typeof window !== 'undefined') {
      window.ym = window.ym || function(...args: unknown[]){(window.ym.a=window.ym.a||[]).push(args)};
      window.ym.l = 1 * new Date().getTime();
    }

    // Function to inject the Yandex Metrika script
    const injectYandexMetrikaScript = () => {
      if (typeof window === 'undefined' || document.getElementById('yandex-metrika-script')) {
        return; // Already loaded or not in browser
      }
      if (!domainOk) {
        console.warn('Yandex Metrika skipped due to hostname mismatch', { hostname, allowedHost });
        return;
      }

      const script = document.createElement('script');
      script.id = 'yandex-metrika-script';
      script.async = true;
      script.defer = true; // Add defer attribute
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script); // Fallback if no scripts exist
      }

      // Initialize Yandex Metrika after script is added to DOM
      window.ym(YANDEX_METRIKA_ID, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        accurateTrackBounce: true,
        trackLinks: true
      });
      console.log('Yandex Metrika script injected and initialized.');
    };

    // Defer the injection of the Yandex Metrika script using requestIdleCallback
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(injectYandexMetrikaScript, { timeout: 2000 });
      } else {
        // Fallback to setTimeout if requestIdleCallback is not supported
        setTimeout(injectYandexMetrikaScript, 3000);
      }
    }

    // Track page view on route change.
    if (pathname !== null && domainOk) {
      const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      // Ensure ym is available (it will be queued if not yet loaded)
      window.ym(YANDEX_METRIKA_ID, 'hit', fullPath);
    }
  }, [pathname, searchParams]);
};
