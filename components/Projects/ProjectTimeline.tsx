"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Milestone } from "@/data/projects";

interface ProjectTimelineProps {
  startDate: string;
  milestones: Milestone[];
}

export default function ProjectTimeline({
  startDate,
  milestones,
}: ProjectTimelineProps) {
  const t = useTranslations("Projects");

  if (milestones.length === 0) return null;

  const lastIndex = milestones.length - 1;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        {t("projectTimeline")}
      </h2>

      <div className="relative border-l-4 border-[color:var(--color-grey)] pl-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="absolute w-4 h-4 bg-green-500 border-2 border-[color:var(--card-bg)] rounded-full left-[-34px] top-2 shadow" />
          <div
            className="p-4 rounded-xl shadow-md"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
          >
            <span className="text-xs font-medium text-gradient-animated">
              {startDate}
            </span>
            <p className="text-sm mt-1 opacity-90">{t("timelineStart")}</p>
          </div>
        </motion.div>

        {milestones.map((milestone, index) => {
          const isLast = index === lastIndex;
          return (
            <motion.div
              key={milestone.labelKey}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: (index + 1) * 0.15 }}
              className="relative"
            >
              {isLast && (
                <span className="absolute w-4 h-4 bg-green-400 opacity-75 rounded-full animate-ping left-[-34px] top-2" />
              )}
              <div
                className={`absolute w-4 h-4 rounded-full border-2 border-[color:var(--card-bg)] left-[-34px] top-2 shadow ${
                  isLast ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <div
                className="p-4 rounded-xl shadow-md"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
              >
                <span className="text-xs font-medium text-gradient-animated">
                  {milestone.date}
                </span>
                <p className="text-sm mt-1 opacity-90">
                  {t(`milestones.${milestone.labelKey}`)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
