"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Round rotating sticker. Customised from React Bits' CircularText
 * (letters placed around a circle, rotated by a Motion loop), slimmed down to a
 * hover-pausing spin and restyled as an inked Seven Sides badge.
 */
export function Sticker({
  text,
  center,
  size = 132,
  className = "",
  tone = "teal",
}: {
  text: string;
  center?: React.ReactNode;
  size?: number;
  className?: string;
  tone?: "teal" | "mustard" | "chili";
}) {
  const reduce = useReducedMotion();
  const letters = Array.from(text);
  const step = 360 / letters.length;
  const bg = { teal: "bg-teal text-white", mustard: "bg-mustard text-ink", chili: "bg-chili text-white" }[tone];
  return (
    <div
      className={cn("relative grid place-items-center rounded-full border-2 border-ink", bg, className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={text.replace(/[•·]/g, " ").replace(/\s+/g, " ").trim()}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-[6px] w-[1em] -translate-x-1/2 text-center font-display leading-none"
            style={{
              fontSize: size * 0.125,
              height: size / 2 - 6,
              rotate: `${i * step}deg`,
              transformOrigin: "50% 100%",
            }}
          >
            {ch}
          </span>
        ))}
      </motion.div>
      <div className="relative z-10 text-center font-display leading-[0.85]" aria-hidden>
        {center}
      </div>
    </div>
  );
}
