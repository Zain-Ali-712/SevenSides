"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon, MopedIcon, ShoppingBagIcon, PhoneIcon } from "@phosphor-icons/react";
import { LineThumb, QtyStepper } from "@/components/cart/CartDrawer";
import { Field } from "@/components/auth/AuthDialog";
import { BRANCHES, PREFERRED_BRANCH_KEY, telHref } from "@/lib/branches";
import { formatPrice } from "@/lib/menu";
import { heatLabel, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PHONE_FIELD } from "@/lib/forms";

type Placed = { id: string; branch: string; phone: string; mode: "delivery" | "pickup"; total: number; name: string };

export function CheckoutView() {
  const { lines, subtotal, setQty, clear, user, ready, setAuthOpen } = useStore();
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [branch, setBranch] = useState(BRANCHES[0].id);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(PREFERRED_BRANCH_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the branch picked on /branches
      if (saved && BRANCHES.some((b) => b.id === saved)) setBranch(saved);
    } catch {}
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const total = subtotal; // snapshot: the summary is locked while the order is "sent"
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900)); // pretend to send the order
    const b = BRANCHES.find((x) => x.id === branch)!;
    setPlaced({
      id: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
      branch: b.name,
      phone: b.phone,
      mode,
      total,
      name: String(fd.get("name")).trim().split(/\s+/)[0],
    });
    clear();
    setBusy(false);
    window.scrollTo({ top: 0 });
  }

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="mx-auto max-w-xl rounded-3xl border-2 border-ink bg-white p-8 text-center"
        role="status"
      >
        <CheckCircleIcon weight="fill" className="mx-auto size-16 text-teal" aria-hidden />
        <p className="mt-3 font-display text-6xl leading-none">Order placed, {placed.name}!</p>
        <p className="mt-3 text-lg">
          Order <strong>{placed.id}</strong> for {placed.mode === "delivery" ? "delivery" : "pickup"} from Seven Sides {placed.branch}.
        </p>
        <p className="mt-1 font-display text-3xl text-teal-deep">{formatPrice(placed.total)} + taxes</p>
        <p className="mt-4 rounded-xl bg-mustard-soft px-4 py-3 text-sm">
          This is a demo checkout, so no order was sent. To order for real, call the branch.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={telHref(placed.phone)} className="btn btn-ink">
            <PhoneIcon weight="bold" className="size-5" aria-hidden /> Call {placed.branch}
          </a>
          <Link href="/menu" className="btn btn-paper">
            Back to menu
          </Link>
        </div>
      </motion.div>
    );
  }

  if (ready && lines.length === 0 && !busy) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <p className="font-display text-6xl leading-[0.9]">Your cart is empty</p>
        <p className="mt-3 text-lg text-ink/80">Pick a Sando, some tenders and a heat level first.</p>
        <Link href="/menu" className="btn btn-ink mt-8">
          Order now
        </Link>
      </div>
    );
  }

  const selected = BRANCHES.find((b) => b.id === branch)!;

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]" aria-label="Checkout">
      <div className="grid gap-8">
        {!user && ready && (
          <p className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-ink bg-mustard-soft px-5 py-3 text-sm font-medium">
            Have an account?
            <button type="button" onClick={() => setAuthOpen("signin")} className="font-display text-xl underline decoration-2 underline-offset-4">
              Sign in to fill this in
            </button>
          </p>
        )}

        <fieldset className="rounded-2xl border-2 border-ink bg-white p-5 md:p-6">
          <legend className="font-display text-3xl leading-none">How do you want it?</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {(
              [
                { id: "delivery", label: "Delivery", sub: "To your door", Icon: MopedIcon },
                { id: "pickup", label: "Pickup", sub: "Collect from the branch", Icon: ShoppingBagIcon },
              ] as const
            ).map(({ id, label, sub, Icon }) => (
              <label
                key={id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink p-4 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep",
                  mode === id ? "bg-ink text-paper" : "bg-paper hover:bg-mustard-soft",
                )}
              >
                <input type="radio" name="mode" value={id} checked={mode === id} onChange={() => setMode(id)} className="sr-only" />
                <Icon weight="bold" className="size-8" aria-hidden />
                <span>
                  <span className="block font-display text-3xl leading-none">{label}</span>
                  <span className="text-sm opacity-80">{sub}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="field mt-5 grid gap-1.5">
            <label htmlFor="branch" className="font-tag text-sm font-semibold">
              Branch
            </label>
            <select id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.area})
                </option>
              ))}
            </select>
            <p className="text-sm text-ink/75">
              {selected.address}. Call {selected.phone}.
            </p>
          </div>
        </fieldset>

        <fieldset key={user?.email ?? "guest"} className="grid gap-4 rounded-2xl border-2 border-ink bg-white p-5 md:p-6">
          <legend className="font-display text-3xl leading-none">Your details</legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Full name" autoComplete="name" required minLength={2} defaultValue={user?.name} error="Please enter your name." />
            <Field name="phone" label="Mobile number" required defaultValue={user?.phone} {...PHONE_FIELD} />
          </div>
          <Field name="email" type="email" label="Email (optional)" autoComplete="email" defaultValue={user?.email} error="Enter a valid email, like you@example.com." />
          <AnimatePresence initial={false}>
            {mode === "delivery" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <Field
                  name="address"
                  label="Delivery address"
                  hint="House, street, block and area"
                  autoComplete="street-address"
                  required
                  minLength={8}
                  error="Add your full address so the rider can find you."
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="field grid gap-1.5">
            <label htmlFor="notes" className="font-tag text-sm font-semibold">
              Notes for the kitchen (optional)
            </label>
            <textarea id="notes" name="notes" rows={3} maxLength={240} />
          </div>
        </fieldset>
      </div>

      <aside className="rounded-2xl border-2 border-ink bg-mustard p-5 md:p-6 lg:sticky lg:top-28" aria-label="Order summary">
        <h2 className="font-display text-4xl leading-none">Your order</h2>
        <fieldset disabled={busy} className="contents">
        <legend className="sr-only">Items</legend>
        <ul className="mt-4 grid gap-3">
          {lines.map((l) => (
            <li key={l.key} className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white p-2.5">
              <LineThumb src={l.product.photo?.src} name={l.product.name} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl leading-none">{l.product.name}</p>
                <p className="font-tag text-xs font-semibold text-teal-deep">{[heatLabel(l.heat), l.option].filter(Boolean).join(" / ")}</p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <QtyStepper size="sm" qty={l.qty} onChange={(q) => setQty(l.key, q)} label={l.product.name} />
                  <span className="font-display text-xl">{formatPrice(l.qty * l.product.price)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </fieldset>
        <dl className="mt-5 grid gap-1 border-t-2 border-dashed border-ink pt-4">
          <div className="flex justify-between">
            <dt className="font-tag text-sm font-semibold">Subtotal</dt>
            <dd className="font-display text-2xl">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt>Taxes{mode === "delivery" ? " & delivery" : ""}</dt>
            <dd>Confirmed by the branch</dd>
          </div>
        </dl>
        <button type="submit" disabled={busy || !ready || lines.length === 0} className="btn btn-ink mt-5 w-full">
          {busy ? "Placing order…" : `Place order, ${formatPrice(subtotal)}`}
        </button>
        <p className="mt-3 text-center text-xs">Demo checkout. Cash on {mode === "delivery" ? "delivery" : "pickup"}. No payment is taken.</p>
      </aside>
    </form>
  );
}
