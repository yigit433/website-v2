import Hero from "@/components/Home/Hero";
import { TechStackHorizontal } from "@/components/Home/TechStack";

export default function Home() {
  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <Hero />
      <TechStackHorizontal />
    </div>
  );
}