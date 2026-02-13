import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${project.title} – ${t("projects.suffix")}`,
    openGraph: {
      title: `${project.title} – ${t("projects.suffix")}`,
      url: `https://yigit433.vercel.app/${locale}/projects/${slug}`,
      siteName: "Yiğit Efe Avcı",
    },
    twitter: {
      title: `${project.title} – ${t("projects.suffix")}`,
      card: "summary" as const,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  setRequestLocale(locale);

  return <ProjectDetailClient project={project} />;
}
