import { Hero, About, Services, Projects, Skills, Contact } from "@/components/sections";
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
      <Skills />
      <SectionDivider />
      <Contact />
    </>
  );
}
