"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  enableShadows?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function GlitchText({
  text,
  className,
  speed = 50,
  enableShadows = true,
}: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGlitch = () => {
    let iteration = 0;
    clearInterval(intervalRef.current ?? undefined);

    intervalRef.current = setInterval(() => {
      if (!ref.current) return;

      ref.current.innerText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration >= text.length) {
        clearInterval(intervalRef.current ?? undefined);
        ref.current.innerText = text;
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current ?? undefined);
  }, []);

  return (
    <span
      ref={ref}
      onMouseEnter={startGlitch}
      className={cn(
        "cursor-default font-mono select-none",
        enableShadows && "drop-shadow-[0_0_8px_currentColor]",
        className
      )}
    >
      {text}
    </span>
  );
}
