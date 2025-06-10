"use client";

import { motion } from "framer-motion";

const education = [
  {
    school: "Istanbul Ticaret University",
    degree: "Bachelor's degree in Statistics",
    date: "2023 - Nowadays",
    description:
      "I focused on probability theory, data analysis, and regression modeling. I work with statistical tools like R, SPSS, and Python to produce data-driven insights.",
  },
  {
    school: "Ihsan Mermerci Anatolian High School",
    degree: "High School",
    date: "2018 - 2022",
    description: "Focus on Mathematics and Science",
  },
];

export default function EducationTimeline() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }} 
        className="text-3xl font-bold mb-8 text-center">
        Education Life
      </motion.h2>
      <div className="relative border-l-4 border-[color:var(--color-grey)] pl-6 space-y-12">
        {education.map((item, index) => {
          const isCurrent = item.date.includes("Nowadays");
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {isCurrent && (
                <span className="absolute w-4 h-4 bg-green-400 opacity-75 rounded-full animate-ping left-[-10px] top-2" />
              )}
              <div className="absolute w-4 h-4 bg-green-500 border-2 border-[color:var(--card-bg)] rounded-full left-[-10px] top-2 shadow" />

              <div
                className="relative p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
              >
                {/* Date Badge */}
                <span className="absolute right-4 top-4 text-xs font-medium text-gradient-animated">
                  {item.date}
                </span>

                <h3 className="text-xl font-semibold">{item.school}</h3>
                <p className="text-sm opacity-80">{item.degree}</p>
                <p className="mt-2 opacity-90">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}