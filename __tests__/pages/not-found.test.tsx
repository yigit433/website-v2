import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/app/[locale]/not-found";

describe("NotFoundPage", () => {
  it("renders 404 translation key", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders error message translation key", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("message")).toBeInTheDocument();
  });

  it("renders return to home translation key", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("returnHome")).toBeInTheDocument();
  });

  it("has a link pointing to home", () => {
    render(<NotFoundPage />);
    const link = screen.getByText("returnHome").closest("a");
    expect(link).toHaveAttribute("href", "/");
  });
});
