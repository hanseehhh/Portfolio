'use client';

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "button",
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <Tag
        style={{ x, y }}
        href={as === "a" ? href : undefined}
        target={target}
        rel={rel}
        onClick={onClick}
        data-hovered={hovered}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3",
          "font-medium transition-colors duration-200",
          className
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
