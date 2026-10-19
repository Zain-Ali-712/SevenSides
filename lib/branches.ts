/**
 * Branch data cross-verified on 2026-10-18:
 * phones match the Instagram bio, addresses / hours / coordinates / ratings
 * come from each branch's Google Maps listing, opening dates from official
 * Facebook / Instagram launch posts. See research/branches.json.
 */

export type Hours = { open: number; close: number }; // minutes from midnight; close may exceed 1440

export type Branch = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  services: string[];
  note?: string;
  /** Index 0 = Monday. */
  hours: Hours[];
  opened: string;
  openedLabel: string;
  rating: number;
  reviews: number;
  mapsUrl: string;
  photo?: { src: string; w: number; h: number; alt: string };
};

const h = (open: string, close: string): Hours => ({ open: toMin(open), close: toMin(close, true) });

function toMin(t: string, isClose = false) {
  const [hh, mm = "0"] = t.split(":");
  let m = Number(hh) * 60 + Number(mm);
  if (isClose && m <= 12 * 60) m += 24 * 60; // closes after midnight
  return m;
}

const week = (...days: Hours[]) => days;
const daily = (x: Hours) => Array.from({ length: 7 }, () => x);

export const BRANCHES: Branch[] = [
  {
    id: "dha-phase-5",
    name: "DHA Phase 5",
    area: "The original",
    address: "15-A Street 2, Sector A, Phase 5, DHA, Lahore",
    phone: "+92 319 6481040",
    lat: 31.4613693,
    lng: 74.4238279,
    services: ["Dine-in", "Takeaway", "Delivery"],
    hours: week(h("12", "0"), h("12", "0"), h("12", "0"), h("12", "0"), h("12", "0:30"), h("12", "0:30"), h("12", "0:30")),
    opened: "2023-07",
    openedLabel: "July 2023",
    rating: 4.4,
    reviews: 1273,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Seven%20Sides%20DHA%20Phase%205&query_place_id=ChIJcwBss98JGTkR1pWDtie9GDo",
  },
  {
    id: "lake-city",
    name: "Lake City",
    area: "Business Bay",
    address: "Plot C3-33, Business Bay, Block M1, Lake City, Lahore",
    phone: "+92 370 7743936",
    lat: 31.3555432,
    lng: 74.2399118,
    services: ["Dine-in", "Takeaway", "Delivery"],
    hours: week(h("12", "0"), h("12", "0"), h("12", "0"), h("12", "0"), h("12", "0"), h("12", "1"), h("12", "0")),
    opened: "2024-12-21",
    openedLabel: "21 Dec 2024",
    rating: 4.3,
    reviews: 866,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Seven%20Sides%20Lake%20City&query_place_id=ChIJSbgSvHCrGTkRUBKyXYFCsUk",
    photo: { src: "/images/lake-city-interior.webp", w: 900, h: 1600, alt: "Inside the Lake City branch, looking out through the glass front" },
  },
  {
    id: "cantt",
    name: "Cantt",
    area: "Girja Chowk",
    address: "Shop 5, Bagh Ali Road, Girja Chowk, Cantt, Lahore",
    phone: "+92 322 7694926",
    lat: 31.5209805,
    lng: 74.3803311,
    services: ["Takeaway", "Delivery"],
    note: "Takeaway & delivery only",
    hours: daily(h("12", "1")),
    opened: "2025-09-13",
    openedLabel: "13 Sep 2025",
    rating: 4.0,
    reviews: 146,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Seven%20Sides%20Cantt&query_place_id=ChIJPS4Y67kFGTkR61Pxi_cabKw",
    photo: { src: "/images/cantt-bag.webp", w: 1200, h: 1600, alt: "A Seven Sides kraft bag on the road near Cantt" },
  },
  {
    id: "model-town",
    name: "Model Town",
    area: "Bank Square",
    address: "Bank Square, 171 Market, Block C, Model Town, Lahore",
    phone: "+92 303 4877017",
    lat: 31.488764,
    lng: 74.325674,
    services: ["Dine-in", "Takeaway", "Delivery"],
    hours: daily(h("12", "2")),
    opened: "2026-06-28",
    openedLabel: "28 Jun 2026",
    rating: 4.4,
    reviews: 239,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Seven%20Sides%20Model%20Town&query_place_id=ChIJPy3JWdsFGTkRc9Oj6RPUu0w",
  },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function formatTime(min: number) {
  const m = ((min % 1440) + 1440) % 1440;
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  if (hh === 0 && mm === 0) return "12 AM";
  const suffix = hh < 12 ? "AM" : "PM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""} ${suffix}`;
}

export const formatHours = (x: Hours) => `${formatTime(x.open)} to ${formatTime(x.close)}`;

/** Lahore local time (Asia/Karachi) as { day: 0=Mon, minutes }. */
export function lahoreNow(date = new Date()) {
  // Asia/Karachi is fixed UTC+5 (no DST), so shift and read UTC fields.
  const t = new Date(date.getTime() + 5 * 60 * 60 * 1000);
  const day = (t.getUTCDay() + 6) % 7; // 0 = Monday
  return { day, minutes: t.getUTCHours() * 60 + t.getUTCMinutes() };
}

/** Open right now? Checks today's window and yesterday's after-midnight tail. */
export type OpenState = { open: true; until: number } | { open: false; opensAt: number };

export function openState(b: Branch, date = new Date()): OpenState {
  const { day, minutes } = lahoreNow(date);
  const today = b.hours[day];
  const yesterday = b.hours[(day + 6) % 7];
  if (minutes < yesterday.close - 1440) return { open: true, until: yesterday.close };
  if (minutes >= today.open && minutes < today.close) return { open: true, until: today.close };
  return { open: false, opensAt: minutes < today.open ? today.open : b.hours[(day + 1) % 7].open };
}

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** sessionStorage key for the branch picked on /branches ("Order from here"). */
export const PREFERRED_BRANCH_KEY = "ss-branch";
