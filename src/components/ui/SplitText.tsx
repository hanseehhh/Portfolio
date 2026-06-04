'use client';

import { useEffect, useRef, CSSProperties } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className,
  style,
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const fromRef = useRef(from);
  const toRef = useRef(to);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  const items = splitType === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLSpanElement>(".split-char");
    gsap.set(targets, fromRef.current ?? {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(targets, {
            ...toRef.current,
            duration,
            ease,
            stagger: delay / 1000,
            onComplete: onCompleteRef.current,
          });
        } else {
          gsap.to(targets, {
            ...fromRef.current,
            duration: duration * 0.6,
            ease: "power2.in",
            stagger: delay / 2000,
          });
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(targets);
    };
  }, [delay, duration, ease, threshold, rootMargin]);

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex flex-wrap", className)}
      style={style}
    >
      {items.map((item, i) => (
        <span key={i} className="split-char inline-block">
          {item === " " ? " " : item}
        </span>
      ))}
    </span>
  );
}