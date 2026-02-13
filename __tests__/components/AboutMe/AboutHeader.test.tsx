import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutHeader from "@/components/AboutMe/AboutHeader";

describe("AboutHeader", () => {
  it("renders the title translation key", () => {
    render(<AboutHeader />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders as an h2 element", () => {
    render(<AboutHeader />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("title");
  });
});
