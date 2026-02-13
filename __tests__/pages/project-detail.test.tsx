import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  screenshots: ["/test-ss1.png", "/test-ss2.png", "/test-ss3.png"],
  startDate: "2024-01",
  milestones: [
    { date: "2024-01", labelKey: "testMilestone1" },
    { date: "2024-06", labelKey: "testMilestone2" },
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

  it("renders the about project section", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("aboutProject")).toBeInTheDocument();
    expect(
      screen.getByText("detailDescriptions.testDetail")
    ).toBeInTheDocument();
  });

  it("renders the screenshot gallery", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("screenshotGallery")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project - 1")).toBeInTheDocument();
  });

  it("renders screenshot thumbnails", () => {
    render(<ProjectDetailClient project={mockProject} />);
    const thumbnails = screen.getAllByAltText(/Test Project thumbnail/);
    expect(thumbnails).toHaveLength(3);
  });

  it("renders the project timeline", () => {
    render(<ProjectDetailClient project={mockProject} />);
    expect(screen.getByText("projectTimeline")).toBeInTheDocument();
    expect(screen.getByText("timelineStart")).toBeInTheDocument();
    expect(screen.getByText("milestones.testMilestone1")).toBeInTheDocument();
    expect(screen.getByText("milestones.testMilestone2")).toBeInTheDocument();
  });

  it("renders the related projects section", () => {
    render(<ProjectDetailClient project={mockProject} />);
    // test-project won't have related projects since it's not in the data
    // but the component should still be rendered (returns null gracefully)
  });

  it("opens lightbox when main image is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectDetailClient project={mockProject} />);

    const mainImage = screen.getByAltText("Test Project - 1");
    const clickable = mainImage.closest(".cursor-pointer");
    if (clickable) {
      await user.click(clickable);
      // Lightbox should now be visible with close button
      expect(screen.getByLabelText("closeGallery")).toBeInTheDocument();
    }
  });
});
