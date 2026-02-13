"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}

export default function ScreenshotGallery({
  screenshots,
  title,
  onOpenLightbox,
}: ScreenshotGalleryProps) {
  const t = useTranslations("Projects");
  const [activeIndex, setActiveIndex] = useState(0);

  if (screenshots.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t("screenshotGallery")}</h2>

      <div
        className="overflow-hidden rounded-xl shadow-lg mb-4 cursor-pointer"
        onClick={() => onOpenLightbox(activeIndex)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src={screenshots[activeIndex]}
              alt={`${title} - ${activeIndex + 1}`}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                i === activeIndex
                  ? "ring-2 ring-green-500 opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                width={120}
                height={68}
                className="w-24 h-auto object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
