// src/index.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      
    }).catch(function(err) {
      console.error('Service Worker registration failed:', err);
    });
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
      
    }).catch(function(err) {
      console.error('firestore Service Worker registration failed:', err);
    });
  });
}

