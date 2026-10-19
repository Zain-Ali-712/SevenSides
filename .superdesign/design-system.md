# Seven Sides Design System

## Product context
Seven Sides is a Lahore fast-food brand serving Nashville-style hot chicken: "Home of Red Tenders".
It claims to be the first in Lahore to introduce the Sando and Nashville tenders. It has 4 branches: DHA Phase 5 (since 2023), Lake City (Dec 2024), Cantt (Sep 2025) and Model Town (Jun 2026).
Audience: Lahore Gen-Z and young families who find food via Instagram reels. The site is a premium, joyful brand site with a working menu, a dummy cart and checkout, a story page and a branches map.

Key pages: Home (hero is top priority), Menu (interactive product cards and a heat-level picker), Our Story (timeline), Branches (map + 4 cards), Cart/Checkout.

## Visual direction: wall-art led, illustrative
Everything is derived from the brand's real assets:
1. **The store mural**: flowing, wavy, topographic-style parallel lines in mustard, orange, teal and black. Use it as a full-bleed hero texture (SVG paths, slowly drifting).
2. **The menu board illustration style**: flat cartoon food, thick black outlines (3px), rounded panels with black borders, **black pill-shaped section labels** with white Bebas text, and a red flame band around the heat meter.
3. **The branded wrapping paper**: "SEVEN SIDES" repeated diagonally in teal and mustard on off-white. Use for marquees and section dividers.
4. **Photography**: real photos only. Black nitrile glove holding food, macro, sauce drips, mustard or black backdrops.

Not glassmorphism, not purple gradients, not soft pastel SaaS cards. Flat, inked, poster-like, loud but tidy.

## Color
| Token | Hex | Use |
|---|---|---|
| `--teal` | `#1FA0A5` | Primary brand: backgrounds, prices, links |
| `--teal-deep` | `#137479` | Hover, text on mustard |
| `--mustard` | `#FCB53F` | Primary panels, logo background |
| `--mustard-soft` | `#FDD58A` | Tints |
| `--chili` | `#D7262E` | Red tenders, "NEW!" tags, Screamer heat, CTA accent |
| `--ember` | `#F26A2E` | Orange flames, Country Heat |
| `--ink` | `#121212` | Outlines, pill labels, body text |
| `--paper` | `#FFF8EA` | Page background (warm off-white like the wrap paper) |
| `--white` | `#FFFFFF` | Menu cards |

Contrast: ink on mustard or paper; white on teal only at 24px+ bold; white on ink.

## Typography
- **Display**: `Bebas Neue` (exact match for the logo wordmark). Uppercase, tight leading 0.85–0.95, letter-spacing 0.01em. Hero sizes 120–220px desktop, 72–96px mobile.
- **Body / UI**: `Outfit` 400/500/700 (closest free match to the geometric sans on the menu board).
- Prices: Bebas Neue, teal, e.g. "RS. 975".

## Shape & depth
- Radius: panels 20px, cards 18px, pills 999px, buttons 999px.
- Borders: 3px solid ink on cards, panels and buttons (menu board look).
- Shadow: hard offset, no blur: `6px 6px 0 var(--ink)`. On hover it grows to `10px 10px 0` with a translate of (-4px,-4px).
- Stickers: circular badges with rotating text ("HOME OF RED TENDERS • SINCE 2023 •").

## Components
- **Pill label**: black pill, white Bebas, sits overlapping the top border of a panel (exactly like the menu board).
- **Heat meter**: 3 segments (No Heat · Country Heat · Screamer) inside a red flame band; chilli icons 0/2/3. Interactive: the selected level changes the item's heat option and tints the hero.
- **Product card**: white or mustard panel, 3px border, hard shadow, photo top with a subtle tilt on hover, Bebas name, Outfit description, teal price, round "+" add button in ink.
- **Buttons**: primary = ink background, white Bebas, hard shadow in chili; secondary = mustard with ink border.
- **Nav**: mustard pill bar floating 16px from the top: wordmark left, links center, cart button with a count bubble right.

## Motion
- Library: Motion (motion/react) + Lenis smooth scroll.
- Mural lines drift slowly (12–20s loop). Parallax on scroll.
- Hero headline: per-line mask reveal (y 110% → 0, 0.8s, ease [0.22,1,0.36,1], stagger 0.08).
- Product cutouts: float up/down 6px, rotate ±3°.
- Hover: hard-shadow "press" interaction.
- The heat meter springs between states.
- Respect prefers-reduced-motion: stop the drift, keep only fades.

## Layout
- Max content width 1320px, gutters 24px (16px mobile).
- Sections alternate background color: paper → teal → mustard → ink, with wavy SVG edges between them (mural lines).
- Mobile-first; hero stacks the headline above the product cutout.

## Copy voice
Short, playful, Lahore Gen-Z English, taken from their own posts: "Are you ready to handle the heat?", "Caution: Extremely Flavourful", "Pull up, pick up, or call up."
