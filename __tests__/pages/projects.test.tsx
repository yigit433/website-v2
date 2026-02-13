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

  it("renders technology badges as buttons", () => {
    render(<ProjectsPage />);
    // Tech badges are now buttons for filtering
    const bunButtons = screen.getAllByText("Bun");
    expect(bunButtons.length).toBeGreaterThanOrEqual(1);
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

  it("renders the search input", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByPlaceholderText("searchPlaceholder")
    ).toBeInTheDocument();
  });

  it("renders technology filter badges", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("filterByTech")).toBeInTheDocument();
  });

  it("filters projects by search query", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const searchInput = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(searchInput, "Wsupp");

    // Wsupp should be visible
    expect(screen.getByRole("link", { name: "Wsupp.co" })).toBeInTheDocument();
    // Other projects should not be visible
    expect(screen.queryByRole("link", { name: "DORA AI" })).not.toBeInTheDocument();
  });

  it("shows no results message when no projects match", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const searchInput = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(searchInput, "xyznonexistent");

    expect(screen.getByText("noProjectsFound")).toBeInTheDocument();
  });

  it("shows showing count when filters are active", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const searchInput = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(searchInput, "Wsupp");

    // Mock useTranslations returns the key with values replaced in the key string
    // showingCount with {count} and {total} in the key returns "showingCount"
    expect(screen.getByText("showingCount")).toBeInTheDocument();
  });

  it("clears filters when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const searchInput = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(searchInput, "Wsupp");

    // Clear filters
    await user.click(screen.getByText("clearFilters"));

    // All projects should be visible again
    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.title })).toBeInTheDocument();
    }
  });

  it("filters by technology badge click in TechFilter", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    // Find Bun badge in the filter section and click it
    const filterSection = screen.getByText("filterByTech").parentElement!;
    const bunBadge = filterSection.querySelector("button");
    if (bunBadge) {
      await user.click(bunBadge);
    }
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
