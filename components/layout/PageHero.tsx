import Image from "next/image";
import { Illo, type IlloName } from "@/components/brand/Illo";
import { SplitHeading } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** One piece of hero art: a menu-board drawing or a small framed official photo. */
export type ArtPiece =
  | { kind: "illo"; name: IlloName; className: string; width: number; delay?: number }
  | { kind: "photo"; src: string; alt: string; className: string; rotate?: number };

/** Inner-page hero: big Bebas title on a solid brand colour, with a collage of menu-board art. */
export function PageHero({
  title,
  label,
  intro,
  tone = "teal",
  art = [],
  children,
}: {
  title: React.ReactNode[];
  label?: string;
  intro?: string;
  tone?: "teal" | "mustard";
  art?: ArtPiece[];
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40", tone === "teal" ? "bg-teal" : "bg-mustard")}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 md:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {label && <p className="pill-label text-base md:text-lg">{label}</p>}
          <SplitHeading as="h1" immediate className="mt-4 font-display text-[clamp(3.75rem,9vw,8rem)] leading-[0.88] text-ink" lines={title} />
          {intro && <p className="mt-5 max-w-[46ch] text-lg font-medium leading-snug text-ink">{intro}</p>}
          {children}
        </div>
        {art.length > 0 && (
          <div className="relative mx-auto h-[240px] w-full max-w-[460px] sm:h-[300px] lg:h-[340px]" aria-hidden>
            {art.map((a, i) =>
              a.kind === "illo" ? (
                <Illo key={i} name={a.name} width={a.width} delay={a.delay ?? i * 0.4} className={cn("absolute", a.className)} />
              ) : (
                <div
                  key={i}
                  className={cn("absolute overflow-hidden rounded-2xl border-2 border-ink bg-ink", a.className)}
                  style={{ rotate: `${a.rotate ?? 0}deg` }}
                >
                  <Image src={a.src} alt="" fill sizes="200px" className="object-cover" />
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
