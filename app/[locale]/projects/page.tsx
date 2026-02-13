"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import TechFilter from "@/components/Projects/TechFilter";

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const t = useTranslations("Projects");

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => {
        const matchesSearch =
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech =
          selectedTechs.length === 0 ||
          selectedTechs.every((tech) => p.technologies.includes(tech));
        return matchesSearch && matchesTech;
      }),
    [searchQuery, selectedTechs]
  );

  const handleToggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center text-gradient-animated"
      >
        {t("title")}
      </motion.h2>

      <TechFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTechs={selectedTechs}
        onToggleTech={handleToggleTech}
        onClearFilters={handleClearFilters}
      />

      {filteredProjects.length > 0 && (searchQuery || selectedTechs.length > 0) && (
        <p className="text-sm opacity-60 mb-6">
          {t("showingCount", {
            count: filteredProjects.length,
            total: projects.length,
          })}
        </p>
      )}

      {filteredProjects.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 opacity-60"
        >
          {t("noProjectsFound")}
        </motion.p>
      ) : (
        <div className="space-y-16">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`md:flex md:items-center rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
            >
              {project.image && (
                <div className="md:w-1/2 w-full flex justify-center items-center">
                  <div
                    className="overflow-hidden rounded-xl shadow-md w-full h-full cursor-zoom-in"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="md:w-1/2 mt-6 md:mt-0 md:px-6">
                <h3 className="text-2xl font-semibold mb-2">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-sm opacity-80 mb-4">{t(`descriptions.${project.descriptionKey}`)}</p>

                <div className="flex flex-wrap gap-2 text-xs font-medium mb-4">
                  {project.technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleToggleTech(tech)}
                      className={`px-2 py-1 rounded transition-all ${
                        selectedTechs.includes(tech)
                          ? "bg-green-500 text-white"
                          : "bg-[color:var(--btn-bg)] text-[color:var(--btn-text)] hover:opacity-80"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.buttons?.map((btn) => (
                    <a
                      key={btn.to}
                      href={btn.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                      style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
                    >
                      {t(btn.nameKey)}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full px-4"
            >
              <Image
                src={selectedImage}
                alt="Fullscreen Preview"
                width={1200}
                height={675}
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
