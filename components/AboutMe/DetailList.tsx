"use client";

import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';

const detailKeys = [
  { labelKey: 'location', valueKey: 'locationValue' },
  { labelKey: 'education', valueKey: 'educationValue' },
  { labelKey: 'backendStack', valueKey: 'backendStackValue' },
  { labelKey: 'frontendStack', valueKey: 'frontendStackValue' },
  { labelKey: 'focusAreas', valueKey: 'focusAreasValue' },
];

export default function DetailList() {
  const t = useTranslations("AboutMe.details");

  return (
    <div className="flex flex-col gap-4">
      {detailKeys.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
        >
          <p className="text-sm font-medium opacity-70">{t(item.labelKey)}</p>
          <p className="text-base font-semibold">{t(item.valueKey)}</p>
        </motion.div>
      ))}
    </div>
  );
}
