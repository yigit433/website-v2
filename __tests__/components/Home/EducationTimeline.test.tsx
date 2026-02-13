import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationTimeline from "@/components/Home/EducationTimeline";

describe("EducationTimeline", () => {
  it("renders the section heading translation key", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders education school keys", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("items.university.school")).toBeInTheDocument();
    expect(screen.getByText("items.highSchool.school")).toBeInTheDocument();
  });

  it("renders degree keys", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("items.university.degree")).toBeInTheDocument();
    expect(screen.getByText("items.highSchool.degree")).toBeInTheDocument();
  });

  it("renders date keys", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("items.university.date")).toBeInTheDocument();
    expect(screen.getByText("items.highSchool.date")).toBeInTheDocument();
  });
});
