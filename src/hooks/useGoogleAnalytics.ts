"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GOOGLE_ANALYTICS_ID = 'G-082YC0D78R'; // Your Google Analytics Measurement ID

export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure dataLayer and gtag are defined globally before script injection
    // This allows gtag calls to be queued even before the main script loads.
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        // Use rest parameters instead of 'arguments'
        window.gtag = function(...args: unknown[]) { window.dataLayer.push(args); };
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
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      // Initial configuration after script is added to DOM
      window.gtag('js', new Date());
      window.gtag('config', GOOGLE_ANALYTICS_ID);
      console.log('Google Analytics script injected and initialized.');
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
    if (pathname !== null) {
      const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      // Ensure gtag is available (it will be queued if not yet loaded)
      window.gtag('event', 'page_view', {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);
};