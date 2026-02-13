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

function CommandItem({
  cmd,
  isSelected,
  onSelect,
  onHover,
}: {
  cmd: Command;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <div
      data-command-item
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`
        flex items-center gap-3 mx-2 px-3 py-2 rounded-lg cursor-pointer
        transition-colors duration-75 select-none
        ${
          isSelected
            ? "bg-[#007AFF] text-white"
            : "text-[color:var(--foreground)] hover:bg-[var(--card-bg)]"
        }
      `}
    >
      <span
        className={`flex-shrink-0 ${isSelected ? "opacity-100" : "opacity-60"}`}
      >
        {cmd.icon}
      </span>
      <span className="text-[13px] font-medium truncate">{cmd.label}</span>
    </div>
  );
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
        icon: <Home className="w-[18px] h-[18px]" />,
        label: navT("home"),
        keywords: "home ana sayfa startseite ballina",
        section: "navigation",
        action: () => router.push("/"),
      },
      {
        id: "nav-about",
        icon: <User className="w-[18px] h-[18px]" />,
        label: navT("aboutMe"),
        keywords: "about hakkımda über mich rreth meje",
        section: "navigation",
        action: () => router.push("/about-me"),
      },
      {
        id: "nav-projects",
        icon: <FolderOpen className="w-[18px] h-[18px]" />,
        label: navT("projects"),
        keywords: "projects projeler projekte projektet",
        section: "navigation",
        action: () => router.push("/projects"),
      },
      {
        id: "nav-repos",
        icon: <Code className="w-[18px] h-[18px]" />,
        label: navT("repositories"),
        keywords: "repositories depolar repos depot",
        section: "navigation",
        action: () => router.push("/repositories"),
      },
    ];

    const actions: Command[] = [
      {
        id: "theme-toggle",
        icon:
          theme === "dark" ? (
            <Sun className="w-[18px] h-[18px]" />
          ) : (
            <Moon className="w-[18px] h-[18px]" />
          ),
        label: theme === "dark" ? t("toggleLight") : t("toggleDark"),
        keywords:
          "theme dark light tema karanlık aydınlık thema dunkel hell",
        section: "actions",
        action: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      ...routing.locales
        .filter((loc) => loc !== locale)
        .map((loc) => ({
          id: `locale-${loc}`,
          icon: <Languages className="w-[18px] h-[18px]" />,
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

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

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
        setSelectedIndex((i) =>
          (i - 1 + filtered.length) % filtered.length
        );
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
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[min(20vh,180px)] bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="command-palette w-full max-w-[560px] mx-4 rounded-2xl overflow-hidden"
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-grey)]/20">
              <Search className="w-5 h-5 opacity-40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent outline-none text-[15px] text-[color:var(--foreground)] placeholder:text-[color:var(--color-grey)]"
              />
              <kbd className="hidden sm:inline-flex items-center text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--card-bg)] text-[color:var(--color-grey)] border border-[var(--color-grey)]/20">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              role="listbox"
              className="max-h-[320px] overflow-y-auto py-1.5 scroll-smooth"
            >
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-[13px] text-[color:var(--color-grey)]">
                  {t("noResults")}
                </p>
              )}

              {navItems.length > 0 && (
                <div className="pb-1">
                  <p className="px-5 pt-2 pb-1.5 text-[11px] uppercase tracking-wider font-semibold text-[color:var(--color-grey)]">
                    {t("navigation")}
                  </p>
                  {navItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <CommandItem
                        key={cmd.id}
                        cmd={cmd}
                        isSelected={globalIdx === selectedIndex}
                        onSelect={() => runCommand(cmd)}
                        onHover={() => setSelectedIndex(globalIdx)}
                      />
                    );
                  })}
                </div>
              )}

              {actionItems.length > 0 && (
                <div className="pb-1">
                  {navItems.length > 0 && (
                    <div className="mx-3 my-1 border-t border-[var(--color-grey)]/15" />
                  )}
                  <p className="px-5 pt-2 pb-1.5 text-[11px] uppercase tracking-wider font-semibold text-[color:var(--color-grey)]">
                    {t("actions")}
                  </p>
                  {actionItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <CommandItem
                        key={cmd.id}
                        cmd={cmd}
                        isSelected={globalIdx === selectedIndex}
                        onSelect={() => runCommand(cmd)}
                        onHover={() => setSelectedIndex(globalIdx)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-[var(--color-grey)]/15 text-[11px] text-[color:var(--color-grey)]">
              <div className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-[var(--card-bg)] border border-[var(--color-grey)]/20 text-[10px]">
                  ↑
                </kbd>
                <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-[var(--card-bg)] border border-[var(--color-grey)]/20 text-[10px]">
                  ↓
                </kbd>
                <span className="ml-0.5">{t("navigate")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded bg-[var(--card-bg)] border border-[var(--color-grey)]/20 text-[10px]">
                  ↵
                </kbd>
                <span>{t("select")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
