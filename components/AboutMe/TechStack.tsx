"use client";

import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';
import Image from 'next/image';

const techStackItems = [
    { name: "Framer Motion", icon: "/icons/framer-motion.svg", key: "framerMotion" },
    { name: "React", icon: "/icons/react.svg", key: "react" },
    { name: "Next.js", icon: "/icons/nextjs.svg", key: "nextjs" },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", key: "tailwindcss" },
    { name: "TypeScript", icon: "/icons/typescript.svg", key: "typescript" },
    { name: "GoLang", icon: "/icons/golang.svg", key: "golang" },
    { name: "Flutter", icon: "/icons/flutter.svg", key: "flutter" },
    { name: "Supabase", icon: "/icons/supabase.svg", key: "supabase" },
    { name: "Docker", icon: "/icons/docker.svg", key: "docker" },
    { name: "Prisma", icon: "/icons/prisma.svg", key: "prisma" },
    { name: "MongoDB", icon: "/icons/mongodb.svg", key: "mongodb" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", key: "postgresql" },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg", key: "tensorflow" },
    { name: "PyTorch", icon: "/icons/pytorch.svg", key: "pytorch" },
    { name: "Python", icon: "/icons/python.svg", key: "python" },
    { name: "Pandas", icon: "/icons/pandas.svg", key: "pandas" },
    { name: "Scikit-learn", icon: "/icons/scikit-learn.svg", key: "scikitlearn" },
    { name: "Jupyter", icon: "/icons/jupyter.svg", key: "jupyter" },
    { name: "OpenCV", icon: "/icons/opencv.svg", key: "opencv" },
    { name: "R", icon: "/icons/rlang.svg", key: "r" },
];

export default function TechStack() {
  const t = useTranslations("TechStack");
  const tAbout = useTranslations("AboutMe");

  return (
    <>
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-6 text-center text-gradient-animated"
      >
        {tAbout("techStackTitle")}
      </motion.h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
        {techStackItems.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className="mb-2 w-10 h-10"
            />
            <h4 className="font-semibold">{tech.name}</h4>
            <p className="text-sm opacity-70 mt-1">{t(tech.key)}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
