"use client";

import { useEffect, useState } from "react";
import { formatTime, openState, type Branch, type OpenState } from "@/lib/branches";
import { cn } from "@/lib/utils";

/** Live "Open until / Opens at" badge using Lahore time. Renders after mount to avoid hydration drift. */
export function OpenBadge({ branch, className = "" }: { branch: Branch; className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setState(openState(branch));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, [branch]);

  return (
    <span
      className={cn(
        "inline-flex min-h-7 shrink-0 items-center whitespace-nowrap rounded-full border-[1.5px] border-ink px-2.5 font-tag text-[11px] font-bold",
        !state ? "invisible" : state.open ? "bg-white text-ink" : "bg-ink text-paper",
        className,
      )}
    >
      {state && (state.open ? `Open till ${formatTime(state.until)}` : `Opens ${formatTime(state.opensAt)}`)}
    </span>
  );
}
