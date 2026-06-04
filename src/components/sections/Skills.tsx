"use client";

import { motion } from "framer-motion";
import { ScrollReveal, AnimatedText } from "@/components/ui";
import { SKILLS } from "@/lib/constants";
import type { Skill } from "@/types";

const CATEGORIES: { key: Skill["category"]; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
];

export function Skills() {
  return (
    <section id="skills" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase">
            03. Stack
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mb-16 text-3xl font-bold text-white sm:text-4xl">
            <AnimatedText text="Technologies I work with" variant="word" />
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-12">
          {CATEGORIES.map(({ key, label }, ci) => {
            const items = SKILLS.filter((s) => s.category === key);
            return (
              <ScrollReveal key={key} delay={ci * 0.1}>
                <div>
                  <p className="mb-4 font-mono text-xs tracking-widest text-zinc-600 uppercase">
                    {label}
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {items.map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + ci * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                      >
                        {skill.name}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
