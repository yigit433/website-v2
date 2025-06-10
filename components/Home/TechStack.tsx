"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  {
    name: "Flutter",
    icon: "/icons/flutter.svg",
    description: "Cross-platform UI toolkit for building apps with Dart.",
  },
  {
    name: "React",
    icon: "/icons/react.svg",
    description: "UI library for building user interfaces.",
  },
  {
    name: "Next.js",
    icon: "/icons/nextjs.svg",
    description: "Fullstack framework for modern React apps.",
  },
  {
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
    description: "Utility-first CSS framework for rapid UI dev.",
  },
  {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    description: "Typed superset of JavaScript.",
  },
  {
    name: "GoLang",
    icon: "/icons/golang.svg",
    description: "Compiled language for backend and systems.",
  },
  {
    name: "Supabase",
    icon: "/icons/supabase.svg",
    description: "Open source Firebase alternative with Postgres.",
  },
];

export const TechStackHorizontal = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <h2 className="text-2xl font-bold px-2">Tech Stack</h2>
      <p className="text-muted-foreground text-lg text-center max-w-lg">
        Core technologies I rely on throughout the design, development, and delivery lifecycle.
      </p>

      <div className="relative w-full max-w-5xl px-4">
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:flex md:flex-wrap md:justify-center
            gap-4 py-2"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{
                scale: 1.08,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ backgroundColor: "var(--card-bg)" }}
              className="relative group flex flex-col items-center justify-center text-center min-w-[110px] max-w-[130px] px-5 py-4 rounded-2xl border border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-background/60 hover:shadow-[0_0_14px_rgba(0,255,160,0.25)] hover:border-cyan-400 hover:backdrop-blur-md will-change-transform will-change-filter"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={40}
                height={40}
                className="mb-2 w-10 h-10"
              />
              <p className="text-sm font-semibold text-foreground">
                {tech.name}
              </p>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 w-40 px-2 py-1 text-xs text-center bg-muted/80 backdrop-blur-sm text-foreground rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                {tech.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};