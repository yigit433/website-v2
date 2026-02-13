"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold text-primary mb-4"
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-muted-foreground mb-8"
      >
        {t("message")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link href="/">
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-colors font-semibold">
            {t("returnHome")}
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
