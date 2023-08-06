// sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache the assets when the service worker is installed.
precacheAndRoute(self.__WB_MANIFEST);

// Cache API requests with a starting URL of 'https://wuy8smzl.api.sanity.io/v2021-08-31/data/query/production'
registerRoute(
  ({url}) => url.origin === 'https://wuy8smzl.api.sanity.io' &&
             url.pathname.startsWith('/v2021-08-31/data/query/production'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      {
        // Set the cache expiration period (e.g., 1 day)
        cacheExpiration: {
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    ],
  })
);

setDefaultHandler(new StaleWhileRevalidate());
