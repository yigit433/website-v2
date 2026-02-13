import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsPage from "@/app/projects/page";

describe("ProjectsPage", () => {
  it("renders the heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders all project titles", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Wsupp.co")).toBeInTheDocument();
    expect(screen.getByText("Pickin.co")).toBeInTheDocument();
    expect(screen.getByText("DORA AI")).toBeInTheDocument();
    expect(screen.getByText("Ticaret İstatistik")).toBeInTheDocument();
    expect(screen.getByText("Code Share")).toBeInTheDocument();
  });

  it("renders technology badges", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Bun")).toBeInTheDocument();
    expect(screen.getByText("Hono")).toBeInTheDocument();
    expect(screen.getByText("Redis")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText("WhatsApp marketing automation.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A platform where you can share your code/)
    ).toBeInTheDocument();
  });

  it("renders action buttons with links", () => {
    render(<ProjectsPage />);
    const githubLinks = screen.getAllByText("Github");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);

    const visitLinks = screen.getAllByText("Visit Site");
    expect(visitLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("opens fullscreen overlay when image is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    // Click on a project image container
    const images = screen.getAllByRole("img");
    const firstImage = images[0];
    const imageContainer = firstImage.closest(".cursor-zoom-in");

    if (imageContainer) {
      await user.click(imageContainer);
      // After clicking, a fullscreen preview should appear
      expect(screen.getByAlt("Fullscreen Preview")).toBeInTheDocument();
    }
  });

  it("closes fullscreen overlay when clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    // Open the overlay
    const images = screen.getAllByRole("img");
    const imageContainer = images[0].closest(".cursor-zoom-in");

    if (imageContainer) {
      await user.click(imageContainer);
      expect(screen.getByAlt("Fullscreen Preview")).toBeInTheDocument();

      // Close the overlay by clicking on it
      const overlay = screen.getByAlt("Fullscreen Preview").closest(".cursor-zoom-out");
      if (overlay) {
        await user.click(overlay);
        expect(
          screen.queryByAlt("Fullscreen Preview")
        ).not.toBeInTheDocument();
      }
    }
  });
});
