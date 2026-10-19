"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { ProductCard, AddButton, NewTag, OptionChips } from "@/components/menu/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { Illo, type IlloName } from "@/components/brand/Illo";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { CATEGORIES, PRODUCTS, formatPrice, type Category, type Product } from "@/lib/menu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const CARD_CATEGORIES = new Set(["bird", "sliders", "tenders", "wraps", "fries"]);

/** A single line on a menu-board panel (shakes, treats, drinks, sauces...). */
function BoardRow({ product }: { product: Product }) {
  const { add } = useStore();
  const [option, setOption] = useState(product.options?.values[0] ?? "");
  return (
    <li className="grid gap-2 border-b border-dashed border-ink/40 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-baseline gap-x-2 font-display text-2xl leading-none">
            {product.name}
            {product.isNew && <NewTag />}
          </p>
          {product.desc && <p className="mt-1 text-sm leading-snug text-ink/75">{product.desc}</p>}
        </div>
        <span className="font-display text-xl text-teal-deep">{formatPrice(product.price)}</span>
        <AddButton compact label={option ? `${product.name}, ${option}` : product.name} onAdd={() => add({ id: product.id, option: product.options ? option : undefined })} />
      </div>
      {product.options && (
        <OptionChips label={product.options.label} values={product.options.values} value={option} onChange={setOption} />
      )}
    </li>
  );
}

/** Drawing that sits on each panel's corner, as on the printed menu board. */
const PANEL_ART: Partial<Record<Category["id"], { name: IlloName; width: number; top?: string }>> = {
  shakes: { name: "shakes", width: 78, top: "-top-16" },
  treats: { name: "toastie", width: 128 },
  extras: { name: "mac-buckets", width: 150 },
  meal: { name: "waffle-fries", width: 70 },
};

function BoardPanel({ category, items }: { category: Category; items: Product[] }) {
  const art = PANEL_ART[category.id];
  return (
    <div
      className={cn(
        "relative break-inside-avoid rounded-2xl border-2 border-ink px-5 pb-3 pt-9 md:px-6",
        category.tone === "mustard" ? "bg-mustard" : "bg-white",
      )}
    >
      <h2 className="pill-label absolute -top-4 left-5 whitespace-nowrap text-xl md:text-2xl">{category.name}</h2>
      {art && <Illo name={art.name} width={art.width} className={cn("absolute -right-3 z-10 md:-right-5", art.top ?? "-top-12")} />}
      <ul className={cn(art && "pt-4")}>
        {items.map((p) => (
          <BoardRow key={p.id} product={p} />
        ))}
      </ul>
      {category.id === "sauces" && <p className="mt-1 font-tag text-xs font-semibold">Every sauce Rs. 120.</p>}
    </div>
  );
}

export function MenuView() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const sections = useRef(new Map<string, HTMLElement>());
  const navRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? PRODUCTS.filter((p) => `${p.name} ${p.desc ?? ""} ${CATEGORIES.find((c) => c.id === p.category)?.name ?? ""}`.toLowerCase().includes(q)) : PRODUCTS),
    [q],
  );
  const groups = CATEGORIES.map((c) => ({ category: c, items: filtered.filter((p) => p.category === c.id) })).filter((g) => g.items.length);

  // Scroll-spy for the category bar.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.cat!);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups.length, q]);

  // Above the first section, the first chip is active.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const first = sections.current.get(groups[0]?.category.id ?? "");
    if (first && y + window.innerHeight * 0.35 < first.getBoundingClientRect().top + y) setActive(groups[0].category.id);
  });

  // Keep the active chip visible in the horizontally scrolling bar.
  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  const cardGroups = groups.filter((g) => CARD_CATEGORIES.has(g.category.id));
  const boardGroups = groups.filter((g) => !CARD_CATEGORIES.has(g.category.id));
  // Pair neighbouring single-item categories (Wraps + Fries) so no row is half empty.
  const rows: (typeof cardGroups)[] = [];
  for (const g of cardGroups) {
    const last = rows[rows.length - 1];
    const solo = g.items.length === 1 && g.category.id !== "bird";
    if (solo && last && last.length === 1 && last[0].items.length === 1 && last[0].category.id !== "bird") last.push(g);
    else rows.push([g]);
  }
  const register = (id: string) => (el: HTMLElement | null) => {
    if (el) sections.current.set(id, el);
    else sections.current.delete(id);
  };

  return (
    <div className="bg-paper">
      {/* sticky category bar + search */}
      <div className="sticky top-[84px] z-30 border-b-2 border-ink bg-paper/95 backdrop-blur-sm md:top-[96px]">
        <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-4 py-3 md:px-6">
          <div ref={navRef} className="flex flex-1 gap-2 overflow-x-auto [scrollbar-width:none]" role="navigation" aria-label="Menu categories">
            {groups.map(({ category }) => (
              <button
                key={category.id}
                type="button"
                data-chip={category.id}
                aria-current={active === category.id ? "true" : undefined}
                onClick={() => {
                  const el = sections.current.get(category.id);
                  if (el) scrollToTarget(el, -170);
                }}
                className={cn(
                  "shrink-0 rounded-full border-2 border-ink px-4 py-1.5 font-display text-lg tracking-wide transition-colors",
                  active === category.id ? "bg-ink text-paper" : "bg-white hover:bg-mustard-soft",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
          <label className="relative hidden w-56 shrink-0 md:block">
            <span className="sr-only">Search the menu</span>
            <MagnifyingGlassIcon weight="bold" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: tenders, sando…"
              className="h-11 w-full rounded-full border-2 border-ink bg-white pl-10 pr-9 text-sm focus-visible:border-teal-deep focus-visible:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-mustard-soft" aria-label="Clear search">
                <XIcon weight="bold" className="size-4" aria-hidden />
              </button>
            )}
          </label>
        </div>
        <label className="relative mx-4 mb-3 block md:hidden">
          <span className="sr-only">Search the menu</span>
          <MagnifyingGlassIcon weight="bold" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: tenders, sando…"
            className="h-11 w-full rounded-full border-2 border-ink bg-white pl-10 pr-4 text-base focus-visible:border-teal-deep focus-visible:outline-none"
          />
        </label>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 pb-28 pt-14 md:px-6">
        <p className="sr-only" aria-live="polite">
          {q ? `${filtered.length} items match ${query}` : ""}
        </p>

        <AnimatePresence>
          {groups.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto max-w-md py-20 text-center">
              <p className="font-display text-6xl leading-none">Nothing called &ldquo;{query}&rdquo;</p>
              <p className="mt-3 text-ink/75">Try &ldquo;tenders&rdquo;, &ldquo;sando&rdquo; or &ldquo;shake&rdquo;.</p>
              <button type="button" onClick={() => setQuery("")} className="btn btn-mustard mt-6">
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-20">
          {rows.map((row) => (
            <div key={row.map((g) => g.category.id).join("+")} className={cn("grid gap-x-8 gap-y-20", row.length > 1 && "md:grid-cols-2")}>
              {row.map(({ category, items }) => {
                const solo = items.length === 1;
                return (
                  <section key={category.id} ref={register(category.id)} data-cat={category.id} aria-labelledby={`cat-${category.id}`}>
                    <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
                      <h2 id={`cat-${category.id}`} className="font-display text-5xl leading-[0.9] md:text-6xl">
                        {category.name}
                      </h2>
                      <span className="mini-tag shrink-0">
                        {items.length} {items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "grid gap-6",
                        row.length > 1 ? "sm:grid-cols-2" : solo && category.id === "bird" ? "max-w-3xl" : "sm:grid-cols-2 lg:grid-cols-4",
                      )}
                    >
                      {items.map((p, i) => (
                        <Reveal key={p.id} delay={(i % 4) * 0.06}>
                          <ProductCard
                            product={p}
                            variant={solo && row.length === 1 ? "wide" : "default"}
                            priority={category.id === "bird"}
                          />
                        </Reveal>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ))}
        </div>

        {boardGroups.length > 0 && (
          <div className={cn("columns-1 gap-8 md:columns-2", cardGroups.length && "mt-24")}>
            {boardGroups.map(({ category, items }) => (
              <section
                key={category.id}
                ref={register(category.id)}
                data-cat={category.id}
                aria-label={category.name}
                className="mb-12 break-inside-avoid pt-5"
              >
                <BoardPanel category={category} items={items} />
              </section>
            ))}
          </div>
        )}

        <p className="mt-6 text-center font-tag text-sm font-semibold">*All prices are exclusive of taxes.</p>
      </div>
    </div>
  );
}
