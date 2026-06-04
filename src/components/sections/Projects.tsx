"use client";

import { motion } from "framer-motion";
import { ScrollReveal, AnimatedText } from "@/components/ui";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-zinc-900">{project.title}</h3>
            {project.featured && (
              <span className="inline-block w-fit rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                featured
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-900"
                aria-label="GitHub repo"
              >
                repo ↗
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-900"
                aria-label="Live site"
              >
                live ↗
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500">{project.description}</p>

        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[11px] text-zinc-500"
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.article>
    </ScrollReveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase">
            02. Work
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mb-16 text-3xl font-bold text-zinc-900 sm:text-4xl">
            <AnimatedText text="Selected projects" variant="word" />
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
