const CACHE_STATIC_NAME = 'samyunwan-static-v2'; // Cache for static assets (updated version)
const CACHE_DYNAMIC_NAME = 'samyunwan-dynamic-v1'; // Cache for dynamic requests

const STATIC_URLS_TO_CACHE = [
  '/',
  '/hy',
  '/ru',
  '/en',
  '/favicon.ico',
  '/favicon.png',
  '/site.webmanifest',
  '/loading.gif',
  // Add your font files here if they are critical and not handled by dynamic caching
  '/fonts/CalSans-SemiBold.woff2',
  '/fonts/Inter-Bold.woff2',
  '/fonts/Inter-Medium.woff2',
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-SemiBold.woff2',
  // Add other critical static assets that don't change often
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching App Shell');
        return cache.addAll(STATIC_URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          console.log('[Service Worker] Removing old cache.', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Check if the request is for a static asset that should be served cache-first
  const isStaticAsset = STATIC_URLS_TO_CACHE.some(url => event.request.url.includes(url));
  const isOptimizedImage = event.request.url.includes('/optimized/');

  if (isStaticAsset || isOptimizedImage) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Serve from cache if available
        }
        // If not in static cache, try network and then add to dynamic cache
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // Fallback for network failure if not in cache
          // You might want to return an offline page here for navigation requests
          console.log('[Service Worker] Network request failed for:', event.request.url);
          return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        });
      })
    );
  } else {
    // For all other requests (e.g., API calls, external resources), use network-first strategy
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Cache successful network responses dynamically
          return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request).then((cacheResponse) => {
            if (cacheResponse) {
              return cacheResponse;
            }
            // If not in cache either, return a fallback
            console.log('[Service Worker] Network and cache failed for:', event.request.url);
            return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
          });
        })
    );
  }
});