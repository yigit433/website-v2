"use client";

import { useCallback, useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

export default function CommandPaletteProvider() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
