"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const line: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.95, delay: i * 0.08, ease: EASE } }),
};

/** Display heading where each line slides up from behind a mask. */
export function SplitHeading({
  lines,
  className,
  as = "h2",
  immediate = false,
  id,
}: {
  lines: React.ReactNode[];
  className?: string;
  id?: string;
  as?: "h1" | "h2";
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } };
  return (
    <Tag id={id} className={className} initial={reduce ? false : "hidden"} {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={line} custom={i}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  if (reduce) return <p className={className}>{text}</p>;
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}
