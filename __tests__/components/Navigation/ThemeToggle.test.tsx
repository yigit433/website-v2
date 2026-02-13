import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/Navigation/ThemeToggle";

const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    resolvedTheme: "light",
    themes: ["light", "dark"],
    systemTheme: "light",
  }),
}));

describe("ThemeToggle", () => {
  it("renders the theme toggle button", () => {
    render(<ThemeToggle />);
    // The aria-label comes from the translation key "label"
    const button = screen.getByRole("button", { name: "label" });
    expect(button).toBeInTheDocument();
  });

  it("calls setTheme with 'dark' when clicked in light mode", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "label" });
    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
