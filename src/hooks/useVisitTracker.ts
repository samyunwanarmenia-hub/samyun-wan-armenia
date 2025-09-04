"use client";

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation'; // Import usePathname
import { notifyVisit } from '@/utils/telegramApi';
import { UAParser } from 'ua-parser-js'; // Import UAParser

export const useVisitTracker = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const SESSION_KEY = 'samyunwan_visit_notified';
    const NOTIFICATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

    // Exclude QR verification page from general visit tracking
    if (pathname.includes('/verify/qr')) {
      return; // This ensures no general visit notifications are sent from the QR page
    }

    const deferVisitTracking = setTimeout(() => { // Initial deferral by 5 seconds
      const lastNotified = sessionStorage.getItem(SESSION_KEY);
      const currentTime = new Date().getTime();

      if (!lastNotified || (currentTime - parseInt(lastNotified, 10) > NOTIFICATION_INTERVAL_MS)) {
        const sendDetailedVisitNotification = async () => {
          let lat: number | null = null;
          let lon: number | null = null;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          if (navigator.geolocation) {
            try {
              const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, enableHighAccuracy: false });
              });
              lat = position.coords.latitude;
              lon = position.coords.longitude;
            } catch (geoError) {
              console.warn("Geolocation permission denied or error:", geoError);
            }
          }

          // Get User-Agent details and client timezone
          const uaParser = new UAParser();
          const uaResult = uaParser.getResult();
          const deviceVendor = uaResult.device.vendor || null;
          const deviceModel = uaResult.device.model || null;
          const cpuArchitecture = uaResult.cpu.architecture || null;
          const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const utmQueryParams = {
            utm_source: searchParams?.get('utm_source') || null,
            utm_medium: searchParams?.get('utm_medium') || null,
            utm_campaign: searchParams?.get('utm_campaign') || null,
          };

          const bodyData = { 
            lat, 
            lon, 
            screenWidth, 
            screenHeight, 
            pagePath: pathname,
            deviceVendor,
            deviceModel,
            cpuArchitecture,
            clientTimezone,
          };
          
          try {
            await notifyVisit(bodyData, utmQueryParams);
            sessionStorage.setItem(SESSION_KEY, currentTime.toString());
          } catch (error) {
            console.warn(
              "Could not send visit notification. This is expected if Telegram credentials are not set in your .env.local file. Error:",
              error
            );
          }
        };

        // Further defer the actual notification sending to an idle moment
        setTimeout(() => {
          sendDetailedVisitNotification();
        }, 0);
      }
    }, 5000); // Defer by 5 seconds

    return () => {
      clearTimeout(deferVisitTracking); // Clean up the timeout
    };
  }, [searchParams, pathname]); // Depend on searchParams and pathname
};