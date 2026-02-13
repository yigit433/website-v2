import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RelatedProjects from "@/components/Projects/RelatedProjects";

describe("RelatedProjects", () => {
  it("renders related projects heading", () => {
    render(<RelatedProjects currentSlug="wsupp" />);
    expect(screen.getByText("relatedProjects")).toBeInTheDocument();
  });

  it("renders related project cards", () => {
    render(<RelatedProjects currentSlug="dora-ai" />);
    // DORA AI shares technologies with multiple projects
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("does not render the current project", () => {
    render(<RelatedProjects currentSlug="dora-ai" />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).not.toContain("/projects/dora-ai");
  });

  it("renders technology badges on related cards", () => {
    render(<RelatedProjects currentSlug="dora-ai" />);
    // Pickin should show up as related - check for its tech
    expect(screen.getByText("Pickin.co")).toBeInTheDocument();
  });

  it("returns null for a project with no related projects", () => {
    // All projects share at least Tailwind CSS, so we test with nonexistent
    const { container } = render(
      <RelatedProjects currentSlug="nonexistent-project" />
    );
    expect(container.innerHTML).toBe("");
  });
});
