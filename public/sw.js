self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A very simple pass-through fetch handler
  // This is the minimum requirement to be recognized as a PWA
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline content unavailable');
    })
  );
});
