"use client";

import { motion } from 'framer-motion';

export default function AboutHeader() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold mb-2 text-center text-gradient-animated"
    >
      About Me
    </motion.h2>
  );
}