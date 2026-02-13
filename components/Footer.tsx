"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen, MessageCircle } from "lucide-react";
import Config from "@/yigit433.config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  LinkedIn: Linkedin,
  Medium: BookOpen,
  Discord: MessageCircle,
};

export default function Footer() {
  const t = useTranslations("Footer");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-grey)]/20 py-8">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {Config.personal.socialAccounts.map((account) => {
            const Icon = iconMap[account.name];
            if (!Icon) return null;

            return (
              <motion.a
                key={account.name}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-grey)] hover:text-[color:var(--foreground)] transition-colors"
                whileHover={{ scale: 1.15 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>

        <p className="text-xs text-[color:var(--color-grey)]">
          {isMac ? "⌘K" : "Ctrl+K"} — {t("cmdkHint")}
        </p>

        <p className="text-xs text-[color:var(--color-grey)]">
          &copy; {year} {Config.siteName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
