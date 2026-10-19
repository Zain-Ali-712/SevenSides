import Link from "next/link";
import { ArrowRightIcon, PhoneIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { Illo } from "@/components/brand/Illo";
import { OpenBadge } from "@/components/branches/OpenBadge";
import { BRANCHES, telHref } from "@/lib/branches";

const TONES = ["bg-mustard", "bg-white", "bg-teal", "bg-white"];

/** Four branch tickets with live open/closed status and Google rating. */
export function BranchesTeaser() {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="branches-teaser">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="branches-teaser" className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
            Four sides of Lahore
            <Illo name="shakes" width={64} className="ml-3 hidden align-middle sm:inline-block" />
            <Illo name="waffle-fries" width={44} delay={0.8} className="ml-1 hidden align-bottom sm:inline-block" />
          </h2>
          <Link href="/branches" className="btn btn-mustard self-start sm:self-auto">
            See them on the map <ArrowRightIcon weight="bold" className="size-5" aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((b, i) => (
            <li key={b.id}>
              <Reveal delay={i * 0.06} className={`${TONES[i]} flex h-full flex-col gap-3 rounded-2xl border-2 border-ink p-5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-tag text-xs font-bold uppercase tracking-wide">{b.area}</p>
                    <h3 className="font-display text-4xl leading-[0.95]">{b.name}</h3>
                  </div>
                  <OpenBadge branch={b} />
                </div>
                <p className="text-sm leading-snug text-ink/75">{b.address}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 font-tag text-sm font-bold">
                    <StarIcon weight="fill" className="size-4" aria-hidden /> {b.rating.toFixed(1)}
                    <span className="font-medium">({b.reviews.toLocaleString("en-PK")})</span>
                  </span>
                  <a
                    href={telHref(b.phone)}
                    className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 font-tag text-xs font-semibold text-paper hover:bg-chili"
                    aria-label={`Call Seven Sides ${b.name}, ${b.phone}`}
                  >
                    <PhoneIcon weight="bold" className="size-4" aria-hidden /> Call
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
