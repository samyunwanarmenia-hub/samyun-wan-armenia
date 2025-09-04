"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { notifyVisit } from '@/utils/telegramApi';

export const useVisitTracker = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const SESSION_KEY = 'samyunwan_visit_notified';
    const NOTIFICATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

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

          const utmQueryParams = {
            utm_source: searchParams?.get('utm_source') || null,
            utm_medium: searchParams?.get('utm_medium') || null,
            utm_campaign: searchParams?.get('utm_campaign') || null,
          };

          const bodyData = { lat, lon, screenWidth, screenHeight };

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
  }, [searchParams]); // Depend on searchParams to re-run if UTMs change
};