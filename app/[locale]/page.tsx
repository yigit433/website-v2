import { setRequestLocale } from "next-intl/server";

import EducationTimeline from "@/components/Home/EducationTimeline";
import Hero from "@/components/Home/Hero";
import { TechStackHorizontal } from "@/components/Home/TechStack";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <Hero />
      <TechStackHorizontal />
      <EducationTimeline />
    </div>
  );
}
