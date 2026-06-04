"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollProgress, useActiveSection } from "@/hooks/useScrollProgress";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const MENU_ITEMS = NAV_LINKS.map((link, i) => ({
  ...link,
  number: String(i + 1).padStart(2, "0"),
}));

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 320, damping: 38 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 320, damping: 38 },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const active = activeSection ? `#${activeSection}` : NAV_LINKS[0].href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 h-[2px] bg-zinc-900 origin-left"
        style={{ scaleX: progress / 100 }}
      />

      <motion.a
        href="#"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-5 left-6 z-40 font-black text-sm tracking-widest text-zinc-900 uppercase transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-60"
        )}
        style={{ fontFamily: HELVETICA }}
      >
        hans<span className="text-zinc-400">.</span>dev
      </motion.a>

      <motion.button
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        className="fixed top-4 right-6 z-40 flex flex-col justify-center gap-[5px] p-1 group"
      >
        <span className="block h-[2px] w-6 bg-zinc-900 transition-all duration-300 group-hover:w-4" />
        <span className="block h-[2px] w-6 bg-zinc-900" />
        <span className="block h-[2px] w-4 bg-zinc-900 transition-all duration-300 group-hover:w-6" />
      </motion.button>

      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
      >
        <ul className="flex items-center gap-0.5 rounded-full border border-zinc-200 bg-white/80 px-2 py-2 shadow-sm shadow-zinc-200/60 backdrop-blur-md">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="relative inline-flex items-center px-4 py-2"
              >
                {active === href && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 rounded-full bg-zinc-900"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 text-[11px] uppercase tracking-widest transition-colors duration-150",
                    active === href ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                  )}
                  style={{ fontFamily: HELVETICA }}
                >
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />

            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white px-10 py-8 shadow-2xl"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end text-[11px] tracking-[0.2em] text-zinc-400 uppercase hover:text-zinc-900 transition-colors duration-200"
                style={{ fontFamily: HELVETICA }}
              >
                Close ×
              </button>

              <motion.nav
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="mt-14 flex flex-col gap-1"
              >
                {MENU_ITEMS.map(({ label, href, number }) => (
                  <motion.a
                    key={href}
                    href={href}
                    variants={itemVariants}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-start leading-none"
                  >
                    <span className="mt-2.5 mr-2 font-mono text-xs text-indigo-400">
                      {number}
                    </span>
                    <span
                      className="text-5xl font-black text-zinc-900 transition-colors duration-150 group-hover:text-zinc-400"
                      style={{ fontFamily: HELVETICA }}
                    >
                      {label.toUpperCase()}
                    </span>
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
