import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/menu/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { Illo } from "@/components/brand/Illo";
import { getProduct, PRODUCTS } from "@/lib/menu";

const PICKS = ["the-sando", "red-tenders", "hot-honey-ranch", "loaded-waffle-fries"];

/** The four signatures inside a mustard menu-board panel. */
export function Signatures() {
  const items = PICKS.map((id) => getProduct(id)!);
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="sig-title">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="relative rounded-3xl border-2 border-ink bg-mustard px-4 pb-6 pt-12 md:px-6">
        <h2 id="sig-title" className="pill-label absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-2xl md:text-3xl">
          The Bird Menu
        </h2>
        <Illo name="tender-stack" width={70} className="absolute -top-14 left-6 hidden sm:block md:left-10" />
        <Illo name="toastie" width={120} delay={0.9} className="absolute -top-12 right-6 hidden sm:block md:right-10" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-tag text-xs font-semibold">All prices are exclusive of taxes.</p>
          <Link href="/menu" className="btn btn-paper">
            Full menu, {PRODUCTS.length} items <ArrowRightIcon weight="bold" className="size-5" aria-hidden />
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
