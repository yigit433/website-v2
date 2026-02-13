import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DesktopMenu from "@/components/Navigation/DesktopMenu";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark"],
    systemTheme: "light",
  }),
}));

describe("DesktopMenu", () => {
  const routes = [
    { name: "Home", to: "/" },
    { name: "About me", to: "/about-me" },
    { name: "Projects", to: "/projects" },
  ];

  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
  };

  it("renders all route items", () => {
    render(
      <DesktopMenu routes={routes} currentPath="/" router={mockRouter} />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    render(
      <DesktopMenu routes={routes} currentPath="/" router={mockRouter} />
    );
    const themeButton = screen.getByRole("button", { name: "label" });
    expect(themeButton).toBeInTheDocument();
  });
});
