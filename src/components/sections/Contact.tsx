'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const WA_NUMBER = "6287742317432";
const CONTACT_LINKS = [
  {
    label: "GitHub",
    value: "github.com/hanseehhh",
    href: "https://github.com/hanseehhh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hanseehhh",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Gmail",
    value: "your@email.com",
    href: "mailto:your@email.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+62 877-4231-7432",
    href: `https://wa.me/${WA_NUMBER}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    value: "behance.net/hanseehhh",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7h7.5a3 3 0 0 1 0 6H2V7z" />
        <path d="M2 13h8.5a3.5 3.5 0 0 1 0 7H2v-7z" />
        <path d="M14 8h8" />
        <path d="M22 14c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c1.5 0 2.8-.8 3.5-2" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    value: "dribbble.com/hanseehhh",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal direction="none">
          <div className="relative mb-4 text-center">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[5rem] font-black uppercase leading-none tracking-widest text-zinc-100 sm:text-[8rem] lg:text-[10rem]"
              style={{ fontFamily: HELVETICA }}
              aria-hidden
            >
              CONTACT
            </span>

            <div className="relative z-10 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: HELVETICA }}>
                Get In Touch
              </p>
              <h2 className="text-4xl font-black text-zinc-900 sm:text-5xl" style={{ fontFamily: HELVETICA }}>
                {"Let's"} <span className="text-zinc-400">Work Together</span>
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-zinc-500" style={{ fontFamily: HELVETICA }}>
            Punya ide proyek, mau kolaborasi, atau sekadar ingin ngobrol?
            Saya terbuka untuk berbagai kesempatan — dari freelance hingga full-time.
            Jangan ragu untuk menghubungi saya, mari kita wujudkan sesuatu yang luar biasa bersama.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {CONTACT_LINKS.map(({ label, value, href, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm">
                      {icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: HELVETICA }}>
                        {label}
                      </span>
                      <span className="text-sm text-zinc-700" style={{ fontFamily: HELVETICA }}>
                        {value}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                <Image
                  src="/me/photo_2.jpeg"
                  alt="Hans Thobie Sachio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-zinc-200" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}