"use client";

import { motion } from 'framer-motion';

const details = [
  { label: 'Location', value: 'Türkiye' },
  { label: 'Education', value: 'B.Sc. in Statistics' },
  { label: 'Backend Stack', value: 'GoLang, PostgreSQL, Prisma' },
  { label: 'Frontend Stack', value: 'Next.js, React, Tailwind CSS' },
  { label: 'Focus Areas', value: 'CI/CD, Data Modeling, Statistical Computing' },
];

export default function DetailList() {
  return (
    <div className="flex flex-col gap-4">
      {details.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
        >
          <p className="text-sm font-medium opacity-70">{item.label}</p>
          <p className="text-base font-semibold">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}