import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Flat cartoon food drawings cut from the official Seven Sides menu board
 * (instagram.com/sevensides.pk, post DWXXoPHDBqt). Decorative only.
 */
export const ILLOS = {
  sando: { w: 326, h: 352 },
  "tender-stack": { w: 182, h: 224 },
  "waffle-fries": { w: 144, h: 148 },
  shakes: { w: 280, h: 336 },
  toastie: { w: 262, h: 160 },
  "mac-buckets": { w: 426, h: 208 },
} as const;

export type IlloName = keyof typeof ILLOS;

export function Illo({
  name,
  width,
  className = "",
  float = true,
  delay = 0,
}: {
  name: IlloName;
  /** Rendered width in px; height follows the drawing's ratio. */
  width: number;
  className?: string;
  float?: boolean;
  delay?: number;
}) {
  const { w, h } = ILLOS[name];
  return (
    <Image
      src={`/illustrations/${name}.png`}
      alt=""
      aria-hidden
      width={w}
      height={h}
      sizes={`${width}px`}
      draggable={false}
      style={{ width, height: "auto", animationDelay: `${delay}s` }}
      className={cn("pointer-events-none select-none", float && "illo-float", className)}
    />
  );
}
