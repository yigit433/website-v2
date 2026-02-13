"use client";

import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { getAllTechnologies } from "@/data/projects";

interface TechFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTechs: string[];
  onToggleTech: (tech: string) => void;
  onClearFilters: () => void;
}

export default function TechFilter({
  searchQuery,
  onSearchChange,
  selectedTechs,
  onToggleTech,
  onClearFilters,
}: TechFilterProps) {
  const t = useTranslations("Projects");
  const allTechs = getAllTechnologies();
  const hasActiveFilters = searchQuery.length > 0 || selectedTechs.length > 0;

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-shadow focus:ring-2 focus:ring-green-500/50"
          style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium opacity-60">{t("filterByTech")}</span>
        {allTechs.map((tech) => {
          const isSelected = selectedTechs.includes(tech);
          return (
            <button
              key={tech}
              onClick={() => onToggleTech(tech)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                isSelected
                  ? "bg-green-500 text-white shadow-sm"
                  : "opacity-60 hover:opacity-80 border border-current"
              }`}
              style={
                !isSelected
                  ? { backgroundColor: "var(--card-bg)", color: "var(--foreground)" }
                  : undefined
              }
            >
              {tech}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md text-red-500 hover:text-red-400 transition-colors"
          >
            <X className="w-3 h-3" />
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}
