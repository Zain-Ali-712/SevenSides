"use client";

import { useId } from "react";
import { PepperIcon } from "@phosphor-icons/react";
import { HEAT_LEVELS, type HeatLevel } from "@/lib/menu";
import { cn } from "@/lib/utils";

export function Chillies({ count, className = "" }: { count: number; className?: string }) {
  if (count === 0) return <PepperIcon weight="regular" className={cn("size-4 text-ink/60", className)} aria-hidden />;
  return (
    <span className={cn("inline-flex", className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <PepperIcon key={i} weight="fill" className={cn("-mx-px size-4", count >= 3 ? "text-chili" : "text-ember")} />
      ))}
    </span>
  );
}

/** The official heat scale (No Heat / Country Heat / Screamer) as a native radio group. */
export function HeatMeter({
  value,
  onChange,
  size = "md",
  label = "Choose your heat level",
  className = "",
}: {
  value: HeatLevel;
  onChange: (v: HeatLevel) => void;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const name = useId();
  const sm = size === "sm";
  return (
    <fieldset className={className}>
      <legend className="sr-only">{label}</legend>
      <div className="grid grid-cols-3 gap-1 rounded-full border-2 border-ink bg-paper p-1">
        {HEAT_LEVELS.map((h) => {
          const checked = value === h.id;
          return (
            <label
              key={h.id}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-1 rounded-full font-tag font-semibold transition-colors",
                sm ? "px-1 py-1.5 text-[11px]" : "px-2 py-2 text-xs",
                checked ? (h.id === "screamer" ? "bg-chili text-white" : "bg-ink text-paper") : "text-ink/75 hover:bg-mustard-soft",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep",
              )}
            >
              <input type="radio" name={name} value={h.id} checked={checked} onChange={() => onChange(h.id)} className="sr-only" />
              <span className="whitespace-nowrap">{h.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
