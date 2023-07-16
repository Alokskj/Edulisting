if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    });
  }

  else{
    console.log('no service worker found')
  }
