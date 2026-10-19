/**
 * Official Seven Sides menu, transcribed from the menu board posted on
 * instagram.com/sevensides.pk on 2026-03-26 (post DWXXoPHDBqt).
 * Prices are PKR and exclusive of taxes, as printed on the board.
 * Sources and price history: research/menu.json, research/gaps.md.
 */

export type HeatLevel = "no-heat" | "country-heat" | "screamer";

export const HEAT_LEVELS: { id: HeatLevel; label: string; chillies: number }[] = [
  { id: "no-heat", label: "No Heat", chillies: 0 },
  { id: "country-heat", label: "Country Heat", chillies: 2 },
  { id: "screamer", label: "Screamer", chillies: 3 },
];

export type Photo = { src: string; w: number; h: number; alt: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  desc?: string;
  /** Item offers the official No Heat / Country Heat / Screamer choice. */
  heat?: boolean;
  isNew?: boolean;
  signature?: boolean;
  options?: { label: string; values: string[] };
  photo?: Photo;
};

export type CategoryId =
  | "bird"
  | "sliders"
  | "tenders"
  | "wraps"
  | "fries"
  | "shakes"
  | "treats"
  | "extras"
  | "meal"
  | "drinks"
  | "sauces";

export type Category = { id: CategoryId; name: string; blurb?: string; tone: "mustard" | "white" | "teal" };

export const CATEGORIES: Category[] = [
  { id: "bird", name: "Bird Menu", tone: "mustard" },
  { id: "sliders", name: "Sliders", tone: "white" },
  { id: "tenders", name: "Tenders", tone: "white" },
  { id: "wraps", name: "Wraps", tone: "mustard" },
  { id: "fries", name: "Hand Cut Fries", tone: "white" },
  { id: "shakes", name: "Hand Spun Shakes", tone: "mustard" },
  { id: "treats", name: "SS Treats", tone: "white" },
  { id: "extras", name: "Extras", tone: "mustard" },
  { id: "meal", name: "Make It A Meal", tone: "mustard" },
  { id: "drinks", name: "Drinks", tone: "white" },
  { id: "sauces", name: "Sauce", tone: "white" },
];

const img = (name: string, w: number, h: number, alt: string): Photo => ({ src: `/images/${name}.webp`, w, h, alt });

export const PRODUCTS: Product[] = [
  {
    id: "the-sando",
    name: "The Sando",
    price: 975,
    category: "bird",
    desc: "House bread, hot chicken tenders, cheese fondue & comeback sauce",
    heat: true,
    signature: true,
    photo: img("sando", 1080, 1350, "The Sando stacked on toasted house bread with comeback sauce dripping down the side"),
  },
  {
    id: "hot-chicken",
    name: "Hot Chicken",
    price: 875,
    category: "sliders",
    desc: "House bun, hot chicken, coleslaw, pickles, cheese & comeback sauce",
    heat: true,
    photo: img("hot-chicken", 1080, 1350, "Hot Chicken slider with coleslaw and cheese held in black gloves"),
  },
  {
    id: "honey-sriracha",
    name: "Honey Sriracha",
    price: 875,
    category: "sliders",
    desc: "House bun, crispy chicken fillet, lettuce, pickles, cheese & honey sriracha sauce",
    isNew: true,
    photo: img("honey-sriracha", 640, 800, "Crispy chicken fillet slider with honey sriracha sauce on Seven Sides wrapping paper"),
  },
  {
    id: "hot-honey-ranch",
    name: "Hot Honey Ranch",
    price: 875,
    category: "sliders",
    desc: "House bun, crispy chicken fillet, lettuce, cheese & honey ranch mayo",
    isNew: true,
    signature: true,
    photo: img("hot-honey-ranch", 640, 800, "Hot Honey Ranch slider cut open to show the crispy fillet and ranch mayo"),
  },
  {
    id: "caesar-chicken",
    name: "Caesar Chicken",
    price: 875,
    category: "sliders",
    desc: "House bun, crispy chicken fillet, lettuce, cheese & secret sauce",
    isNew: true,
    photo: img("caesar-chicken", 1200, 1500, "Two Caesar Chicken sliders stacked on a black background"),
  },
  {
    id: "red-tenders",
    name: "Red Tenders",
    price: 1245,
    category: "tenders",
    desc: "5 pcs of tenders served with fries & comeback sauce",
    heat: true,
    signature: true,
    photo: img("red-tenders", 1080, 1350, "A red hot tender being dipped into sauce on Seven Sides paper"),
  },
  {
    id: "crunchy-tenders",
    name: "Crunchy Tenders",
    price: 1245,
    category: "tenders",
    desc: "5 pcs of tenders served with fries & comeback sauce",
    photo: img("crunchy-tenders", 1080, 1350, "A tray of crunchy tenders with crinkle fries"),
  },
  {
    id: "crispy-chicken-wrap",
    name: "Crispy Chicken Wrap",
    price: 875,
    category: "wraps",
    desc: "Crispy chicken tenders, jalapeño, lettuce & secret sauce",
    photo: img("wrap", 1080, 1350, "Crispy Chicken Wrap in a yellow Seven Sides sleeve"),
  },
  {
    id: "loaded-waffle-fries",
    name: "Loaded Waffle Fries",
    price: 895,
    category: "fries",
    desc: "Criss cross potato fries, hot chicken, pickles, parsley & sauce",
    signature: true,
    photo: img("loaded-fries", 1080, 1350, "Loaded waffle fries topped with hot chicken in a yellow basket"),
  },
  { id: "choco-berry", name: "Choco Berry", price: 695, category: "shakes", isNew: true },
  { id: "chocolate-shake", name: "Chocolate", price: 695, category: "shakes" },
  { id: "strawberry-shake", name: "Strawberry", price: 695, category: "shakes" },
  { id: "cookies-cream-shake", name: "Cookies & Cream", price: 695, category: "shakes" },
  { id: "vanilla-shake", name: "Vanilla", price: 695, category: "shakes" },
  { id: "salted-caramel-shake", name: "Salted Caramel", price: 695, category: "shakes" },
  {
    id: "toastie",
    name: "Toastie",
    price: 675,
    category: "treats",
    isNew: true,
    options: { label: "Choose your flavour", values: ["Nutella", "Strawberry", "Dark Choc"] },
  },
  {
    id: "churros",
    name: "Churros",
    price: 550,
    category: "treats",
    desc: "5 churros sticks dusted with cinnamon sugar & 1 dip",
    options: { label: "Choose your dip", values: ["Nutella", "Caramel", "Dark Choc"] },
  },
  { id: "ice-cream-scoop", name: "Vanilla Ice Cream Scoop", desc: "Add 1 scoop of vanilla ice cream", price: 150, category: "treats" },
  {
    id: "extra-dip",
    name: "Extra Dip",
    price: 250,
    category: "treats",
    options: { label: "Choose your dip", values: ["Nutella", "Caramel", "Dark Choc"] },
  },
  { id: "crinkle-fries", name: "Crinkle Fries", price: 350, category: "extras" },
  { id: "waffle-fries", name: "Waffle Fries", price: 350, category: "extras" },
  {
    id: "mac-cheese",
    name: "Mac & Cheese",
    price: 500,
    category: "extras",
    photo: img("mac-cheese", 720, 1280, "A cup of Seven Sides mac and cheese"),
  },
  { id: "meal-fries-drink", name: "Fries & Drink", price: 500, category: "meal" },
  { id: "meal-fries-shake", name: "Fries & Shake", price: 1000, category: "meal" },
  { id: "pepsi", name: "Pepsi", price: 120, category: "drinks" },
  { id: "diet-pepsi", name: "Diet Pepsi", price: 120, category: "drinks" },
  { id: "7up", name: "7Up", price: 120, category: "drinks" },
  { id: "mirinda", name: "Mirinda", price: 120, category: "drinks" },
  { id: "water", name: "Water", price: 100, category: "drinks" },
  { id: "comeback-sauce", name: "Comeback", price: 120, category: "sauces" },
  { id: "salsa-sauce", name: "Salsa", price: 120, category: "sauces" },
  { id: "garlic-mayo", name: "Garlic Mayo", price: 120, category: "sauces" },
  { id: "chipotle-sauce", name: "Chipotle", price: 120, category: "sauces" },
];

/** Category photos for sections whose items have no individual official photo. */
export const CATEGORY_PHOTOS: Partial<Record<CategoryId, Photo>> = {
  shakes: img("shakes", 1200, 1500, "Four Seven Sides hand spun shakes in front of the store mural"),
  fries: img("loaded-fries-2", 1080, 1350, "Close up of loaded waffle fries with chicken"),
};

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
export const getProduct = (id: string) => byId.get(id);

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

export const productsIn = (c: CategoryId) => PRODUCTS.filter((p) => p.category === c);
