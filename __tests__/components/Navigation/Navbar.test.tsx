import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navigation/Navbar";

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
  },
}));

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getByText("yigit433")).toBeInTheDocument();
  });

  it("renders all route links via translation keys", () => {
    render(<Navbar />);
    // useTranslations mock returns the key as text
    expect(screen.getAllByText("home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("aboutMe").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("repositories").length).toBeGreaterThanOrEqual(1);
  });

  it("renders toggle button for mobile", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("opens mobile menu on toggle click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const homeLinks = screen.getAllByText("home");
    const initialCount = homeLinks.length;

    const buttons = screen.getAllByRole("button");
    const toggleButton = buttons[buttons.length - 1];
    await user.click(toggleButton);

    const homeLinksAfter = screen.getAllByText("home");
    expect(homeLinksAfter.length).toBeGreaterThan(initialCount);
  });
});
