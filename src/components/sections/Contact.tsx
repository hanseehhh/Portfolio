'use client';

import { motion } from "framer-motion";
import { ScrollReveal, AnimatedText, MagneticButton } from "@/components/ui";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase">
            04. Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl font-bold text-zinc-900 sm:text-6xl">
            <AnimatedText text="Let's work together" variant="word" className="justify-center" />
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="max-w-md text-base leading-relaxed text-zinc-500">
            I&apos;m currently open to new opportunities. Whether you have a project in mind,
            want to collaborate, or just want to say hi â€” my inbox is always open.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton
            as="a"
            href="mailto:your@email.com"
            className="bg-zinc-900 text-white hover:bg-zinc-700"
            strength={0.4}
          >
            Say Hello â†’
          </MagneticButton>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <ul className="flex items-center gap-8">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="font-mono text-xs tracking-widest text-zinc-400 uppercase transition-colors hover:text-zinc-900"
                >
                  {label}
                </motion.a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
