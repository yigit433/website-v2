"use client";

import { motion } from "framer-motion";

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="p-5 rounded-xl shadow-md bg-[color:var(--card-bg)] flex flex-col justify-between min-h-[140px]"
    >
      <div>
        {/* Title */}
        <div className="h-5 w-2/5 rounded bg-[var(--btn-bg)] animate-pulse mb-3" />
        {/* Description line 1 */}
        <div className="h-3 w-full rounded bg-[var(--btn-bg)] animate-pulse mb-2" />
        {/* Description line 2 */}
        <div className="h-3 w-3/4 rounded bg-[var(--btn-bg)] animate-pulse mb-3" />
      </div>

      <div className="flex justify-between items-center">
        {/* Language */}
        <div className="h-3 w-16 rounded bg-[var(--btn-bg)] animate-pulse" />
        {/* Stars */}
        <div className="h-3 w-12 rounded bg-[var(--btn-bg)] animate-pulse" />
      </div>
    </motion.div>
  );
}

export default function RepositorySkeleton() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Heading skeleton */}
      <div className="flex justify-center mb-12">
        <div className="h-9 w-64 rounded bg-[var(--btn-bg)] animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
