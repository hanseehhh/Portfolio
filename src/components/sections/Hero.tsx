"use client";

import { motion } from "framer-motion";
import { BlurText, MagneticButton, SplitText } from "@/components/ui";


const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

const LETTERS = [
  { char: "P", bg: "#D4D4D4", shadow: "#A3A3A3", rotate: -4, light: true  },
  { char: "O", bg: "#737373", shadow: "#525252", rotate: 2,  light: false },
  { char: "R", bg: "#A3A3A3", shadow: "#737373", rotate: -2, light: true  },
  { char: "T", bg: "#D4D4D4", shadow: "#A3A3A3", rotate: 4,  light: true  },
  { char: "F", bg: "#404040", shadow: "#262626", rotate: -1, light: false },
  { char: "O", bg: "#A3A3A3", shadow: "#737373", rotate: 3,  light: true  },
  { char: "L", bg: "#D4D4D4", shadow: "#A3A3A3", rotate: -3, light: true  },
  { char: "i", bg: "#737373", shadow: "#525252", rotate: 2,  light: false },
  { char: "O", bg: "#A3A3A3", shadow: "#737373", rotate: -2, light: true  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <p
        className="mb-0 text-3xl font-bold tracking-[0.05em] text-zinc-800"
        style={{ fontFamily: HELVETICA }}
      >
        <BlurText text="Hans Thobie Sachio" animateBy="words" delay={0} duration={0.7} />
      </p>

      <div className="relative flex justify-center">
        <SplitText
          text="CREATIVE"
          className="select-none text-[15vw] font-black leading-none tracking-tighter text-zinc-900"
          style={{ fontFamily: HELVETICA }}
          delay={60}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="0px"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-end" style={{ gap: "1.2vw" }}>
            {LETTERS.map(({ char, bg, shadow, rotate, light }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.55,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{
                  backgroundColor: bg,
                  boxShadow: `0.2vw 0.2vw 0 ${shadow}`,
                  width: "4.5vw",
                  height: "6vw",
                }}
                className="flex items-center justify-center rounded-[3px]"
              >
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "2.8vw",
                    color: light ? "#18181b" : "#fafafa",
                  }}
                >
                  {char}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="mt-6 flex flex-col items-center gap-8 text-center"
      >
        <p
          className="text-sm tracking-[0.2em] text-zinc-400"
          style={{ fontFamily: HELVETICA }}
        >
          Full Stack Developer &amp; UI/UX Designer
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href="#projects"
            className="bg-zinc-900 text-white hover:bg-zinc-700"
          >
            View Work
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#contact"
            className="border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
          >
            Get In Touch
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-widest text-zinc-400 uppercase"
          style={{ fontFamily: HELVETICA }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-6 w-px bg-zinc-300"
        />
      </motion.div>
    </section>
  );
}