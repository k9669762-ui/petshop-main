"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let updateInterval: ReturnType<typeof setInterval> | undefined;

    const syncServiceWorker = async () => {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "[::1]";

      if (process.env.NODE_ENV !== "production" || isLocalhost) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if ("caches" in window) {
          const cacheNames = await window.caches.keys();
          await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)));
        }

        console.log("Service workers disabled on local development hosts.");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Rinbow Aqua SW registered:", registration.scope);

      updateInterval = setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 60 * 1000);
    };

    syncServiceWorker().catch((error) => {
      console.log("Service worker setup failed:", error);
    });

    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, []);

  return null;
}

