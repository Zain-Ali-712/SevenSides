"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react";
import { HeatMeter } from "@/components/brand/HeatMeter";
import { formatPrice, type HeatLevel, type Product } from "@/lib/menu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function NewTag({ className = "" }: { className?: string }) {
  return <span className={cn("font-display text-base leading-none text-chili", className)}>New!</span>;
}

/** Chip group for flavour / dip choices (Toastie, Churros). */
export function OptionChips({
  label,
  values,
  value,
  onChange,
}: {
  label: string;
  values: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="mb-1.5 font-tag text-xs font-semibold text-ink/70">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <label
            key={v}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1 font-tag text-xs font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep",
              value === v ? "border-ink bg-ink text-paper" : "border-ink bg-white hover:bg-mustard-soft",
            )}
          >
            <input type="radio" className="sr-only" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
            {v}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Add-to-cart button that confirms with a check for a moment. */
export function AddButton({
  onAdd,
  label,
  className = "",
  compact = false,
}: {
  onAdd: () => void;
  label: string;
  className?: string;
  compact?: boolean;
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1200);
    return () => clearTimeout(t);
  }, [done]);
  return (
    <button
      type="button"
      onClick={() => {
        onAdd();
        setDone(true);
      }}
      aria-label={`Add ${label} to cart`}
      className={cn(
        "relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full font-display text-lg tracking-wide transition-[background-color,scale] active:scale-95",
        done ? "bg-teal text-ink" : "bg-ink text-paper hover:bg-chili",
        compact ? "w-10" : "px-4",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? "done" : "add"}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {done ? <CheckIcon weight="bold" className="size-4" aria-hidden /> : <PlusIcon weight="bold" className="size-4" aria-hidden />}
          {!compact && (done ? "Added" : "Add")}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/**
 * Product card: photo on top, name, description, the official heat picker or
 * flavour chips, price and add-to-cart. "wide" lays the photo beside the text.
 */
export function ProductCard({
  product,
  variant = "default",
  className = "",
  priority = false,
}: {
  product: Product;
  variant?: "default" | "wide";
  className?: string;
  priority?: boolean;
}) {
  const { add, qtyOf } = useStore();
  const [heat, setHeat] = useState<HeatLevel>("country-heat");
  const [option, setOption] = useState(product.options?.values[0] ?? "");
  const inCart = qtyOf(product.id);
  const wide = variant === "wide";

  return (
    <article
      className={cn("group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white", wide && "sm:flex-row", className)}
      aria-labelledby={`p-${product.id}`}
    >
      {product.photo && (
        <div className={cn("relative shrink-0 overflow-hidden border-b-2 border-ink bg-ink", wide && "sm:border-b-0 sm:border-r-2", wide ? "aspect-[16/10] sm:aspect-auto sm:w-[44%]" : "aspect-[16/10] sm:aspect-[4/3]")}>
          <Image
            src={product.photo.src}
            alt={product.photo.alt}
            fill
            sizes={wide ? "(min-width: 640px) 360px, 90vw" : "(min-width: 1280px) 280px, (min-width: 640px) 45vw, 90vw"}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col gap-3 p-4", wide && "sm:justify-center sm:p-6")}>
        <div>
          <div className="flex items-baseline gap-2">
            <h3 id={`p-${product.id}`} className={cn("font-display leading-[0.95]", wide ? "text-4xl" : "text-[1.75rem]")}>
              {product.name}
            </h3>
            {product.isNew && <NewTag />}
          </div>
          {product.desc && <p className="mt-1 text-sm leading-snug text-ink/70">{product.desc}</p>}
        </div>

        {product.heat && <HeatMeter size="sm" value={heat} onChange={setHeat} label={`Heat level for ${product.name}`} />}
        {product.options && (
          <OptionChips label={product.options.label} values={product.options.values} value={option} onChange={setOption} />
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <div>
            <p className="font-display text-2xl leading-none text-teal-deep">{formatPrice(product.price)}</p>
            <p className={cn("mt-1 font-tag text-[11px] font-semibold text-ink/60", !inCart && "invisible")} aria-live="polite">
              {inCart} in your cart
            </p>
          </div>
          <AddButton
            label={product.name}
            onAdd={() => add({ id: product.id, heat: product.heat ? heat : undefined, option: product.options ? option : undefined })}
          />
        </div>
      </div>
    </article>
  );
}
