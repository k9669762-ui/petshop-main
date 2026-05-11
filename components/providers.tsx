"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import InitialLoader from "./providers/InitialLoader";
import ServiceWorkerRegistration from "./providers/ServiceWorkerRegistration";
import { useCartStore, useUserStore, useWishlistStore } from "@/lib/store";

const PageTransitionLoader = dynamic(() => import("./providers/PageTransitionLoader"), {
  ssr: false,
});

const MobileBottomNav = dynamic(
  () => import("./mobile-bottom-nav").then((mod) => mod.MobileBottomNav),
  { ssr: false }
);

const ChatBot = dynamic(
  () => import("./chatbot/ChatBot").then((mod) => mod.ChatBot),
  { ssr: false, loading: () => null }
);

function PersistedStoreHydrator() {
  useEffect(() => {
    // Defer store hydration to after first paint
    const t = setTimeout(() => {
      void useCartStore.persist.rehydrate();
      void useWishlistStore.persist.rehydrate();
      void useUserStore.persist.rehydrate();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return null;
}

function DeferredChatBot() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Load chatbot 3s after mount so it doesn't block navigation
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);
  return show ? <ChatBot /> : null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <InitialLoader>
        <PersistedStoreHydrator />
        <Suspense fallback={null}>
          <PageTransitionLoader />
        </Suspense>
        <ServiceWorkerRegistration />
        {children}
        <MobileBottomNav />
        <DeferredChatBot />
      </InitialLoader>
    </ThemeProvider>
  );
}
