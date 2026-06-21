// Minimal service worker — enables PWA install on iOS. No offline caching
// (the monitor must always hit the live network), just a passthrough fetch.
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
