"use client";

import { motion } from 'framer-motion';

export default function NameBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center mb-4 mt-4"
    >
      <div
        className="px-4 py-2 rounded-full text-sm font-bold shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'var(--btn-text)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        Yiğit Efe Avcı
      </div>
    </motion.div>
  );
}