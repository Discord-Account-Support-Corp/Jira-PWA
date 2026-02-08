const CACHE_NAME = "dasc-pwa-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icons/icon-192.png",
        "/icons/icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
