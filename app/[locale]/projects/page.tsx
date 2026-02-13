"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Wsupp.co",
    descriptionKey: "wsupp",
    technologies: ["Bun", "Hono", "Typescript", "Tailwind CSS", "Svelte"],
    image: "/WsuppBanner.webp",
    buttons: [
      { nameKey: "github", to: "https://github.com/Wsupp" },
      { nameKey: "visitSite", to: "https://wsupp.co" },
    ],
  },
  {
    title: "Pickin.co",
    descriptionKey: "pickin",
    technologies: ["Redis", "PostgreSQL", "Next.js", "Tailwind CSS"],
    image: "/PickinBanner.png",
    buttons: [
      { nameKey: "visitSite", to: "https://pickin.co" },
    ],
  },
  {
    title: "DORA AI",
    descriptionKey: "doraai",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Tailwind CSS"],
    image: "/DoraAI-Banner.png",
    buttons: [
      { nameKey: "github", to: "https://github.com/Dogumda-Risk-Analizi" },
      { nameKey: "liveDemo", to: "#" },
    ],
  },
  {
    title: "Ticaret İstatistik",
    descriptionKey: "ticaretIstatistik",
    technologies: ["Next.js", "Tailwind CSS"],
    image: "/Ticaret-Istatistik.jpg",
    buttons: [
      {
        nameKey: "github",
        to: "https://github.com/ticaretistatistik/ticaretistatistik.github.io",
      },
      { nameKey: "visitSite", to: "https://ticaretistatistik.github.io/" },
    ],
  },
  {
    title: "Code Share",
    descriptionKey: "codeShare",
    technologies: ["react.js", "Tailwind CSS"],
    image: "/codeshareme.gif",
    buttons: [
      { nameKey: "visitSite", to: "https://codeshare.me/" },
    ],
  },
];

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslations("Projects");

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

      <div className="space-y-16">
        {projects.map((project, i) => (
          <motion.div
            key={i}
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
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm opacity-80 mb-4">{t(`descriptions.${project.descriptionKey}`)}</p>

              <div className="flex flex-wrap gap-2 text-xs font-medium mb-4">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 rounded bg-[color:var(--btn-bg)] text-[color:var(--btn-text)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.buttons?.map((btn, k) => (
                  <a
                    key={k}
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
