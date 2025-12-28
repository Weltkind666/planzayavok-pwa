const CACHE_NAME = 'planzayavok-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline', { status: 503 });
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Новая заявка!';
  const options = {
    body: data.body || 'Поступила новая заявка',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://script.google.com/macros/s/AKfycbziJi6zBrH0meVhi27JPdFquQYGhjDK2iX0EIjKrRplhW8E9CQZAkA1ZQpdiNqVsGI1/exec')
  );
});
