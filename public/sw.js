// public/service-worker.js

const CACHE_NAME = 'my-app-cache';
const OFFLINE_URL = '/offline.html'; // Replace this with the path to your offline page HTML file

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.add(OFFLINE_URL);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).catch(function() {
        return caches.match(OFFLINE_URL);
      });
    })
  );
});
