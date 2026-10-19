"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useStore } from "@/lib/store";

/** Short confirmation after adding to cart, with a shortcut to open the cart. */
export function AddedToast() {
  const { lastAdded, setCartOpen, cartOpen } = useStore();
  const [dismissed, setDismissed] = useState<number | null>(null);
  const shown = lastAdded && lastAdded.at !== dismissed ? lastAdded : null;

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setDismissed(lastAdded.at), 2600);
    return () => clearTimeout(t);
  }, [lastAdded]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {shown && !cartOpen && (
          <motion.div
            key={shown.at}
            initial={{ y: 40, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border-2 border-ink bg-ink py-2 pl-3 pr-2 text-paper"
          >
            <CheckCircleIcon weight="fill" className="size-6 text-teal" aria-hidden />
            <span className="font-tag text-sm font-semibold">{shown.name} added</span>
            <button type="button" onClick={() => setCartOpen(true)} className="rounded-full bg-mustard px-4 py-1.5 font-display text-lg text-ink">
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
