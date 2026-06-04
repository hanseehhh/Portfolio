'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/types";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

type SortKey = "az" | "za" | "newest" | "oldest";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Terbaru" },
  { key: "oldest", label: "Terlama" },
  { key: "az",     label: "A - Z"  },
  { key: "za",     label: "Z - A"  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 38 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden bg-zinc-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-sm font-bold text-zinc-900" style={{ fontFamily: HELVETICA }}>
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500" style={{ fontFamily: HELVETICA }}>
          {project.description}
        </p>

        <a
          href={project.href ?? project.repo ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-fit items-center gap-1.5 text-xs font-semibold text-zinc-900 transition-all hover:gap-2.5"
          style={{ fontFamily: HELVETICA }}
        >
          Read More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [sort, setSort] = useState<SortKey>("newest");

  const sorted = useMemo(() => {
    const list = [...PROJECTS];
    if (sort === "az") return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") return list.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "oldest") return list;
    return list.reverse();
  }, [sort]);

  return (
    <section id="projects" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <ScrollReveal direction="none">
          <div className="relative mb-8 text-center">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[5rem] font-black uppercase leading-none tracking-widest text-zinc-100 sm:text-[8rem] lg:text-[10rem]"
              style={{ fontFamily: HELVETICA }}
              aria-hidden
            >
              PROJECTS
            </span>

            <div className="relative z-10 py-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: HELVETICA }}>
                My Work
              </p>
              <h2 className="text-4xl font-black text-zinc-900 sm:text-5xl" style={{ fontFamily: HELVETICA }}>
                Selected <span className="text-zinc-400">Projects</span>
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mr-1" style={{ fontFamily: HELVETICA }}>
                Sort
              </span>
              {SORT_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    sort === key
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
                  }`}
                  style={{ fontFamily: HELVETICA }}
                >
                  {label}
                </button>
              ))}
            </div>

            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-900"
              style={{ fontFamily: HELVETICA }}
            >
              See All Projects
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={sort}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {sorted.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}