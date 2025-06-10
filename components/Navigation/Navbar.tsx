"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// import { AnimatePresence } from "framer-motion";

import Config from "../../yigit433.config";
import DesktopMenu from "./DesktopMenu";
// import MobileMenu from "./MobileMenu";
// import ToggleButton from "./ToggleButton";

const Navbar = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl shadow-md px-6 py-3 lg:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-yigit433-nightblue-light">
        {Config.siteName}
      </h1>

      <DesktopMenu
        routes={Config.routes}
        currentPath={pathname}
        router={router}
      />

      {/* <ToggleButton
        open={mobNavOpen}
        toggle={() => setMobNavOpen(!mobNavOpen)}
      />

      <AnimatePresence>
        {mobNavOpen && (
          <MobileMenu
            routes={Config.routes}
            currentPath={pathname}
            closeMenu={() => setMobNavOpen(false)}
            router={router}
          />
        )}
      </AnimatePresence> */}
    </nav>
  );
};

export default Navbar;