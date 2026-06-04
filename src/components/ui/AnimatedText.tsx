"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: "word" | "char" | "fade";
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4, ease: "easeOut" },
  }),
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  variant = "word",
}: AnimatedTextProps) {
  if (variant === "fade") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once }}
        transition={{ delay, duration }}
        className={className}
      >
        {text}
      </motion.p>
    );
  }

  const items = variant === "char" ? text.split("") : text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          custom={i + delay * 10}
          variants={variant === "char" ? charVariants : wordVariants}
          className="inline-block"
        >
          {item === " " ? " " : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
