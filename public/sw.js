const CACHE_NAME = "rinbow-aqua-v1.2.0";
const OFFLINE_URL = "/offline.html";

const CORE_ASSETS = [
  "/",
  "/shop",
  "/services",
  "/about",
  "/cart",
  "/wishlist",
  OFFLINE_URL,
  "/manifest.json",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(CORE_ASSETS).catch((error) => {
        console.error("Rinbow Aqua: failed to cache core assets.", error);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/")) return;
  if (url.searchParams.has("v")) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          }

          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cachedPage) => cachedPage || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  if (!/\.(?:css|js|png|jpg|jpeg|svg|webp|gif|ico|json)$/i.test(url.pathname)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkResponse = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          }

          return response;
        })
        .catch(() => {
          return cachedResponse || new Response("Offline", { status: 503, statusText: "Offline" });
        });

      return cachedResponse || networkResponse;
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || "New update from Rinbow Aqua!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Rinbow Aqua", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});
