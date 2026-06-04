import Image from "next/image";
import { ScrollReveal } from "@/components/ui";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const STAR_CLIP =
  "polygon(50% 0%,58% 8%,68% 4%,72% 15%,84% 15%,84% 27%,96% 32%,92% 43%,100% 50%,92% 57%,96% 68%,84% 73%,84% 85%,72% 85%,68% 96%,58% 92%,50% 100%,42% 92%,32% 96%,28% 85%,16% 85%,16% 73%,4% 68%,8% 57%,0% 50%,8% 43%,4% 32%,16% 27%,16% 15%,28% 15%,32% 4%,42% 8%)";

const SOCIALS = [
  {
    label: "Dribbble",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7h7.5a3 3 0 0 1 0 6H2V7z" />
        <path d="M2 13h8.5a3.5 3.5 0 0 1 0 7H2v-7z" />
        <path d="M14 8h8" />
        <path d="M22 14c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c1.5 0 2.8-.8 3.5-2" />
      </svg>
    ),
  },
];

const EXPERIENCES = [
  {
    year: "2023 - Recent",
    title: "Tarumanagara University",
    subtitle: "Technology Informatics Faculty",
    detail: "GPA: 3.8/4.0",
  },
  {
    year: "2025 - Recent",
    title: "Yayasan Tarumanagara",
    subtitle: "Front-End Developer Intern",
    detail: "1 year",
  },
];

export function About() {
  return (
    <section id="about" className="flex min-h-screen flex-col justify-center px-8 py-16 sm:px-16">
      <ScrollReveal>
        <div className="mx-auto grid w-fit grid-cols-1 gap-10 md:grid-cols-[auto_auto_auto] md:items-center md:gap-14">
          <ScrollReveal direction="left">
            <div
              className="relative mx-auto h-80 w-80 overflow-hidden md:h-96 md:w-96"
              style={{
                clipPath: STAR_CLIP,
                filter: "drop-shadow(0px 12px 40px rgba(235, 228, 215, 0.95))",
              }}
            >
              <Image src="/me/photo_1.jpeg" alt="Hans Thobie Sachio" fill className="object-cover" priority />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-5" style={{ width: "900px" }}>
            <ScrollReveal direction="right">
              <h2 className="text-5xl font-black leading-tight text-zinc-900 sm:text-6xl" style={{ fontFamily: HELVETICA }}>
                Hello!<br />I&apos;m Hans Thobie Sachio
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-zinc-500 text-justify" style={{ fontFamily: HELVETICA }}>
                An Information Technology student exploring the intersection of technology and design.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-lg leading-relaxed text-zinc-500 text-justify" style={{ fontFamily: HELVETICA }}>
                I explore how technology and design can intersect to create meaningful user experiences.
                To me, design is more than just aesthetics — it&apos;s a tool to solve problems, tell stories,
                and craft products that are not only functional but also emotionally engaging and visually compelling.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md border border-zinc-200 px-4 py-2.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
                  style={{ fontFamily: HELVETICA }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mx-auto mt-20 max-w-3xl">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: HELVETICA }}>
            Experience
          </p>

          <div className="relative mb-6 flex items-center">
            <div className="absolute -left-16 -right-16 border-t border-dashed border-zinc-400" />
            <div className="relative flex w-full justify-between px-2">
              {EXPERIENCES.map((_, i) => (
                <div key={i} className="z-10 h-4 w-4 rounded-full bg-zinc-700" />
              ))}
            </div>
          </div>

          <div className="flex justify-between px-2">
            {EXPERIENCES.map(({ year, title, subtitle, detail }, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.15}>
                <div className={i === 1 ? "text-right" : "text-left"}>
                  <p className="text-sm text-zinc-400" style={{ fontFamily: HELVETICA }}>{year}</p>
                  <p className="text-xl font-bold text-zinc-900" style={{ fontFamily: HELVETICA }}>{title}</p>
                  <p className="text-base text-zinc-500" style={{ fontFamily: HELVETICA }}>{subtitle}</p>
                  <p className="text-sm text-zinc-400" style={{ fontFamily: HELVETICA }}>{detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
