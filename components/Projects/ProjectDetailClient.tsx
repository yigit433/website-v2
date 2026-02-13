"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data/projects";
import ScreenshotGallery from "./ScreenshotGallery";
import GalleryLightbox from "./GalleryLightbox";
import ProjectTimeline from "./ProjectTimeline";
import RelatedProjects from "./RelatedProjects";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshotsToShow =
    project.screenshots.length > 0 ? project.screenshots : [project.image];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToProjects")}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.1 }}
        className="mb-8"
      >
        <ScreenshotGallery
          screenshots={screenshotsToShow}
          title={project.title}
          onOpenLightbox={(index) => setLightboxIndex(index)}
        />
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            screenshots={screenshotsToShow}
            initialIndex={lightboxIndex}
            title={project.title}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.2 }}
        className="text-4xl font-bold mb-6 text-gradient-animated"
      >
        {project.title}
      </motion.h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.3 + i * 0.05 }}
            className="px-3 py-1 text-sm font-medium rounded-md bg-[color:var(--btn-bg)] text-[color:var(--btn-text)]"
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.4 }}
        className="rounded-xl p-6 shadow-md mb-8"
        style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
      >
        <h2 className="text-xl font-semibold mb-3">{t("aboutProject")}</h2>
        <p className="leading-relaxed opacity-90">
          {t(`detailDescriptions.${project.detailDescriptionKey}`)}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.5 }}
        className="flex flex-wrap gap-4 mb-12"
      >
        {project.buttons.map((btn) => (
          <motion.a
            key={btn.to}
            href={btn.to}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-colors"
            style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
          >
            {t(btn.nameKey)}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.6 }}
        className="mb-12"
      >
        <ProjectTimeline
          startDate={project.startDate}
          milestones={project.milestones}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.7 }}
      >
        <RelatedProjects currentSlug={project.slug} />
      </motion.div>
    </section>
  );
}
