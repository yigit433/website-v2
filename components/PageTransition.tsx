"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [supportsViewTransitions, setSupportsViewTransitions] = useState(false);

  useEffect(() => {
    setSupportsViewTransitions(
      typeof document !== "undefined" &&
        "startViewTransition" in document
    );
  }, []);

  // If browser supports View Transitions API, let CSS handle it
  if (supportsViewTransitions) {
    return <div>{children}</div>;
  }

  // Fallback: Framer Motion page transitions
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
