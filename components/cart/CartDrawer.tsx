"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from "@phosphor-icons/react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { heatLabel, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/menu";

export function QtyStepper({
  qty,
  onChange,
  label,
  size = "md",
}: {
  qty: number;
  onChange: (q: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const s = size === "sm" ? "size-8" : "size-10";
  return (
    <div className="inline-flex items-center rounded-full border-2 border-ink bg-white" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={() => onChange(qty - 1)} className={`grid ${s} place-items-center rounded-full hover:bg-mustard-soft`} aria-label={qty === 1 ? `Remove ${label}` : `One less ${label}`}>
        {qty === 1 ? <TrashIcon weight="bold" className="size-4" aria-hidden /> : <MinusIcon weight="bold" className="size-4" aria-hidden />}
      </button>
      <output className="min-w-7 text-center font-display text-xl leading-none" aria-live="polite">
        {qty}
      </output>
      <button type="button" onClick={() => onChange(qty + 1)} disabled={qty >= 20} className={`grid ${s} place-items-center rounded-full hover:bg-mustard-soft disabled:opacity-40`} aria-label={`One more ${label}`}>
        <PlusIcon weight="bold" className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function LineThumb({ src, alt, name }: { src?: string; alt?: string; name: string }) {
  if (src) {
    return (
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-ink">
        <Image src={src} alt={alt ?? ""} fill sizes="64px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="grid size-16 shrink-0 place-items-center rounded-xl border-2 border-ink bg-mustard px-1 text-center font-display text-sm leading-[0.9]" aria-hidden>
      {name}
    </div>
  );
}

export function CartDrawer() {
  const { lines, subtotal, count, setQty, cartOpen, setCartOpen } = useStore();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="w-full max-w-none gap-0 border-l-2 border-ink bg-paper p-0 sm:max-w-md"
        data-lenis-prevent
      >
        <div className="flex items-center gap-3 border-b-2 border-ink bg-mustard px-6 py-5 pr-14">
          <ShoppingBagIcon weight="bold" className="size-7" aria-hidden />
          <SheetTitle className="font-display text-4xl leading-none font-normal">Your order</SheetTitle>
          <span className="ml-auto pill-label text-lg">{count} {count === 1 ? "item" : "items"}</span>
        </div>
        <SheetDescription className="sr-only">Items in your Seven Sides cart</SheetDescription>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-5xl leading-none">Nothing hot in here yet</p>
            <p className="max-w-[28ch] text-muted-foreground">Start with The Sando or a box of Red Tenders and pick your heat.</p>
            <Link href="/menu" onClick={() => setCartOpen(false)} className="btn btn-ink">
              Order now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li
                    key={l.key}
                    layout
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
                    className="flex gap-3 rounded-2xl border-2 border-ink bg-white p-3"
                  >
                    <LineThumb src={l.product.photo?.src} alt="" name={l.product.name} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-2xl leading-none">{l.product.name}</p>
                      <p className="mt-1 font-tag text-xs font-semibold text-teal-deep">
                        {[heatLabel(l.heat), l.option].filter(Boolean).join(" / ") || " "}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QtyStepper size="sm" qty={l.qty} onChange={(q) => setQty(l.key, q)} label={l.product.name} />
                        <span className="font-display text-xl tabular-nums text-teal-deep">{formatPrice(l.qty * l.product.price)}</span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t-2 border-ink bg-white px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl">Subtotal</span>
                <span className="font-display text-3xl tabular-nums text-teal-deep">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">All prices are exclusive of taxes.</p>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn btn-ink mt-4 w-full">
                Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
