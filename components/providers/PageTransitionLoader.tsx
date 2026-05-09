"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setIsVisible(true);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 220);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[9998] h-1"
        >
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-coral via-secondary to-primary shadow-[0_2px_16px_rgba(14,165,233,0.35)]"
            initial={{ scaleX: 0.08 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
