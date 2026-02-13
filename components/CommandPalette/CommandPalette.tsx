"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { routing } from "@/i18n/routing";
import {
  Home,
  User,
  FolderOpen,
  Code,
  Sun,
  Moon,
  Languages,
  Search,
} from "lucide-react";
import { useLocale } from "next-intl";

interface Command {
  id: string;
  icon: React.ReactNode;
  label: string;
  keywords: string;
  section: "navigation" | "actions";
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("CommandPalette");
  const navT = useTranslations("Navigation");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      {
        id: "nav-home",
        icon: <Home className="w-4 h-4" />,
        label: navT("home"),
        keywords: "home ana sayfa startseite ballina",
        section: "navigation",
        action: () => router.push("/"),
      },
      {
        id: "nav-about",
        icon: <User className="w-4 h-4" />,
        label: navT("aboutMe"),
        keywords: "about hakkımda über mich rreth meje",
        section: "navigation",
        action: () => router.push("/about-me"),
      },
      {
        id: "nav-projects",
        icon: <FolderOpen className="w-4 h-4" />,
        label: navT("projects"),
        keywords: "projects projeler projekte projektet",
        section: "navigation",
        action: () => router.push("/projects"),
      },
      {
        id: "nav-repos",
        icon: <Code className="w-4 h-4" />,
        label: navT("repositories"),
        keywords: "repositories depolar repos depot",
        section: "navigation",
        action: () => router.push("/repositories"),
      },
    ];

    const actions: Command[] = [
      {
        id: "theme-toggle",
        icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
        label: theme === "dark" ? t("toggleLight") : t("toggleDark"),
        keywords: "theme dark light tema karanlık aydınlık thema dunkel hell",
        section: "actions",
        action: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      ...routing.locales
        .filter((loc) => loc !== locale)
        .map((loc) => ({
          id: `locale-${loc}`,
          icon: <Languages className="w-4 h-4" />,
          label: `${t("switchLocale")} — ${loc.toUpperCase()}`,
          keywords: `language dil sprache gjuhë locale ${loc}`,
          section: "actions" as const,
          action: () => router.push(pathname, { locale: loc }),
        })),
    ];

    return [...nav, ...actions];
  }, [navT, t, theme, locale, pathname, router, setTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.keywords.toLowerCase().includes(q)
    );
  }, [query, commands]);

  const navItems = filtered.filter((c) => c.section === "navigation");
  const actionItems = filtered.filter((c) => c.section === "actions");

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      // Slight delay to ensure portal is mounted
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-command-item]");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const runCommand = useCallback(
    (cmd: Command) => {
      onClose();
      cmd.action();
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        runCommand(filtered[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [filtered, selectedIndex, runCommand, onClose]
  );

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl shadow-2xl border border-[var(--btn-bg)] bg-[var(--background)] overflow-hidden"
            style={{ background: "var(--background)" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--btn-bg)]">
              <Search className="w-4 h-4 opacity-50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent outline-none text-sm text-[color:var(--foreground)] placeholder:opacity-50"
              />
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--btn-bg)] opacity-50">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-sm opacity-50">
                  {t("noResults")}
                </p>
              )}

              {navItems.length > 0 && (
                <div>
                  <p className="px-4 py-1 text-[10px] uppercase tracking-wider font-semibold opacity-40">
                    {t("navigation")}
                  </p>
                  {navItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        data-command-item
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                          globalIdx === selectedIndex
                            ? "bg-[var(--btn-hover-bg)] text-[var(--btn-hover-text)]"
                            : "text-[color:var(--foreground)]"
                        }`}
                      >
                        {cmd.icon}
                        {cmd.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {actionItems.length > 0 && (
                <div>
                  <p className="px-4 py-1 text-[10px] uppercase tracking-wider font-semibold opacity-40">
                    {t("actions")}
                  </p>
                  {actionItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        data-command-item
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                          globalIdx === selectedIndex
                            ? "bg-[var(--btn-hover-bg)] text-[var(--btn-hover-text)]"
                            : "text-[color:var(--foreground)]"
                        }`}
                      >
                        {cmd.icon}
                        {cmd.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
