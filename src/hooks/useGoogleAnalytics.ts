"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;

export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID) {
      console.warn('NEXT_PUBLIC_GA_ID is not configured. Google Analytics is disabled.');
      return;
    }

    // Ensure dataLayer and gtag are defined globally before script injection
    // This allows gtag calls to be queued even before the main script loads.
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function (...args: unknown[]) {
          window.dataLayer.push(args);
        };
      }
    }

    // Function to inject the Google Analytics script
    const injectGoogleAnalyticsScript = () => {
      if (typeof window === 'undefined' || document.getElementById('google-analytics-script')) {
        return; // Already loaded or not in browser
      }

      const script = document.createElement('script');
      script.id = 'google-analytics-script';
      script.async = true;
      script.defer = true; // Add defer attribute
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
      script.onload = () => {
        window.gtag('js', new Date());
        window.gtag('config', GOOGLE_ANALYTICS_ID);
      };
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    // Defer the injection of the Google Analytics script using requestIdleCallback
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(injectGoogleAnalyticsScript, { timeout: 2000 });
      } else {
        // Fallback to setTimeout if requestIdleCallback is not supported
        setTimeout(injectGoogleAnalyticsScript, 3000);
      }
    }

    // Track page view on route change.
    if (pathname !== null && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      window.gtag('event', 'page_view', {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);
};
