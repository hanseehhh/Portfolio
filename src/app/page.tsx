import { Hero, About, Services, Projects, Contact } from "@/components/sections";
import { SectionDivider } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </>
  );
}
