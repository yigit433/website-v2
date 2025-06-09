import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log(theme);

    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:scale-105 transition-transform shadow-md"
      aria-label="Tema değiştir"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 700, damping: 20 }}
          className="absolute"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-purple-300 drop-shadow-md" />
          ) : (
            <Sun className="w-5 h-5 text-orange-500 drop-shadow" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
export default ThemeToggle;