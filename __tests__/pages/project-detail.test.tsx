import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";
import type { Project } from "@/data/projects";

const mockProject: Project = {
  title: "Test Project",
  slug: "test-project",
  descriptionKey: "testDesc",
  detailDescriptionKey: "testDetail",
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  image: "/test-banner.png",
  buttons: [
    { nameKey: "github", to: "https://github.com/test" },
    { nameKey: "visitSite", to: "https://test.com" },
  ],
};

describe("ProjectDetailClient", () => {
  it("renders the project title", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the back to projects link", () => {
    render(<ProjectDetailClient project={mockProject} />);
    const backLink = screen.getByText("backToProjects");
    expect(backLink.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("renders all technology badges", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<ProjectDetailClient project={mockProject} />);
    const githubLink = screen.getByText("github").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");

    const visitLink = screen.getByText("visitSite").closest("a");
    expect(visitLink).toHaveAttribute("href", "https://test.com");
  });

  it("renders the hero image", () => {
    render(<ProjectDetailClient project={mockProject} />);
    const img = screen.getByAltText("Test Project");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-banner.png");
  });

  it("renders the about project section", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("aboutProject")).toBeInTheDocument();
    expect(
      screen.getByText("detailDescriptions.testDetail")
    ).toBeInTheDocument();
  });
});
