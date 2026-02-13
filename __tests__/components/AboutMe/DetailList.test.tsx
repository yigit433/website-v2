import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailList from "@/components/AboutMe/DetailList";

describe("DetailList", () => {
  it("renders all detail labels", () => {
    render(<DetailList />);
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Backend Stack")).toBeInTheDocument();
    expect(screen.getByText("Frontend Stack")).toBeInTheDocument();
    expect(screen.getByText("Focus Areas")).toBeInTheDocument();
  });

  it("renders all detail values", () => {
    render(<DetailList />);
    expect(screen.getByText("Türkiye")).toBeInTheDocument();
    expect(screen.getByText("B.Sc. in Statistics")).toBeInTheDocument();
    expect(
      screen.getByText("GoLang, PostgreSQL, Prisma")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Next.js, React, Tailwind CSS")
    ).toBeInTheDocument();
    expect(
      screen.getByText("CI/CD, Data Modeling, Statistical Computing")
    ).toBeInTheDocument();
  });

  it("renders 5 detail items", () => {
    const { container } = render(<DetailList />);
    const items = container.querySelectorAll(".rounded-xl");
    expect(items.length).toBe(5);
  });
});
