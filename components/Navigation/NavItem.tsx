"use client";

import { motion } from "framer-motion";

type Props = {
  route: { name: string; to: string };
  isActive: boolean;
  onClick?: () => void;
  router?: { push: (href: string) => void };
  isMobile?: boolean;
};

const NavItem = ({ route, isActive, onClick, router, isMobile = false }: Props) => {
  const handleClick = () => {
    if (onClick) onClick();
    else router?.push(route.to);
  };

  const baseShadow = isActive
    ? "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 12px rgba(195, 228, 248, 0.5)"
    : "0 2px 8px rgba(0, 0, 0, 0.05)";

  return (
    <motion.button
      className={`rounded-md px-4 py-2 font-medium transition-all duration-300 ${
        isMobile ? "w-full text-left" : "text-lg"
      }`}
      style={{
        backgroundColor: isActive ? "var(--btn-hover-bg)" : "var(--btn-bg)",
        color: isActive ? "var(--btn-hover-text)" : "var(--btn-text)",
        borderRadius: "0.5rem",
        padding: "0.6rem 1.4rem",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: baseShadow,
      }}
      whileHover={{
        scale: 1.03,
        backgroundColor: "var(--btn-hover-bg)",
        color: "var(--btn-hover-text)",
        boxShadow:
          "0 6px 14px rgba(0, 0, 0, 0.12), 0 0 16px rgba(195, 228, 248, 0.6)",
      }}
      animate={{
        scale: isActive ? 0.97 : 1,
        transition: { duration: 0.3 },
      }}
      onClick={handleClick}
    >
      {route.name}
    </motion.button>
  );
};

export default NavItem;
