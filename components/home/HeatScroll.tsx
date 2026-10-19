"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Chillies } from "@/components/brand/HeatMeter";
import { HEAT_LEVELS } from "@/lib/menu";
import { cn } from "@/lib/utils";

const COPY: Record<string, { line: string; bg: string; text: string; photo: string; alt: string }> = {
  "no-heat": {
    line: "All of the crunch, none of the burn. Easy on any spice tolerance.",
    bg: "#fdd58a",
    text: "#141414",
    photo: "/images/crunchy-tenders.webp",
    alt: "Crunchy tenders and crinkle fries on a tray",
  },
  "country-heat": {
    line: "A warm Nashville kick that builds with every bite.",
    bg: "#f26a2e",
    text: "#141414",
    photo: "/images/hot-chicken.webp",
    alt: "Hot Chicken slider held in black gloves",
  },
  screamer: {
    line: "Are you ready to handle the heat? Our hottest, reddest tenders.",
    bg: "#d7262e",
    text: "#fff8ea",
    photo: "/images/red-tender-dip.webp",
    alt: "A Red Tender coated in Screamer sauce, lifted with tongs",
  },
};

/**
 * Scroll-pinned "Choose your heat" story. The three official heat levels
 * (No Heat, Country Heat, Screamer) take over the screen one by one as you scroll.
 */
export function HeatScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(2, Math.floor(v * 3.0001))));
  const barScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  if (reduce) {
    return (
      <section className="bg-ink py-20 text-paper" aria-labelledby="heat-title">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <h2 id="heat-title" className="font-display text-6xl">Choose your heat</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HEAT_LEVELS.map((h) => (
              <div key={h.id} className="rounded-[22px] border border-paper p-6" style={{ background: COPY[h.id].bg, color: COPY[h.id].text }}>
                <Chillies count={h.chillies} className="[&_svg]:size-7" />
                <p className="mt-3 font-display text-5xl">{h.label}</p>
                <p className="mt-2">{COPY[h.id].line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const level = HEAT_LEVELS[idx];
  const c = COPY[level.id];

  return (
    <section ref={ref} className="relative h-[320vh]" aria-labelledby="heat-title">
      <motion.div
        className="sticky top-0 flex h-[100dvh] items-center overflow-hidden"
        animate={{ backgroundColor: c.bg, color: c.text }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >

        <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-8 px-4 pt-20 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div>
            <h2 id="heat-title" className="pill-label text-2xl md:text-3xl">
              Choose your heat
            </h2>
            <ol className="mt-6 flex gap-2 font-tag text-xs font-bold uppercase md:text-sm" aria-label="Heat levels">
              {HEAT_LEVELS.map((h, i) => (
                <li
                  key={h.id}
                  aria-current={i === idx ? "step" : undefined}
                  className={cn("rounded-full border-2 border-current px-3 py-1.5 transition-opacity", i === idx ? "opacity-100" : "opacity-45")}
                >
                  {h.label}
                </li>
              ))}
            </ol>
            <div className="mt-6 overflow-hidden whitespace-nowrap font-display text-[clamp(3.5rem,7.5vw,7rem)] leading-[0.9]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={level.id}
                  initial={{ y: "100%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  exit={{ y: "-100%", rotate: -4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {level.label}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Chillies count={level.chillies} className="[&_svg]:size-9 [&_svg]:text-current" />
              <p className="max-w-[34ch] text-lg font-medium leading-snug md:text-xl">{c.line}</p>
            </div>
            <div className="mt-8 h-3 w-full max-w-md overflow-hidden rounded-full border-2 border-current" aria-hidden>
              <motion.div className="h-full origin-left bg-current" style={{ scaleX: barScale }} />
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[340px] md:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 110, damping: 18 }}
                className="absolute inset-0 overflow-hidden rounded-3xl border-2 border-ink"
              >
                <div className="relative h-full">
                  <Image src={c.photo} alt={c.alt} fill sizes="340px" className="object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
