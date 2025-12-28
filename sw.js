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

// Обработка фоновых сообщений
messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  
  const title = payload.notification?.title || 'Новая заявка!';
  const options = {
    body: payload.notification?.body || 'Поступила новая заявка',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: payload.data
  };
  
  self.registration.showNotification(title, options);
});

// Клик по уведомлению
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://weltkind666.github.io/planzayavok-pwa/')
  );
});

// Кэширование
const CACHE_NAME = 'planzayavok-v3';
const ASSETS = ['./', './index.html', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if(event.request.url.includes('script.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
