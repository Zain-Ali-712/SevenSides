# Seven Sides: website pitch

Frontend concept for **Seven Sides** (Nashville hot chicken, Lahore). Next.js 16 (App Router, Cache Components), Tailwind CSS 4, shadcn/ui (Radix), Motion, Lenis and Leaflet.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages
| Route | What's there |
|---|---|
| `/` | Teal store-mural hero, wrapping-paper marquee, Bird Menu bento, pinned "Choose your heat" scroll, story teaser, live branch tickets |
| `/menu` | All 33 menu entries. Photo cards with the official heat picker, menu-board panels for shakes/treats/extras/drinks/sauces, sticky scroll-spy categories, search |
| `/story` | Brand claim, pinned sideways timeline of official milestones (polaroid posters), heat scale, real numbers |
| `/branches` | Leaflet map + 4 branch cards with live open/closed status (Asia/Karachi), weekly hours, call/directions |
| `/checkout` | Delivery/pickup, branch picker, validated details form, dummy order confirmation |

Cart: add / remove / quantity per heat level or flavour, kept in `sessionStorage`. Sign in / sign up: modal, demo accounts in `localStorage` (passwords stored as SHA-256 digests).

## Data & assets (all official)
- Menu and prices: Instagram menu board, 26 Mar 2026 (`lib/menu.ts`). Prices exclude taxes.
- Branches: Instagram bio phones + Google Maps listings (`lib/branches.ts`).
- Timeline: official Facebook/Instagram posts (`lib/story.ts`).
- Photos: only images posted by @sevensides.pk (`public/images`). No AI-generated imagery.
- Fonts: Bebas Neue (matches the logo), Outfit (menu-board body text), Montserrat (official poster small text).

Full research, raw scrapes and open questions: `research/research.md`, `research/gaps.md`.

## Known gaps
- Foodpanda blocked scraping, so delivery-app-only items (wings, extra wraps) are not listed.
- Taxes and delivery fees are not published; checkout says they are confirmed by the branch.
- Model Town services are not stated in official posts (shown as dine-in, takeaway, delivery).
