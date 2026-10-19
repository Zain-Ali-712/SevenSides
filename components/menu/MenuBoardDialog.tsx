"use client";

import Image from "next/image";
import { ImageIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/** Opens the official menu board image as posted on Instagram. */
export function MenuBoardDialog() {
  return (
    <Dialog>
      <DialogTrigger className="btn btn-paper mt-8">
        <ImageIcon weight="bold" className="size-5" aria-hidden /> See the menu board
      </DialogTrigger>
      <DialogContent className="max-h-[92dvh] gap-3 overflow-y-auto rounded-2xl border-2 border-ink bg-paper p-4 ring-0 sm:max-w-xl" data-lenis-prevent>
        <DialogTitle className="font-display text-4xl font-normal">The menu board</DialogTitle>
        <DialogDescription className="-mt-2 text-sm">As posted on @sevensides.pk, March 2026.</DialogDescription>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-ink">
          <Image
            src="/images/menu-board.webp"
            alt="Seven Sides menu board: Bird Menu, Sliders, Tenders, Wraps, Hand Cut Fries, Hand Spun Shakes, SS Treats, Extras, Make It A Meal, Drinks and Sauce with prices"
            fill
            sizes="(min-width: 640px) 560px, 92vw"
            className="object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
