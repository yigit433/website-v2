export type Milestone = { date: string; labelKey: string };

export type Project = {
  title: string;
  slug: string;
  descriptionKey: string;
  detailDescriptionKey: string;
  technologies: string[];
  image: string;
  buttons: { nameKey: string; to: string }[];
  screenshots: string[];
  startDate: string;
  milestones: Milestone[];
};

export const projects: Project[] = [
  {
    title: "Wsupp.co",
    slug: "wsupp",
    descriptionKey: "wsupp",
    detailDescriptionKey: "wsuppDetail",
    technologies: ["Bun", "Hono", "Typescript", "Tailwind CSS", "Svelte"],
    image: "/WsuppBanner.webp",
    buttons: [
      { nameKey: "github", to: "https://github.com/Wsupp" },
      { nameKey: "visitSite", to: "https://wsupp.co" },
    ],
    screenshots: ["/WsuppBanner.webp", "/WsuppBanner.webp", "/WsuppBanner.webp"],
    startDate: "2024-06",
    milestones: [
      { date: "2024-06", labelKey: "wsuppMilestone1" },
      { date: "2024-08", labelKey: "wsuppMilestone2" },
      { date: "2024-11", labelKey: "wsuppMilestone3" },
    ],
  },
  {
    title: "Pickin.co",
    slug: "pickin",
    descriptionKey: "pickin",
    detailDescriptionKey: "pickinDetail",
    technologies: ["Redis", "PostgreSQL", "Next.js", "Tailwind CSS"],
    image: "/PickinBanner.png",
    buttons: [{ nameKey: "visitSite", to: "https://pickin.co" }],
    screenshots: ["/PickinBanner.png", "/PickinBanner.png", "/PickinBanner.png"],
    startDate: "2024-03",
    milestones: [
      { date: "2024-03", labelKey: "pickinMilestone1" },
      { date: "2024-05", labelKey: "pickinMilestone2" },
      { date: "2024-07", labelKey: "pickinMilestone3" },
    ],
  },
  {
    title: "DORA AI",
    slug: "dora-ai",
    descriptionKey: "doraai",
    detailDescriptionKey: "doraaiDetail",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Tailwind CSS"],
    image: "/DoraAI-Banner.png",
    buttons: [
      { nameKey: "github", to: "https://github.com/Dogumda-Risk-Analizi" },
      { nameKey: "liveDemo", to: "#" },
    ],
    screenshots: ["/DoraAI-Banner.png", "/DoraAI-Banner.png", "/DoraAI-Banner.png"],
    startDate: "2024-01",
    milestones: [
      { date: "2024-01", labelKey: "doraaiMilestone1" },
      { date: "2024-04", labelKey: "doraaiMilestone2" },
      { date: "2024-09", labelKey: "doraaiMilestone3" },
    ],
  },
  {
    title: "Ticaret İstatistik",
    slug: "ticaret-istatistik",
    descriptionKey: "ticaretIstatistik",
    detailDescriptionKey: "ticaretIstatistikDetail",
    technologies: ["Next.js", "Tailwind CSS"],
    image: "/Ticaret-Istatistik.jpg",
    buttons: [
      {
        nameKey: "github",
        to: "https://github.com/ticaretistatistik/ticaretistatistik.github.io",
      },
      { nameKey: "visitSite", to: "https://ticaretistatistik.github.io/" },
    ],
    screenshots: ["/Ticaret-Istatistik.jpg", "/Ticaret-Istatistik.jpg", "/Ticaret-Istatistik.jpg"],
    startDate: "2023-10",
    milestones: [
      { date: "2023-10", labelKey: "ticaretMilestone1" },
      { date: "2023-12", labelKey: "ticaretMilestone2" },
    ],
  },
  {
    title: "Code Share",
    slug: "code-share",
    descriptionKey: "codeShare",
    detailDescriptionKey: "codeShareDetail",
    technologies: ["react.js", "Tailwind CSS"],
    image: "/codeshareme.gif",
    buttons: [{ nameKey: "visitSite", to: "https://codeshare.me/" }],
    screenshots: ["/codeshareme.gif", "/codeshareme.gif", "/codeshareme.gif"],
    startDate: "2023-07",
    milestones: [
      { date: "2023-07", labelKey: "codeshareMilestone1" },
      { date: "2023-09", labelKey: "codeshareMilestone2" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getRelatedProjects(slug: string, maxCount = 3): Project[] {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return [];

  return projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      project: p,
      commonCount: p.technologies.filter((t) =>
        current.technologies.includes(t)
      ).length,
    }))
    .filter((entry) => entry.commonCount > 0)
    .sort((a, b) => b.commonCount - a.commonCount)
    .slice(0, maxCount)
    .map((entry) => entry.project);
}

export function getAllTechnologies(): string[] {
  const techSet = new Set<string>();
  for (const project of projects) {
    for (const tech of project.technologies) {
      techSet.add(tech);
    }
  }
  return Array.from(techSet).sort();
}
