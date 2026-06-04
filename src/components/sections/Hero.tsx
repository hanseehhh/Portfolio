"use client";

import { motion } from "framer-motion";
import { AnimatedText, GlitchText, MagneticButton } from "@/components/ui";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase"
      >
        Hi, I&apos;m
      </motion.p>

      <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
        <GlitchText text="Hans" className="text-white" />
      </h1>

      <h2 className="mb-8 text-xl text-zinc-400 sm:text-2xl">
        <AnimatedText
          text="Full-Stack Developer & UI Engineer"
          variant="word"
          delay={0.3}
          className="justify-center"
        />
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-12 max-w-md text-base leading-relaxed text-zinc-500"
      >
        I build fast, accessible, and delightful web experiences — from pixel-perfect UIs
        to robust backend systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton
          as="a"
          href="#projects"
          className="border border-white/20 bg-white text-black hover:bg-zinc-100"
        >
          View Work
        </MagneticButton>

        <MagneticButton
          as="a"
          href="#contact"
          className="border border-white/20 text-white hover:bg-white/10"
        >
          Get In Touch
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-6 w-px bg-zinc-700"
          />
        </div>
      </motion.div>
    </section>
  );
}
