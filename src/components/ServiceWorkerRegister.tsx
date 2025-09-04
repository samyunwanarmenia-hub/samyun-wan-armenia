"use client";

import { useEffect } from 'react';

const ServiceWorkerRegister = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Further defer the Service Worker registration to an idle moment
        setTimeout(() => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
              console.error('Service Worker registration failed:', error);
            });
        }, 0);
      });
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default ServiceWorkerRegister;