'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { SKILLS } from "@/lib/constants";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const SERVICES = [
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive interfaces and seamless user experiences grounded in research, usability, and visual clarity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Application Design",
    description:
      "Designing cohesive mobile and desktop app interfaces focused on interaction patterns and intuitive product flow.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Website Design",
    description:
      "Creating visually compelling and responsive website layouts that balance aesthetics with usability and performance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "Design System",
    description:
      "Building scalable design systems with consistent components, tokens, and guidelines that accelerate product teams.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Web Developer",
    description:
      "Building fast, responsive, and accessible websites using modern technologies like Next.js, React, and Tailwind CSS.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Application Developer",
    description:
      "Developing performant cross-platform applications with clean architecture and a focus on user experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Software Development",
    description:
      "Delivering reliable, maintainable software solutions from ideation through deployment with scalability in mind.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="10" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Prototyping",
    description:
      "Translating ideas into interactive prototypes and wireframes to validate concepts before development begins.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const TOOLS = [
  { label: "Figma",       src: "/tools/figma.png",     size: 22 },
  { label: "Adobe Illus", src: "/tools/adobeislu.png", size: 32 },
  { label: "Canva",       src: "/tools/canva.png",     size: 32 },
  { label: "VSCode",      src: "/tools/vsc.png",       size: 32 },
  { label: "GitHub",      src: "/tools/github.png",    size: 32 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function Services() {
  return (
    <section id="services" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal direction="none">
          <div className="relative mb-16 text-center">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[5rem] font-black uppercase leading-none tracking-widest text-zinc-100 sm:text-[8rem] lg:text-[10rem]"
              style={{ fontFamily: HELVETICA }}
              aria-hidden
            >
              SERVICES
            </span>

            <div className="relative z-10 py-8">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400"
                style={{ fontFamily: HELVETICA }}
              >
                My Specialization
              </p>
              <h2
                className="text-4xl font-black text-zinc-900 sm:text-5xl"
                style={{ fontFamily: HELVETICA }}
              >
                Services <span className="text-zinc-400">I Provide</span>
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ title, description, icon }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 38 }}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-zinc-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm">
                {icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="text-base font-bold text-zinc-900"
                  style={{ fontFamily: HELVETICA }}
                >
                  {title}
                </h3>
                <p
                  className="line-clamp-3 text-sm leading-relaxed text-zinc-500"
                  style={{ fontFamily: HELVETICA }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:items-start">
            {(["frontend", "backend"] as const).map((cat, ci) => {
              const items = SKILLS.filter((s) => s.category === cat);
              return (
                <div key={cat} className="flex flex-1 flex-col gap-4">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
                    style={{ fontFamily: HELVETICA }}
                  >
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          delay: ci * 0.1 + i * 0.06,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                        }}
                        className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs text-zinc-600"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-1 flex-col gap-4">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
                style={{ fontFamily: HELVETICA }}
              >
                Tools I Use
              </p>
              <div className="flex flex-wrap gap-4">
                {TOOLS.map(({ label, src, size }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    }}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition-shadow hover:shadow-md">
                      <Image src={src} alt={label} width={size} height={size} className="object-contain" />
                    </div>
                    <span
                      className="text-[10px] font-medium tracking-wide text-zinc-400"
                      style={{ fontFamily: HELVETICA }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}