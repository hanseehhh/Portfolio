"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "chars";
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.6,
  animateBy = "words",
}: BlurTextProps) {
  const items = animateBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", animateBy === "words" && "gap-x-[0.3em]", className)}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: delay + i * 0.1,
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}
