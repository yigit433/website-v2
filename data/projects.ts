export type Project = {
  title: string;
  slug: string;
  descriptionKey: string;
  detailDescriptionKey: string;
  technologies: string[];
  image: string;
  buttons: { nameKey: string; to: string }[];
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
  },
  {
    title: "Pickin.co",
    slug: "pickin",
    descriptionKey: "pickin",
    detailDescriptionKey: "pickinDetail",
    technologies: ["Redis", "PostgreSQL", "Next.js", "Tailwind CSS"],
    image: "/PickinBanner.png",
    buttons: [{ nameKey: "visitSite", to: "https://pickin.co" }],
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
  },
  {
    title: "Code Share",
    slug: "code-share",
    descriptionKey: "codeShare",
    detailDescriptionKey: "codeShareDetail",
    technologies: ["react.js", "Tailwind CSS"],
    image: "/codeshareme.gif",
    buttons: [{ nameKey: "visitSite", to: "https://codeshare.me/" }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
