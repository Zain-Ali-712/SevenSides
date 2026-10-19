"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { PauseIcon, PlayIcon, StarFourIcon } from "@phosphor-icons/react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * The Seven Sides wrapping paper ("SEVEN SIDES" repeated in teal and mustard),
 * as a band that speeds up and flips direction with scroll velocity.
 * Core loop customised from React Bits' ScrollVelocity.
 */
export function PaperMarquee({ words = ["SEVEN SIDES", "HOME OF RED TENDERS"], baseVelocity = 3 }: { words?: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    baseX.set(baseX.get() - dir.current * baseVelocity * (delta / 1000) * (1 + Math.abs(f)));
  });

  const run = (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: 4 }, (_, k) =>
        words.map((w, i) => (
          <span key={`${k}-${i}`} className="flex items-center">
            <span className={(k * words.length + i) % 2 ? "text-mustard" : "text-teal"}>{w}</span>
            <StarFourIcon weight="fill" className="mx-5 size-5 text-ink md:mx-7 md:size-6" />
          </span>
        )),
      )}
    </span>
  );

  return (
    <div className="relative overflow-x-clip">
    {!reduce && (
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play scrolling banner" : "Pause scrolling banner"}
        className="absolute bottom-0 right-3 z-10 grid size-9 place-items-center rounded-full border-2 border-ink bg-white hover:bg-mustard md:right-6"
      >
        {paused ? <PlayIcon weight="fill" className="size-4" aria-hidden /> : <PauseIcon weight="fill" className="size-4" aria-hidden />}
      </button>
    )}
    <div className="overflow-hidden border-y-2 border-ink bg-paper py-3" aria-hidden>
      <motion.div
        className="flex w-max font-display text-4xl leading-none tracking-wide md:text-5xl"
        style={{ x: reduce ? "0%" : x }}
      >
        {run}
        {run}
      </motion.div>
    </div>
    </div>
  );
}
