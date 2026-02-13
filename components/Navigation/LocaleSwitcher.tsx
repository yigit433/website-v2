"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

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
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
