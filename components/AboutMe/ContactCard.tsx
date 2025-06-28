"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center mb-10"
    >
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
        className="flex items-center gap-3 px-6 py-4 rounded-xl shadow-md transition duration-300"
        style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
      >
        <Mail className="w-6 h-6" />
        <span className="text-sm font-semibold">yigit433.devs@gmail.com</span>
      </motion.div>
    </motion.div>
  );
}