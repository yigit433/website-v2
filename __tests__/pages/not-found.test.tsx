import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/app/not-found";

describe("NotFoundPage", () => {
  it("renders 404 text", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(/This page wandered into the digital wilderness/)
    ).toBeInTheDocument();
  });

  it("renders return to home link", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("Return to Home")).toBeInTheDocument();
  });

  it("has a link pointing to home", () => {
    render(<NotFoundPage />);
    const link = screen.getByText("Return to Home").closest("a");
    expect(link).toHaveAttribute("href", "/");
  });
});
