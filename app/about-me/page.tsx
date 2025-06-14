"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import Config from "@/yigit433.config";

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

export default function AboutMe() {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-2 text-center text-gradient-animated"
            >
                About Me
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mb-4 mt-4"
            >
                <div
                    className="px-4 py-2 rounded-full text-sm font-bold shadow-md"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        color: "var(--btn-text)",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                >
                    Yiğit Efe Avcı
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mb-10"
            >
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl shadow-md transition duration-300"
                    style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
                >
                    <Mail className="w-6 h-6" />
                    <span className="text-sm font-semibold">yigit433.devs@gmail.com</span>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
                <div
                    className="md:col-span-2 p-6 rounded-2xl shadow-md"
                    style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
                >
                    <p className="text-lg leading-relaxed">
                        I am a statistics undergraduate with a strong interest in data science, software development, and statistical modeling. I specialize in transforming data into actionable insights using tools like Python, R, and SPSS.
                        <br /><br />
                        My technical focus extends to full-stack development, where I utilize technologies such as React, Next.js, Go, and PostgreSQL to build scalable, efficient, and user-centric web applications.
                    </p>

                    <ul className="mt-6 flex items-center justify-start space-x-4 flex-wrap">
                        {Config.personal.socialAccounts.map((account, i) => (
                            <li key={i}>
                                <motion.a
                                    href={account.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 rounded-md text-sm font-medium px-4 py-2 transition-all duration-300"
                                    style={{
                                        color: account.textColor,
                                        backgroundColor: account.color,
                                    }}
                                    initial={{ scale: 1 }}
                                    whileHover={{ boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)", scale: 1.08 }}
                                >
                                    <Image
                                        src={account.icon}
                                        alt={account.name}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                    <span>{account.name}</span>
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { label: "Location", value: "Türkiye" },
                        { label: "Education", value: "B.Sc. in Statistics" },
                        { label: "Backend Stack", value: "GoLang, PostgreSQL, Prisma" },
                        { label: "Frontend Stack", value: "Next.js, React, Tailwind CSS" },
                        { label: "Focus Areas", value: "CI/CD, Data Modeling, Statistical Computing" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                            style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
                        >
                            <p className="text-sm font-medium opacity-70">{item.label}</p>
                            <p className="text-base font-semibold">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

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
                        style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
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
        </section>
    );
}