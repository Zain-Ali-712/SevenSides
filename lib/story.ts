/**
 * Journey milestones. Every entry is taken from an official Seven Sides post
 * (facebook.com/SevenSides.pk, instagram.com/sevensides.pk) or the Google Maps
 * listings; see research/research.md for the source of each date.
 */
export type Milestone = {
  date: string;
  title: string;
  body: string;
  quote?: string;
  photo: { src: string; w: number; h: number; alt: string };
  tone: "mustard" | "teal" | "white" | "ember";
};

export const MILESTONES: Milestone[] = [
  {
    date: "Jul 2023",
    title: "DHA Phase 5 opens",
    body: "The first Seven Sides opens at 15-A Street 2, Sector A, Phase 5, DHA.",
    photo: { src: "/images/sando-tray.webp", w: 1080, h: 1350, alt: "Two Sandos on a tray on Seven Sides wrapping paper" },
    tone: "mustard",
  },
  {
    date: "Jul 2024",
    title: "Seven Sides turns one",
    body: "Seven Sides celebrates its first year in DHA Phase 5.",
    quote: "One year ago, we opened our doors and began an amazing journey with you.",
    photo: { src: "/images/one-year.webp", w: 1080, h: 1080, alt: "Seven Sides Turns One poster with a hot chicken slider" },
    tone: "white",
  },
  {
    date: "21 Dec 2024",
    title: "Lake City, branch two",
    body: "Business Bay, Lake City goes live with an opening day from 1 PM to 11 PM.",
    quote: "Big moves, bigger bites!",
    photo: { src: "/images/lake-city-poster.webp", w: 1080, h: 1080, alt: "Polaroid-style poster: Lake City, new branch in Lahore, opening day 21 Dec" },
    tone: "teal",
  },
  {
    date: "May 2025",
    title: "Three new sliders",
    body: "Honey Sriracha, Hot Honey Ranch and Caesar Chicken land on the menu next to the Hot Chicken slider.",
    photo: { src: "/images/caesar-chicken.webp", w: 1200, h: 1500, alt: "Caesar Chicken sliders stacked on a black background" },
    tone: "white",
  },
  {
    date: "13 Sep 2025",
    title: "Cantt, branch three",
    body: "Girja Chowk, Bagh Ali Road. Takeaway and delivery across Cantt and beyond.",
    quote: "Third branch unlocked. Cantt, you’re up!",
    photo: { src: "/images/cantt-poster.webp", w: 1200, h: 1500, alt: "Polaroid-style poster: Girja Chowk Cantt, new branch, 13 Sept" },
    tone: "ember",
  },
  {
    date: "Mar 2026",
    title: "The Toastie arrives",
    body: "A new menu board, with the Toastie in Nutella, Strawberry or Dark Choc under SS Treats.",
    photo: { src: "/images/menu-board.webp", w: 1200, h: 1500, alt: "The March 2026 Seven Sides menu board" },
    tone: "mustard",
  },
  {
    date: "28 Jun 2026",
    title: "Model Town, branch four",
    body: "Bank Square Market, Model Town. Now open late, until 2 AM.",
    quote: "New place. Bold flavors. Memories worth sharing.",
    photo: { src: "/images/model-town-poster.webp", w: 640, h: 800, alt: "Model Town new branch poster with a teal Seven Sides storefront" },
    tone: "teal",
  },
];
