// Service worker for the Sales Alert PWA.
// Handles install + Web Push so notifications arrive when the app is closed.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (_) { data = { title: '💰 Neuer Sale!', body: event.data ? event.data.text() : '' }; }

  const title = data.title || '💰 Neuer Sale!';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || 'Ticket verkauft',
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'sale-' + Date.now(),
      renotify: true,
      requireInteraction: false,
      data,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow('./');
  })());
});
