import { getTranslations, setRequestLocale } from "next-intl/server";

import AboutHeader from "@/components/AboutMe/AboutHeader";
import NameBadge from "@/components/AboutMe/NameBadge";
import ContactCard from "@/components/AboutMe/ContactCard";
import BioAndSocial from "@/components/AboutMe/BioAndSocial";
import DetailList from "@/components/AboutMe/DetailList";
import TechStack from "@/components/AboutMe/TechStack";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutMe.title"),
    description: t("aboutMe.description"),
    openGraph: {
      title: t("aboutMe.title"),
      description: t("aboutMe.ogDescription"),
      url: `https://yigit433.vercel.app/${locale}/about-me`,
      siteName: "Yiğit Efe Avcı",
    },
    twitter: {
      title: t("aboutMe.title"),
      description: t("aboutMe.twitterDescription"),
      card: "summary" as const,
    },
  };
}

export default async function AboutMe({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <AboutHeader />
      <NameBadge />
      <ContactCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <BioAndSocial />
        <DetailList />
      </div>
      <TechStack />
    </section>
  );
}
