"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Illo, type IlloName } from "@/components/brand/Illo";
import { SplitHeading } from "@/components/motion/Reveal";
import { formatPrice, getProduct } from "@/lib/menu";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const SHOWCASE = ["the-sando", "red-tenders", "hot-honey-ranch"].map((id) => getProduct(id)!);

/** Loose, uneven placement for the menu-board drawings (widths are % of the showcase). */
const SCATTER: { name: IlloName; pos: string; rotate: number; delay: number }[] = [
  { name: "toastie", pos: "-right-[2%] -top-[4%] w-[24%] sm:-right-[12%]", rotate: 12, delay: 0.3 },
  { name: "tender-stack", pos: "-left-[2%] top-[6%] w-[15%] sm:-left-[13%]", rotate: -14, delay: 1.1 },
  { name: "mac-buckets", pos: "-right-[4%] top-[42%] w-[20%] sm:-right-[17%]", rotate: -6, delay: 0.7 },
  { name: "shakes", pos: "-left-[3%] bottom-[16%] w-[18%] sm:-left-[15%]", rotate: 9, delay: 1.6 },
  { name: "waffle-fries", pos: "right-[4%] bottom-[10%] w-[11%] sm:-right-[6%]", rotate: -20, delay: 2.1 },
  { name: "sando", pos: "-left-[6%] top-[46%] hidden w-[11%] sm:block", rotate: 7, delay: 2.6 },
];

/** Arched product photo on a mustard disc that rotates through three signatures. */
function Showcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = SHOWCASE[i];

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % SHOWCASE.length), 4500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <div
      className="relative mx-auto aspect-[1/1.05] w-full max-w-[330px] sm:max-w-[500px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute left-1/2 top-[8%] aspect-square w-[96%] -translate-x-1/2 rounded-full border-2 border-ink bg-mustard" aria-hidden />

      <div className="absolute left-1/2 top-0 aspect-[3/4] w-[74%] -translate-x-1/2 overflow-hidden rounded-b-[32px] rounded-t-full border-2 border-ink bg-ink">
        <AnimatePresence initial={false}>
          <motion.div
            key={p.id}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={p.photo!.src}
              alt={p.photo!.alt}
              fill
              sizes="(min-width: 640px) 370px, 250px"
              loading={i === 0 ? "eager" : undefined}
              fetchPriority={i === 0 ? "high" : undefined}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* menu-board drawings scattered loosely around the frame */}
      {SCATTER.map((d) => (
        <div key={d.name} className={cn("absolute", d.pos)} style={{ rotate: `${d.rotate}deg` }}>
          <Illo name={d.name} width={120} delay={d.delay} className="h-auto! w-full!" />
        </div>
      ))}

      <div className="absolute inset-x-[22%] bottom-[2%] flex items-center gap-2 rounded-full border-2 border-ink bg-paper py-1.5 pl-4 pr-1.5">
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="truncate font-display text-lg leading-none">{p.name}</p>
          <p className="font-display text-sm leading-none text-teal-deep">{formatPrice(p.price)}</p>
        </div>
        <div className="flex gap-1" role="group" aria-label="Show signature item">
          {SHOWCASE.map((s, n) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setI(n)}
              aria-pressed={n === i}
              aria-label={`Show ${s.name}`}
              className={cn(
                "relative size-7 overflow-hidden rounded-full border-2 transition-[scale,border-color] sm:size-8",
                n === i ? "scale-110 border-chili" : "border-ink opacity-70 hover:opacity-100",
              )}
            >
              <Image src={s.photo!.src} alt="" fill sizes="32px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const showcaseY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-teal pb-16 pt-28 md:pt-32" aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          <motion.p
            className="pill-label text-base md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Lahore’s favourite Sando &amp; Tenders
          </motion.p>

          <SplitHeading
            as="h1"
            id="hero-title"
            immediate
            className="mt-5 font-display text-[clamp(3.75rem,7.4vw,7.25rem)] leading-[0.88] [&>span]:pb-1"
            lines={[
              <span key="a" className="text-ink">
                Home of
              </span>,
              <span key="b" className="inline-block rounded-xl border-2 border-ink bg-chili px-3 pt-2 text-paper md:px-4">
                Red Tenders
              </span>,
            ]}
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            <p className="mt-6 max-w-[34ch] text-lg font-medium leading-snug text-ink">
              Nashville hot chicken, cooked to your heat level. Four branches across Lahore.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-ink">
                Order now <ArrowRightIcon weight="bold" className="size-5" aria-hidden />
              </Link>
              <Link href="/branches" className="btn btn-paper">
                Find a branch
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div style={{ y: reduce ? 0 : showcaseY }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
          >
            <Showcase />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
