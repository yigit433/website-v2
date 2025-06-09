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
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute top-full left-0 w-full bg-yigit433-nightblue-dark flex flex-col items-center px-6 py-4 block mdhidden"
  >
    {routes.map((route, i) => (
      <NavItem
        key={i}
        route={route}
        isActive={currentPath === route.to}
        onClick={() => {
          closeMenu();
          router.push(route.to);
        }}
        isMobile
      />
    ))}
  </motion.div>
);

export default MobileMenu;