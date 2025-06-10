"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  {
    name: "Framer Motion",
    icon: "/icons/framer-motion.svg",
    description: "Powerful animation library for React and modern UIs.",
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
    name: "Flutter",
    icon: "/icons/flutter.svg",
    description: "Cross-platform UI toolkit for building apps with Dart.",
  },
  {
    name: "Supabase",
    icon: "/icons/supabase.svg",
    description: "Open source Firebase alternative with Postgres.",
  },
  {
    name: "Docker",
    icon: "/icons/docker.svg",
    description: "Container platform for building and deploying applications.",
  },
  {
    name: "Prisma",
    icon: "/icons/prisma.svg",
    description: "Next-gen ORM for TypeScript and Node.js backed by a powerful query engine.",
  },
  {
    name: "MongoDB",
    icon: "/icons/mongodb.svg",
    description: "NoSQL database designed for high-volume JSON-like documents.",
  },
  {
    name: "PostgreSQL",
    icon: "/icons/postgresql.svg",
    description: "Advanced open-source relational database with SQL support.",
  },
];

export const TechStackHorizontal = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <h2 className="text-2xl font-bold px-2">Tech Stack</h2>
      <p className="text-muted-foreground text-sm min-[360px]:text-lg text-center max-w-lg">
        Core technologies I rely on throughout the design, development, and delivery lifecycle.
      </p>
      <div className="relative w-full max-w-6xl px-4">
        <div
          className="
            grid 
            place-items-center
            max-[360px]:grid-cols-1
            max-[550px]:grid-cols-2
            max-[940px]:grid-cols-3
            md:grid-cols-4
            xl:grid-cols-6
            gap-4 py-4"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{
                scale: 1.08,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ backgroundColor: "var(--card-bg)" }}
              className="relative group flex flex-col items-center justify-center text-center w-[130px] h-[130px] px-4 py-4 rounded-2xl border border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-background/60 hover:shadow-[0_0_14px_rgba(0,255,160,0.25)] hover:border-cyan-400 hover:backdrop-blur-md will-change-transform will-change-filter"
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
    </motion.div>
  );
};