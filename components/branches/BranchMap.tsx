"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Branch } from "@/lib/branches";

/** Lahore map with inked Seven Sides pins. Flies to the active branch; pins are clickable. */
export default function BranchMap({
  branches,
  active,
  onSelect,
}: {
  branches: Branch[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  const activeRef = useRef(active);

  useEffect(() => {
    onSelectRef.current = onSelect;
    activeRef.current = active;
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current || map.current) return;
      const m = L.map(el.current, { zoomControl: false, scrollWheelZoom: false, attributionControl: true });
      L.control.zoom({ position: "topright" }).addTo(m);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(m);
      markers.current = branches.map((b, i) =>
        L.marker([b.lat, b.lng], {
          icon: L.divIcon({ className: "", html: `<div class="ss-pin"><span>${i + 1}</span></div>`, iconSize: [34, 34], iconAnchor: [17, 34] }),
          title: `Seven Sides ${b.name}`,
          alt: `Seven Sides ${b.name}`,
          keyboard: false,
        })
          .on("click", () => onSelectRef.current(i))
          .addTo(m),
      );
      m.fitBounds(L.latLngBounds(branches.map((b) => [b.lat, b.lng])), { padding: [50, 50] });
      markers.current[activeRef.current]?.getElement()?.querySelector(".ss-pin")?.classList.add("is-active");
      map.current = m;
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, [branches]);

  useEffect(() => {
    markers.current.forEach((mk, i) => mk.getElement()?.querySelector(".ss-pin")?.classList.toggle("is-active", i === active));
    const m = map.current;
    if (!m) return;
    const b = branches[active];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.flyTo([b.lat, b.lng], 14, { duration: reduce ? 0 : 1.2 });
  }, [active, branches]);

  return <div ref={el} className="ss-map h-full w-full" role="region" aria-label="Map of Seven Sides branches in Lahore" />;
}
