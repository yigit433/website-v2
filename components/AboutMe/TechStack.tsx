"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const techStack = [
    { name: "Framer Motion", icon: "/icons/framer-motion.svg", description: "Animation library for React." },
    { name: "React", icon: "/icons/react.svg", description: "Library for building interactive UIs." },
    { name: "Next.js", icon: "/icons/nextjs.svg", description: "Fullstack React framework." },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", description: "Utility-first CSS framework." },
    { name: "TypeScript", icon: "/icons/typescript.svg", description: "Statically typed JavaScript." },
    { name: "GoLang", icon: "/icons/golang.svg", description: "Compiled backend language." },
    { name: "Flutter", icon: "/icons/flutter.svg", description: "UI toolkit for cross-platform apps." },
    { name: "Supabase", icon: "/icons/supabase.svg", description: "Open-source Firebase alternative." },
    { name: "Docker", icon: "/icons/docker.svg", description: "Containerization platform." },
    { name: "Prisma", icon: "/icons/prisma.svg", description: "ORM for TypeScript and SQL." },
    { name: "MongoDB", icon: "/icons/mongodb.svg", description: "NoSQL database." },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", description: "Relational SQL database." },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg", description: "Machine learning library." },
    { name: "PyTorch", icon: "/icons/pytorch.svg", description: "Deep learning framework." },
    { name: "Python", icon: "/icons/python.svg", description: "General-purpose programming language." },
    { name: "Pandas", icon: "/icons/pandas.svg", description: "Data manipulation library for Python." },
    { name: "Scikit-learn", icon: "/icons/scikit-learn.svg", description: "Machine learning in Python." },
    { name: "Jupyter", icon: "/icons/jupyter.svg", description: "Interactive notebooks for Python and data science." },
    { name: "OpenCV", icon: "/icons/opencv.svg", description: "Computer vision library." },
    { name: "R", icon: "/icons/rlang.svg", description: "Statistical computing and graphics language." }
];

export default function TechStack() {
  return (
    <>
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-6 text-center text-gradient-animated"
      >
        Technology Stack
      </motion.h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
        {techStack.map((tech, index) => (
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
            <p className="text-sm opacity-70 mt-1">{tech.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}