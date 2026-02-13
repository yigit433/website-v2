import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationTimeline from "@/components/Home/EducationTimeline";

describe("EducationTimeline", () => {
  it("renders the section heading", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("Education Life")).toBeInTheDocument();
  });

  it("renders all education entries", () => {
    render(<EducationTimeline />);
    expect(
      screen.getByText("Istanbul Ticaret University")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ihsan Mermerci Anatolian High School")
    ).toBeInTheDocument();
  });

  it("renders degree information", () => {
    render(<EducationTimeline />);
    expect(
      screen.getByText("Bachelor's degree in Statistics")
    ).toBeInTheDocument();
    expect(screen.getByText("High School")).toBeInTheDocument();
  });

  it("renders date badges", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("2023 - Nowadays")).toBeInTheDocument();
    expect(screen.getByText("2018 - 2022")).toBeInTheDocument();
  });

  it("renders descriptions", () => {
    render(<EducationTimeline />);
    expect(
      screen.getByText(/probability theory, data analysis/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Focus on Mathematics and Science")
    ).toBeInTheDocument();
  });
});
