"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeData: Record<string, { label: string; flag: string }> = {
  tr: { label: "TR", flag: "\u{1F1F9}\u{1F1F7}" },
  en: { label: "EN", flag: "\u{1F1EC}\u{1F1E7}" },
  de: { label: "DE", flag: "\u{1F1E9}\u{1F1EA}" },
};

export default function LocaleSwitcher({ mobile = false }: { mobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (mobile) {
    return (
      <div className="flex items-center gap-1">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            className={`px-2 py-1 text-xs font-bold rounded transition-opacity ${
              locale === loc ? "opacity-100" : "opacity-50 hover:opacity-75"
            }`}
            style={{
              backgroundColor: locale === loc ? "var(--btn-hover-bg)" : "var(--btn-bg)",
              color: locale === loc ? "var(--btn-hover-text)" : "var(--btn-text)",
            }}
          >
            <span className="mr-1">{localeData[loc].flag}</span>
            {localeData[loc].label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
        style={{
          backgroundColor: "var(--btn-bg)",
          color: "var(--btn-text)",
        }}
      >
        <span className="text-base leading-none">{localeData[locale].flag}</span>
        <span>{localeData[locale].label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-xl shadow-lg border border-white/10 backdrop-blur-xl overflow-hidden z-50"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleChange(loc)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors duration-150 ${
                locale === loc
                  ? "font-semibold opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor: locale === loc ? "var(--btn-hover-bg)" : "transparent",
                color: locale === loc ? "var(--btn-hover-text)" : "var(--foreground)",
              }}
            >
              <span className="text-lg leading-none">{localeData[loc].flag}</span>
              <span>{localeData[loc].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
