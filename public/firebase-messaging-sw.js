importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDGGNYakmElAadHYIxORGFw2XcIOAfFwls",
    authDomain: "edulisting-42365.firebaseapp.com",
    projectId: "edulisting-42365",
    storageBucket: "edulisting-42365.appspot.com",
    messagingSenderId: "818757808814",
    appId: "1:818757808814:web:655d7797e195ae35f9b33f",
    measurementId: "G-BQYBYB056F"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: '/images/icons/edulisitingRounded.png',
  //   badge: '/images/icons/ic_edulisting.png',
  //   tag: 'message-notification',
  //   requireInteraction: true,
  //   vibrate: [200, 100, 200],
  //   click_action: 'https://edulisting.in/',
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
