import { cn } from "@/lib/utils";

/**
 * The Seven Sides wordmark exactly as on the official logo: SEVEN over SIDES,
 * set in Bebas Neue (the logo's typeface) in brand teal.
 */
export function Wordmark({ className = "", tone = "teal" }: { className?: string; tone?: "teal" | "ink" | "paper" | "mustard" }) {
  const color = { teal: "text-teal", ink: "text-ink", paper: "text-paper", mustard: "text-mustard" }[tone];
  return (
    <span translate="no" className={cn("inline-flex flex-col items-center font-display uppercase leading-[0.8]", color, className)}>
      <span className="text-[0.82em] tracking-[0.02em]">Seven</span>
      <span>Sides</span>
    </span>
  );
}
