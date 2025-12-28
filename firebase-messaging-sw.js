importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2HkY76nLBhE7GuCwXi1j6qzKyYPSmypg",
  authDomain: "planzayavok.firebaseapp.com",
  projectId: "planzayavok",
  storageBucket: "planzayavok.firebasestorage.app",
  messagingSenderId: "655180080768",
  appId: "1:655180080768:web:449d8189bf747d34b46865"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Background message:', payload);
  
  const title = payload.notification?.title || 'Новая заявка!';
  const options = {
    body: payload.notification?.body || 'Поступила новая заявка',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true
  };
  
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://weltkind666.github.io/planzayavok-pwa/')
  );
});
