"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { MILESTONES, type Milestone } from "@/lib/story";
import { cn } from "@/lib/utils";

const TONE = { mustard: "bg-mustard", teal: "bg-teal", white: "bg-white", ember: "bg-ember" };

function Polaroid({ m }: { m: Milestone }) {
  return (
    <article className="w-[78vw] max-w-[300px] shrink-0 overflow-hidden rounded-2xl border-2 border-ink bg-white md:w-[300px]">
      <div>
        <div className={cn("relative aspect-[5/4] overflow-hidden border-b-2 border-ink", TONE[m.tone])}>
          <Image src={m.photo.src} alt={m.photo.alt} fill sizes="300px" className="object-cover" />
        </div>
        <div className="p-4">
        <p className="pill-label text-base">{m.date}</p>
        <h3 className="mt-2 font-display text-3xl leading-[0.95]">{m.title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-ink/75">{m.body}</p>
        {m.quote && (
          <blockquote className="mt-2 border-l-2 border-chili pl-3 font-tag text-xs font-semibold">
            &ldquo;{m.quote}&rdquo;
          </blockquote>
        )}
        </div>
      </div>
    </article>
  );
}

/**
 * Milestones as tilted polaroids, styled after the brand's own opening-day
 * posters. On desktop the row pans sideways while the section is pinned.
 */
export function Timeline() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [pan, setPan] = useState(false);

  useLayoutEffect(() => {
    const check = () => setPan(window.matchMedia("(min-width: 768px)").matches && !reduce);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduce]);

  // Measure only once the horizontal track is mounted (pan mode), and on resize.
  useLayoutEffect(() => {
    if (!pan || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pan]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const line = useTransform(smooth, [0, 1], [0, 1]);

  if (!pan) {
    return (
      <section ref={wrap} className="bg-paper py-20" aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="px-4 font-display text-6xl leading-[0.9] md:px-6">
          How we got here
        </h2>
        <ol className="mt-14 grid justify-items-center gap-14 px-4">
          {MILESTONES.map((m) => (
            <li key={m.title}>
              <Polaroid m={m} />
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative bg-paper" style={{ height: `calc(100dvh + ${distance}px)` }} aria-labelledby="timeline-title">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-start overflow-hidden">
        <div className="mx-auto mb-6 flex w-full max-w-[1240px] items-end justify-between px-6 pt-28">
          <h2 id="timeline-title" className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.85]">
            How we got here
          </h2>
          <div className="mb-3 h-3 w-60 overflow-hidden rounded-full border-2 border-ink" aria-hidden>
            <motion.div className="h-full origin-left bg-chili" style={{ scaleX: line }} />
          </div>
        </div>
        <motion.ol ref={track} style={{ x }} className="flex w-max items-start gap-10 px-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))] pb-8 pt-6">
          {MILESTONES.map((m) => (
            <li key={m.title}>
              <Polaroid m={m} />
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
