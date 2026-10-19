"use client";

import { useId, useState } from "react";
import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useStore, type User } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PHONE_FIELD } from "@/lib/forms";

/**
 * Dummy auth. Accounts live in localStorage only; passwords are stored as a
 * SHA-256 digest so the demo never keeps plain text. Nothing leaves the browser.
 */
const ACCOUNTS_KEY = "ss-accounts";
type Account = User & { hash: string };

async function digest(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function accounts(): Account[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function Field({
  label,
  hint,
  error,
  className = "",
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error: string; name: string }) {
  const id = `${useId()}-${input.name}`;
  return (
    <div className={cn("field grid gap-1.5", className)}>
      <label htmlFor={id} className="font-tag text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </span>
      )}
      <input id={id} spellCheck={input.type === "email" ? false : undefined} aria-describedby={hint ? `${id}-hint` : undefined} aria-errormessage={`${id}-err`} {...input} />
      <span id={`${id}-err`} className="field-error">
        {error}
      </span>
    </div>
  );
}

export function AuthDialog() {
  const { authOpen, setAuthOpen, user, signIn, signOut } = useStore();
  const mode = authOpen || "signin";
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")).trim().toLowerCase();
    const password = String(fd.get("password"));
    setBusy(true);
    setMessage(null);
    const hash = await digest(`${email}:${password}`);
    const list = accounts();
    const existing = list.find((a) => a.email === email);
    if (mode === "signup") {
      if (existing) {
        setMessage("That email already has an account. Sign in instead.");
      } else {
        const account: Account = { name: String(fd.get("name")).trim(), email, phone: String(fd.get("phone") || ""), hash };
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...list, account]));
        signIn({ name: account.name, email, phone: account.phone });
        setAuthOpen(false);
      }
    } else if (!existing || existing.hash !== hash) {
      setMessage("Email or password doesn’t match. Try again or create an account.");
    } else {
      signIn({ name: existing.name, email, phone: existing.phone });
      setAuthOpen(false);
    }
    setBusy(false);
  }

  return (
    <Dialog
      open={!!authOpen}
      onOpenChange={(o) => {
        setAuthOpen(o ? mode : false);
        setMessage(null);
      }}
    >
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-0 ring-0 sm:max-w-md" data-lenis-prevent>
        <div className="border-b-2 border-ink bg-teal px-6 pb-5 pt-7">
          <DialogTitle className="font-display text-5xl leading-[0.9] font-normal text-ink">
            {user ? "Your account" : mode === "signup" ? "Join the flock" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="mt-1 text-ink">
            {user ? "Signed in on this device." : "Save your details for faster checkout."}
          </DialogDescription>
        </div>

        {user ? (
          <div className="grid gap-4 p-6">
            <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4">
              <UserCircleIcon weight="duotone" className="size-12 text-teal-deep" aria-hidden />
              <div>
                <p className="font-display text-3xl leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-paper"
              onClick={() => {
                signOut();
                setAuthOpen(false);
              }}
            >
              <SignOutIcon weight="bold" className="size-5" aria-hidden /> Sign out
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div role="tablist" aria-label="Account" className="mb-5 grid grid-cols-2 rounded-full border-2 border-ink bg-white p-1">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  type="button"
                  aria-selected={mode === m}
                  onClick={() => {
                    setAuthOpen(m);
                    setMessage(null);
                  }}
                  className={cn("rounded-full py-2 font-display text-xl", mode === m ? "bg-ink text-paper" : "hover:bg-mustard-soft")}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
            <form key={mode} onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
              {mode === "signup" && (
                <Field name="name" label="Full name" autoComplete="name" required minLength={2} error="Please enter your name." />
              )}
              <Field name="email" type="email" label="Email" autoComplete="email" required error="Enter a valid email, like you@example.com." />
              {mode === "signup" && (
                <Field name="phone" label="Mobile number" required {...PHONE_FIELD} />
              )}
              <Field
                name="password"
                type="password"
                label="Password"
                hint={mode === "signup" ? "At least 6 characters" : undefined}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
                minLength={6}
                error="Password needs at least 6 characters."
              />
              {message && (
                <p role="alert" className="rounded-xl border-2 border-chili bg-[#fdecea] px-3 py-2 text-sm font-medium text-[#a3151b]">
                  {message}
                </p>
              )}
              <button type="submit" className="btn btn-ink mt-1 w-full" disabled={busy}>
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
              <p className="text-center text-xs text-muted-foreground">Demo account. Stored only in this browser.</p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
