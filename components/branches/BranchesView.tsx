"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRightIcon,
  ForkKnifeIcon,
  MopedIcon,
  PhoneIcon,
  ShoppingBagIcon,
  StarIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import { OpenBadge } from "@/components/branches/OpenBadge";
import { BRANCHES, DAYS, formatHours, lahoreNow, PREFERRED_BRANCH_KEY, telHref } from "@/lib/branches";
import { cn } from "@/lib/utils";

const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center bg-teal/30 font-display text-3xl">Loading map…</div>,
});

const SERVICE_ICON: Record<string, typeof ForkKnifeIcon> = { "Dine-in": ForkKnifeIcon, Takeaway: ShoppingBagIcon, Delivery: MopedIcon };

export function BranchesView() {
  const [active, setActive] = useState(0);
  const [today, setToday] = useState<number | null>(null);
  // Read the clock after hydration so server and client markup match.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client clock read
  useEffect(() => setToday(lahoreNow().day), []);

  return (
    <section className="bg-paper py-16 md:py-24" aria-label="Branch finder">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative order-1 h-[52dvh] min-h-[340px] overflow-hidden rounded-2xl border-2 border-ink lg:sticky lg:top-28 lg:order-2 lg:h-[calc(100dvh-9rem)]">
          <BranchMap branches={BRANCHES} active={active} onSelect={setActive} />
        </div>

        <ol className="order-2 grid gap-5 lg:order-1">
          {BRANCHES.map((b, i) => {
            const open = i === active;
            return (
              <li key={b.id}>
                <article
                  className={cn(
                    "rounded-2xl border-2 border-ink transition-colors duration-300",
                    open ? "bg-mustard" : "bg-white hover:bg-mustard-soft",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    aria-controls={`branch-${b.id}`}
                    className="flex w-full items-start gap-4 p-5 text-left"
                  >
                    <span className={cn("grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-xl", open ? "bg-chili text-white" : "bg-teal text-white")}>
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-tag text-xs font-bold uppercase tracking-wide">{b.area}</span>
                      <span className="block font-display text-4xl leading-[0.95]">{b.name}</span>
                      <span className="mt-1 block text-sm text-ink/80">{b.address}</span>
                    </span>
                    <OpenBadge branch={b} />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`branch-${b.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 border-t-2 border-dashed border-ink px-5 pb-5 pt-4 sm:grid-cols-[1fr_auto]">
                          <div className="grid gap-4">
                            <ul className="flex flex-wrap gap-2" aria-label="Services">
                              {b.services.map((s) => {
                                const Icon = SERVICE_ICON[s] ?? StorefrontIcon;
                                return (
                                  <li key={s} className="mini-tag">
                                    <Icon weight="bold" className="size-4" aria-hidden /> {s}
                                  </li>
                                );
                              })}
                            </ul>
                            <table className="w-full max-w-sm font-tag text-sm">
                              <caption className="sr-only">Opening hours for {b.name}</caption>
                              <tbody>
                                {b.hours.map((h, d) => (
                                  <tr key={d} className={cn(d === today && "font-bold")}>
                                    <th scope="row" className="py-0.5 pr-4 text-left font-semibold">
                                      {DAYS[d]}
                                      {d === today && <span className="ml-1.5 rounded bg-ink px-1.5 py-0.5 text-[10px] text-paper">Today</span>}
                                    </th>
                                    <td className="py-0.5">{formatHours(h)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <p className="flex items-center gap-1.5 font-tag text-sm font-semibold">
                              <StarIcon weight="fill" className="size-4" aria-hidden /> {b.rating.toFixed(1)} on Google from {b.reviews.toLocaleString("en-PK")} reviews
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <a href={telHref(b.phone)} className="btn btn-ink text-base">
                                <PhoneIcon weight="bold" className="size-5" aria-hidden /> {b.phone}
                              </a>
                              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-paper text-base">
                                Directions <ArrowUpRightIcon weight="bold" className="size-5" aria-hidden />
                                <span className="sr-only">(opens Google Maps in a new tab)</span>
                              </a>
                              <Link
                                href="/menu"
                                onClick={() => {
                                  try {
                                    sessionStorage.setItem(PREFERRED_BRANCH_KEY, b.id);
                                  } catch {}
                                }}
                                className="btn btn-paper text-base"
                              >
                                Order from here
                              </Link>
                            </div>
                          </div>
                          {b.photo && (
                            <div className="relative hidden aspect-[3/4] w-32 overflow-hidden rounded-xl border-2 border-ink sm:block">
                              <Image src={b.photo.src} alt={b.photo.alt} fill sizes="160px" className="object-cover" />
                            </div>
                          )}
                        </div>
                        {b.note && <p className="px-5 pb-5 font-tag text-xs font-bold uppercase">{b.note}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
