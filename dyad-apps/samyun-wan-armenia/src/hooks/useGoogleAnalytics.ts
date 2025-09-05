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

    // Delay the injection of the Google Analytics script
    const scriptInjectionTimeout = setTimeout(injectGoogleAnalyticsScript, 3000); // Delay by 3 seconds

    // Track page view on route change.
    // The 'config' command also sends a page_view event by default.
    // We only need to send it explicitly if we want to override default behavior or send additional parameters.
    // For simple page views, the initial 'config' in injectGoogleAnalyticsScript is often enough for the first page.
    // For subsequent navigations, we explicitly send a page_view event.
    if (pathname !== null) {
      const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      // Ensure gtag is available (it will be queued if not yet loaded)
      window.gtag('event', 'page_view', {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    return () => {
      clearTimeout(scriptInjectionTimeout);
    };
  }, [pathname, searchParams]);
};