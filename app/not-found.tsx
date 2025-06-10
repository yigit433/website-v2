"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold text-primary mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-muted-foreground mb-8"
      >
        Oops! This page wandered into the digital wilderness. Maybe it ran into something legendary? Let’s get you back on track.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link href="/">
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-colors font-semibold">
            Return to Home
          </button>
        </Link>
      </motion.div>
    </main>
  );
}