import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ScrollWords, Reveal } from "@/components/motion/Reveal";

/** Their own words (official Facebook post, 11 May 2026), lit up on scroll. */
export function StoryTeaser() {
  return (
    <section className="bg-teal py-20 md:py-28" aria-labelledby="story-teaser">
      <h2 id="story-teaser" className="sr-only">
        Our story
      </h2>
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <ScrollWords
            className="font-display text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[0.95] text-ink"
            text="Before everyone started calling sandwiches Sando, and before Nashville tenders became a staple item in every fast food menu, there was Seven Sides."
          />
          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/story" className="btn btn-ink">
              Read our story <ArrowRightIcon weight="bold" className="size-5" aria-hidden />
            </Link>
            <p className="font-tag text-sm font-semibold text-ink">From one DHA kitchen in 2023 to four branches.</p>
          </Reveal>
        </div>
        <Reveal className="mx-auto w-full max-w-[300px]" delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-ink">
            <Image
              src="/images/store-illustration.webp"
              alt="Seven Sides illustration of the storefront with the Home of Red Tenders sign"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
