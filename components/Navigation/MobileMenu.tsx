import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import NavItem from "./NavItem";

type Props = {
  routes: { name: string; to: string }[];
  currentPath: string;
  closeMenu: () => void;
  router: ReturnType<typeof useRouter>;
};

const MobileMenu = ({ routes, currentPath, closeMenu, router }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="absolute top-full left-0 w-full backdrop-blur-xl bg-[var(--card-bg)]/80 border-t border-white/10 shadow-lg rounded-b-xl z-40"
  >
    <ul className="flex flex-col py-4 px-6 space-y-2">
      {routes.map((route, i) => (
        <li key={i}>
          <NavItem
            route={route}
            isActive={currentPath === route.to}
            onClick={() => {
              closeMenu();
              router.push(route.to);
            }}
            isMobile
          />
        </li>
      ))}
    </ul>
  </motion.div>
);

export default MobileMenu;