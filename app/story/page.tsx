import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/layout/PageHero";
import { Timeline } from "@/components/story/Timeline";
import { Reveal, ScrollWords } from "@/components/motion/Reveal";
import { Chillies } from "@/components/brand/HeatMeter";
import { Illo } from "@/components/brand/Illo";
import { BRANCHES } from "@/lib/branches";
import { HEAT_LEVELS } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Our Story",
  description: "From one DHA Phase 5 kitchen in 2023 to four branches across Lahore: the Seven Sides journey.",
};

const reviews = BRANCHES.reduce((n, b) => n + b.reviews, 0);

const STATS = [
  { value: "4", label: "branches across Lahore", tone: "bg-mustard" },
  { value: "94K", label: "followers on Instagram", tone: "bg-white" },
  { value: reviews.toLocaleString("en-PK"), label: "Google reviews across branches", tone: "bg-teal" },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        tone="mustard"
        label="Since 2023"
        title={["Our story"]}
        intro="Nashville hot chicken, started in a DHA Phase 5 kitchen in 2023."
        art={[
          { kind: "photo", src: "/images/sando-tray.webp", alt: "", className: "left-[4%] top-[2%] aspect-[4/5] w-[40%]", rotate: -4 },
          { kind: "photo", src: "/images/store-illustration.webp", alt: "", className: "right-[6%] top-[12%] aspect-[4/5] w-[34%]", rotate: 3 },
          { kind: "illo", name: "toastie", width: 150, className: "bottom-[2%] left-[28%] w-[34%]!" },
          { kind: "illo", name: "tender-stack", width: 70, className: "right-0 top-0 w-[15%]!" },
          { kind: "illo", name: "waffle-fries", width: 60, className: "bottom-[8%] left-0 w-[14%]!" },
        ]}
      />

      <section className="bg-ink py-24 text-paper md:py-36" aria-labelledby="claim">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:px-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 id="claim" className="pill-label !bg-mustard text-xl !text-ink">In our words</h2>
            <ScrollWords
              className="mt-8 font-display text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[0.95]"
              text="Before everyone started calling sandwiches Sando, and before Nashville tenders became a staple item in every fast food menu, there was Seven Sides."
            />
            <p className="mt-6 font-tag text-sm text-paper/70">Seven Sides on Facebook, May 2026</p>
          </div>
          <Reveal className="relative mx-auto w-full max-w-[300px]">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-ink">
                <Image src="/images/sando-cut.webp" alt="A Sando pulled apart by gloved hands" fill sizes="300px" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Timeline />

      <section className="bg-teal py-20 md:py-28" aria-labelledby="heat-origin">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <h2 id="heat-origin" className="max-w-[16ch] font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
            One scale, three ways to sweat
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {HEAT_LEVELS.map((h, i) => (
              <li key={h.id}>
                <Reveal delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-paper p-5">
                    <Chillies count={h.chillies} className="[&_svg]:size-8" />
                    <p className="font-display text-4xl leading-none">{h.label}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[52ch] text-lg font-medium text-ink">
            Every Sando, Hot Chicken slider and box of Red Tenders comes at the heat you pick, straight off the menu board.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="numbers">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <h2 id="numbers" className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
            Lahore showed up
            <Illo name="sando" width={84} className="ml-4 hidden align-middle sm:inline-block" />
            <Illo name="mac-buckets" width={110} delay={0.7} className="ml-2 hidden align-bottom sm:inline-block" />
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
            {STATS.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 0.08}>
                  <div className={`${s.tone} rounded-2xl border-2 border-ink p-6`}>
                    <p className="font-display text-[clamp(4rem,7vw,6rem)] leading-[0.85]">{s.value}</p>
                    <p className="mt-3 font-tag text-sm font-bold uppercase tracking-wide">{s.label}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-tag text-xs text-ink/70">Instagram and Google Maps figures as of October 2026.</p>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="/menu" className="btn btn-ink">
              Order now <ArrowRightIcon weight="bold" className="size-5" aria-hidden />
            </Link>
            <Link href="/branches" className="btn btn-mustard">
              Find a branch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
