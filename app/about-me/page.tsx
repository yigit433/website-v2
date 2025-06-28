import { Metadata } from "next";

import AboutHeader from "@/components/AboutMe/AboutHeader";
import NameBadge from "@/components/AboutMe/NameBadge";
import ContactCard from "@/components/AboutMe/ContactCard";
import BioAndSocial from "@/components/AboutMe/BioAndSocial";
import DetailList from "@/components/AboutMe/DetailList";
import TechStack from "@/components/AboutMe/TechStack";

export const metadata: Metadata = {
    title: 'About Me – Yiğit Efe Avcı',
    description: 'More information about Yiğit Efe Avcı. My developer journey, interests, and technical skills.',
    openGraph: {
        title: 'About Me – Yiğit Efe Avcı',
        description: 'A passionate developer working in software, data science, and artificial intelligence.',
        url: 'https://yigit433.vercel.app/about-me',
        siteName: 'Yiğit Efe Avcı',
    },
    twitter: {
        title: 'About Me – Yiğit Efe Avcı',
        description: 'Detailed information about a developer focused on full-stack and AI projects.',
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