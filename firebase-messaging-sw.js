importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAXOY6MTSvCosLY4oSxjLqpZ6qLUPhifGU",
  authDomain: "ksvegetables-3959d.firebaseapp.com",
  projectId: "ksvegetables-3959d",
  storageBucket: "ksvegetables-3959d.appspot.com",
  messagingSenderId: "791132153293",
  appId: "1:791132153293:web:2fb8a42dd2262fd48b9084"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log("📩 Background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "order-icon.png"
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
