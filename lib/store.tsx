"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, HEAT_LEVELS, type HeatLevel, type Product } from "./menu";

/** A cart line is one product with one set of choices (heat level, flavour/dip). */
export type Line = { key: string; id: string; qty: number; heat?: HeatLevel; option?: string };
export type User = { name: string; email: string; phone?: string };

type AddInput = { id: string; qty?: number; heat?: HeatLevel; option?: string };

type Store = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (input: AddInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  authOpen: false | "signin" | "signup";
  setAuthOpen: (v: false | "signin" | "signup") => void;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  lastAdded: { name: string; at: number } | null;
};

const StoreContext = createContext<Store | null>(null);

const CART_KEY = "ss-cart"; // sessionStorage: cart lives for the tab session
const USER_KEY = "ss-user"; // localStorage: dummy account survives reloads

export const lineKey = (id: string, heat?: HeatLevel, option?: string) => [id, heat ?? "", option ?? ""].join("|");

export const heatLabel = (h?: HeatLevel) => HEAT_LEVELS.find((x) => x.id === h)?.label;

function read<T>(storage: () => Storage, key: string, fallback: T): T {
  try {
    const raw = storage().getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(storage: () => Storage, key: string, value: unknown) {
  try {
    if (value === null) storage().removeItem(key);
    else storage().setItem(key, JSON.stringify(value));
  } catch {}
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<false | "signin" | "signup">(false);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<Store["lastAdded"]>(null);

  useEffect(() => {
    // Browser storage only exists after hydration; read it once on mount.
    // Drop lines whose product no longer exists in the menu.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage/localStorage
    setRaw(read<Line[]>(session, CART_KEY, []).filter((l) => getProduct(l.id) && l.qty > 0).map((l) => ({ ...l, qty: Math.min(20, l.qty) })));
    setUser(read<User | null>(local, USER_KEY, null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(session, CART_KEY, raw);
  }, [raw, ready]);

  const add = useCallback(({ id, qty = 1, heat, option }: AddInput) => {
    const key = lineKey(id, heat, option);
    setRaw((prev) => {
      const hit = prev.find((l) => l.key === key);
      if (hit) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(20, l.qty + qty) } : l));
      return [...prev, { key, id, qty: Math.min(20, Math.max(1, qty)), heat, option }];
    });
    const p = getProduct(id);
    if (p) setLastAdded({ name: p.name, at: Date.now() });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setRaw((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setRaw([]), []);

  const signIn = useCallback((u: User) => {
    setUser(u);
    write(local, USER_KEY, u);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    write(local, USER_KEY, null);
  }, []);

  const value = useMemo<Store>(() => {
    const lines = raw.flatMap((l) => {
      const product = getProduct(l.id);
      return product ? [{ ...l, product }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
      qtyOf: (id: string) => lines.filter((l) => l.id === id).reduce((n, l) => n + l.qty, 0),
      cartOpen,
      setCartOpen,
      authOpen,
      setAuthOpen,
      user,
      signIn,
      signOut,
      lastAdded,
    };
  }, [raw, ready, add, setQty, remove, clear, cartOpen, authOpen, user, signIn, signOut, lastAdded]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
