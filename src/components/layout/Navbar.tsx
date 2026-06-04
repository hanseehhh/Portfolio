"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 h-[2px] bg-white origin-left"
        style={{ scaleX: progress / 100 }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <a href="#" className="font-mono text-sm font-bold tracking-widest text-white uppercase">
          hans<span className="text-zinc-400">.</span>dev
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="font-mono text-xs tracking-widest text-zinc-400 uppercase transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={cn("block h-px w-6 bg-white transition-all", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-px w-6 bg-white transition-all", menuOpen && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-white transition-all", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-white/10 bg-black/95 px-6 py-8 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm tracking-widest text-zinc-300 uppercase hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
