import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectTimeline from "@/components/Projects/ProjectTimeline";
import type { Milestone } from "@/data/projects";

const milestones: Milestone[] = [
  { date: "2024-01", labelKey: "milestone1" },
  { date: "2024-06", labelKey: "milestone2" },
  { date: "2024-12", labelKey: "milestone3" },
];

describe("ProjectTimeline", () => {
  it("renders the timeline heading", () => {
    render(
      <ProjectTimeline startDate="2024-01" milestones={milestones} />
    );
    expect(screen.getByText("projectTimeline")).toBeInTheDocument();
  });

  it("renders the project start node", () => {
    render(
      <ProjectTimeline startDate="2024-01" milestones={milestones} />
    );
    expect(screen.getByText("timelineStart")).toBeInTheDocument();
    expect(screen.getAllByText("2024-01")).toHaveLength(2); // startDate + first milestone
  });

  it("renders all milestone labels", () => {
    render(
      <ProjectTimeline startDate="2024-01" milestones={milestones} />
    );
    expect(screen.getByText("milestones.milestone1")).toBeInTheDocument();
    expect(screen.getByText("milestones.milestone2")).toBeInTheDocument();
    expect(screen.getByText("milestones.milestone3")).toBeInTheDocument();
  });

  it("renders milestone dates", () => {
    render(
      <ProjectTimeline startDate="2024-01" milestones={milestones} />
    );
    expect(screen.getByText("2024-06")).toBeInTheDocument();
    expect(screen.getByText("2024-12")).toBeInTheDocument();
  });

  it("returns null when milestones is empty", () => {
    const { container } = render(
      <ProjectTimeline startDate="2024-01" milestones={[]} />
    );
    expect(container.innerHTML).toBe("");
  });
});
