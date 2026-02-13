import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsPage from "@/app/[locale]/projects/page";
import { projects } from "@/data/projects";

describe("ProjectsPage", () => {
  it("renders the heading translation key", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders all project titles as links", () => {
    render(<ProjectsPage />);
    for (const project of projects) {
      const link = screen.getByRole("link", { name: project.title });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/projects/${project.slug}`);
    }
  });

  it("renders technology badges", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Bun")).toBeInTheDocument();
    expect(screen.getByText("Hono")).toBeInTheDocument();
    expect(screen.getByText("Redis")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders project description translation keys", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("descriptions.wsupp")).toBeInTheDocument();
    expect(screen.getByText("descriptions.pickin")).toBeInTheDocument();
  });

  it("renders action buttons with translation keys", () => {
    render(<ProjectsPage />);
    const githubLinks = screen.getAllByText("github");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);

    const visitLinks = screen.getAllByText("visitSite");
    expect(visitLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("opens fullscreen overlay when image is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const images = screen.getAllByRole("img");
    const firstImage = images[0];
    const imageContainer = firstImage.closest(".cursor-zoom-in");

    if (imageContainer) {
      await user.click(imageContainer);
      expect(screen.getByAltText("Fullscreen Preview")).toBeInTheDocument();
    }
  });

  it("closes fullscreen overlay when clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const images = screen.getAllByRole("img");
    const imageContainer = images[0].closest(".cursor-zoom-in");

    if (imageContainer) {
      await user.click(imageContainer);
      expect(screen.getByAltText("Fullscreen Preview")).toBeInTheDocument();

      const overlay = screen.getByAltText("Fullscreen Preview").closest(".cursor-zoom-out");
      if (overlay) {
        await user.click(overlay);
        expect(
          screen.queryByAltText("Fullscreen Preview")
        ).not.toBeInTheDocument();
      }
    }
  });
});
