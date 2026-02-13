import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navigation/Navbar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark"],
    systemTheme: "light",
  }),
}));

vi.mock("@/yigit433.config", () => ({
  default: {
    siteName: "yigit433",
    routes: [
      { name: "Home", to: "/" },
      { name: "About me", to: "/about-me" },
      { name: "Projects", to: "/projects" },
      { name: "Repositories", to: "/repositories" },
    ],
  },
}));

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getByText("yigit433")).toBeInTheDocument();
  });

  it("renders all route links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Repositories")).toBeInTheDocument();
  });

  it("renders toggle button for mobile", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("opens mobile menu on toggle click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // The ToggleButton should be present - it's the button outside the nav items
    // Initially mobile menu items are rendered once (desktop)
    const homeLinks = screen.getAllByText("Home");
    const initialCount = homeLinks.length;

    // Find and click the toggle button (it contains Menu/X icon)
    const buttons = screen.getAllByRole("button");
    // The toggle button is the last button (after nav items and theme toggle)
    const toggleButton = buttons[buttons.length - 1];
    await user.click(toggleButton);

    // After opening, mobile menu should add duplicate route items
    const homeLinksAfter = screen.getAllByText("Home");
    expect(homeLinksAfter.length).toBeGreaterThan(initialCount);
  });
});
