import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  toggle: () => void;
};

const ToggleButton = ({ open, toggle }: Props) => (
  <motion.button
    onClick={toggle}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    className="block md:hidden p-2 rounded-lg shadow-md backdrop-blur-sm border border-white/20 transition-colors duration-300"
    style={{
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "var(--foreground)",
    }}
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={open ? "close" : "menu"}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </motion.span>
    </AnimatePresence>
  </motion.button>
);

export default ToggleButton;