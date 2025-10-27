const CACHE_NAME = 'snake-25-v1';
const urlsToCache = [
  '/snake.25/',
  '/snake.25/index.html',
  '/snake.25/snake.html',
  '/snake.25/brick.html',
  '/snake.25/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Error al cachear:', err))
  );
});

self.addEventListener('fetch', event => {
  // Solo manejar solicitudes dentro del scope de esta PWA
  if (event.request.url.includes('/snake.25/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => {
          // Opcional: página offline personalizada (no incluida aquí)
          return caches.match('/snake.25/index.html');
        })
    );
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
