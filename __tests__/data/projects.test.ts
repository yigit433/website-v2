import { describe, it, expect } from "vitest";
import {
  getRelatedProjects,
  getAllTechnologies,
  getProjectBySlug,
  getAllProjectSlugs,
  projects,
} from "@/data/projects";

describe("getRelatedProjects", () => {
  it("returns projects with shared technologies", () => {
    const related = getRelatedProjects("wsupp");
    expect(related.length).toBeGreaterThan(0);
    related.forEach((p) => {
      expect(p.slug).not.toBe("wsupp");
    });
  });

  it("returns at most maxCount projects", () => {
    const related = getRelatedProjects("wsupp", 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("returns empty array for unknown slug", () => {
    const related = getRelatedProjects("nonexistent");
    expect(related).toEqual([]);
  });

  it("sorts by number of common technologies (descending)", () => {
    const related = getRelatedProjects("dora-ai");
    // DORA AI has: Python, FastAPI, PostgreSQL, Next.js, Tailwind CSS
    // Pickin has: Redis, PostgreSQL, Next.js, Tailwind CSS → 3 common
    // Wsupp has: Bun, Hono, Typescript, Tailwind CSS, Svelte → 1 common
    // Ticaret has: Next.js, Tailwind CSS → 2 common
    // Code Share has: react.js, Tailwind CSS → 1 common
    expect(related[0].slug).toBe("pickin");
  });

  it("excludes projects with zero common technologies", () => {
    const related = getRelatedProjects("wsupp");
    related.forEach((p) => {
      const wsuppProject = projects.find((pr) => pr.slug === "wsupp")!;
      const commonTechs = p.technologies.filter((t) =>
        wsuppProject.technologies.includes(t)
      );
      expect(commonTechs.length).toBeGreaterThan(0);
    });
  });
});

describe("getAllTechnologies", () => {
  it("returns a sorted array of unique technologies", () => {
    const techs = getAllTechnologies();
    expect(techs.length).toBeGreaterThan(0);

    // Check sorted
    const sorted = [...techs].sort();
    expect(techs).toEqual(sorted);

    // Check unique
    const unique = [...new Set(techs)];
    expect(techs).toEqual(unique);
  });

  it("includes technologies from multiple projects", () => {
    const techs = getAllTechnologies();
    expect(techs).toContain("Tailwind CSS");
    expect(techs).toContain("Next.js");
    expect(techs).toContain("Bun");
    expect(techs).toContain("Python");
  });
});

describe("getProjectBySlug", () => {
  it("returns the correct project", () => {
    const project = getProjectBySlug("wsupp");
    expect(project).toBeDefined();
    expect(project!.title).toBe("Wsupp.co");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProjectBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getAllProjectSlugs", () => {
  it("returns all project slugs", () => {
    const slugs = getAllProjectSlugs();
    expect(slugs).toHaveLength(projects.length);
    expect(slugs).toContain("wsupp");
    expect(slugs).toContain("pickin");
  });
});
