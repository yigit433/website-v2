import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailList from "@/components/AboutMe/DetailList";

describe("DetailList", () => {
  it("renders all detail labels", () => {
    render(<DetailList />);
    expect(screen.getByText("location")).toBeInTheDocument();
    expect(screen.getByText("education")).toBeInTheDocument();
    expect(screen.getByText("backendStack")).toBeInTheDocument();
    expect(screen.getByText("frontendStack")).toBeInTheDocument();
    expect(screen.getByText("focusAreas")).toBeInTheDocument();
  });

  it("renders all detail values", () => {
    render(<DetailList />);
    expect(screen.getByText("locationValue")).toBeInTheDocument();
    expect(screen.getByText("educationValue")).toBeInTheDocument();
    expect(screen.getByText("backendStackValue")).toBeInTheDocument();
    expect(screen.getByText("frontendStackValue")).toBeInTheDocument();
    expect(screen.getByText("focusAreasValue")).toBeInTheDocument();
  });

  it("renders 5 detail items", () => {
    const { container } = render(<DetailList />);
    const items = container.querySelectorAll(".rounded-xl");
    expect(items.length).toBe(5);
  });
});
