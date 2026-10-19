"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ListIcon, ShoppingBagIcon, UserCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { BRANCHES, telHref } from "@/lib/branches";
import { cn } from "@/lib/utils";
import { FULL_NAV, NAV } from "./nav";


export function Header() {
  const pathname = usePathname();
  const { count, setCartOpen, user, setAuthOpen, ready } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
      <a
        href="#main"
        className="btn btn-paper sr-only text-base focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-20"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 rounded-full border-2 border-ink bg-mustard py-2 pl-5 pr-2 md:h-[72px] md:pl-7"
      >
        <Link href="/" aria-label="Seven Sides home" className="flex items-center rounded-md text-[30px] md:text-[34px]">
          {/* Nudge so the Bebas caps are optically centred in the pill (measured). */}
          <Wordmark className="translate-y-[0.06em]" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-display text-xl tracking-wide transition-colors hover:bg-ink/10",
                    active && "bg-ink text-paper hover:bg-ink",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAuthOpen("signin")}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 font-tag text-sm font-semibold hover:bg-ink/10 sm:flex"
          >
            <UserCircleIcon weight="bold" className="size-5" aria-hidden />
            {ready && user ? `Hi, ${user.name.split(" ")[0]}` : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-12 items-center gap-2 rounded-full bg-ink px-4 font-display text-xl tracking-wide text-paper transition-transform active:scale-[0.97] md:h-[52px] md:px-5"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBagIcon weight="bold" className="size-5" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence initial={false}>
              {ready && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="grid h-6 min-w-6 place-items-center rounded-full bg-chili px-1 font-tag text-xs font-bold text-white"
                  aria-hidden
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-12 place-items-center rounded-full border-2 border-ink bg-paper md:hidden"
            aria-label="Open menu"
          >
            <ListIcon weight="bold" className="size-6" aria-hidden />
          </button>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-none border-l-2 border-ink bg-teal p-0 sm:max-w-sm" data-lenis-prevent>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <div className="flex h-full flex-col gap-8 overflow-y-auto px-6 pb-8 pt-20">
            <ul className="flex flex-col gap-3">
              {FULL_NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === n.href ? "page" : undefined}
                    className="block font-display text-5xl leading-none text-ink aria-[current=page]:text-paper"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setAuthOpen("signin");
              }}
              className="btn btn-paper self-start"
            >
              <UserCircleIcon weight="bold" className="size-5" aria-hidden />
              {ready && user ? `Hi, ${user.name.split(" ")[0]}` : "Sign in"}
            </button>
            <div className="mt-auto grid gap-2 font-tag text-sm text-ink">
              {BRANCHES.map((b) => (
                <a key={b.id} href={telHref(b.phone)} className="flex justify-between rounded-lg bg-paper/90 px-3 py-2 font-semibold">
                  <span>{b.name}</span>
                  <span className="text-teal-deep">{b.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
