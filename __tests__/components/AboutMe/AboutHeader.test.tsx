import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutHeader from "@/components/AboutMe/AboutHeader";

describe("AboutHeader", () => {
  it("renders 'About Me' text", () => {
    render(<AboutHeader />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders as an h2 element", () => {
    render(<AboutHeader />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("About Me");
  });
});
