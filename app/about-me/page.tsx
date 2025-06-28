import { Metadata } from "next";

import AboutHeader from "@/components/AboutMe/AboutHeader";
import NameBadge from "@/components/AboutMe/NameBadge";
import ContactCard from "@/components/AboutMe/ContactCard";
import BioAndSocial from "@/components/AboutMe/BioAndSocial";
import DetailList from "@/components/AboutMe/DetailList";
import TechStack from "@/components/AboutMe/TechStack";

export const metadata: Metadata = {
    title: 'Hakkımda – Yiğit Efe Avcı',
    description: 'Yiğit Efe Avcı hakkında daha fazla bilgi. Geliştirici yolculuğum, ilgi alanlarım ve teknik becerilerim.',
    openGraph: {
        title: 'Hakkımda – Yiğit Efe Avcı',
        description: 'Yazılım, veri bilimi ve yapay zeka alanlarında tutkuyla çalışan bir geliştirici.',
        url: 'https://yigit433.vercel.app/about-me',
        siteName: 'Yiğit Efe Avcı',
    },
    twitter: {
        title: 'Hakkımda – Yiğit Efe Avcı',
        description: 'Full-stack ve AI projelerine odaklanan geliştirici hakkında detaylı bilgi.',
        card: 'summary',
    },
};

export default function AboutMe() {
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