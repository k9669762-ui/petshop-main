"use client";

import dynamic from "next/dynamic";
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
  { ssr: false }
);

function PersistedStoreHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
    void useUserStore.persist.rehydrate();
  }, []);

  return null;
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
        <PageTransitionLoader />
        <ServiceWorkerRegistration />
        {children}
        <MobileBottomNav />
        <ChatBot />
      </InitialLoader>
    </ThemeProvider>
  );
}
