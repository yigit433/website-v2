"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getRelatedProjects } from "@/data/projects";

interface RelatedProjectsProps {
  currentSlug: string;
}

export default function RelatedProjects({ currentSlug }: RelatedProjectsProps) {
  const t = useTranslations("Projects");
  const related = getRelatedProjects(currentSlug);

  if (related.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">{t("relatedProjects")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 14,
              delay: i * 0.1,
            }}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded bg-[color:var(--btn-bg)] text-[color:var(--btn-text)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
