import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";
import { Illo } from "@/components/brand/Illo";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="min-h-[80dvh] bg-paper px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h1 className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.9]">Checkout</h1>
          <div className="flex items-end gap-3" aria-hidden>
            <Illo name="tender-stack" width={56} className="hidden sm:block" />
            <Illo name="sando" width={92} delay={0.6} />
            <Illo name="shakes" width={70} delay={1.2} className="hidden sm:block" />
          </div>
        </div>
        <CheckoutView />
      </div>
    </section>
  );
}
