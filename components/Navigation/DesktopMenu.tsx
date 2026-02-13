import NavItem from "./NavItem";
import ThemeButton from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

type Props = {
  routes: { name: string; to: string }[];
  currentPath: string;
  router: { push: (href: string) => void };
};

const DesktopMenu = ({ routes, currentPath, router }: Props) => (
  <ul className="max-[940px]:hidden block flex items-center gap-4">
    {routes.map((route, i) => (
      <NavItem key={i} route={route} isActive={currentPath === route.to} router={router} />
    ))}
    <LocaleSwitcher />
    <ThemeButton />
  </ul>
);

export default DesktopMenu;
