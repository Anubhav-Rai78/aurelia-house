// ─── MORA Dining Data ────────────────────────────────────────────────────────
// Single source of truth for the MORA restaurant: hours, reservation time
// options, and the sample menu. The dining page renders entirely from here —
// no hours/menu copy lives in page JSX.
// ─────────────────────────────────────────────────────────────────────────────

export type MenuCategory =
  | "starters"
  | "mains"
  | "desserts"
  | "appam-breads"
  | "beverages";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  /** Price in whole rupees — formatted with `formatINRWhole` for display. */
  price: number;
  category: MenuCategory;
}

export interface MealSlot {
  id: string;
  /** Display label for the hours section (uppercase as currently shown). */
  label: string;
  timeRange: string;
  /** Exact `timeSlot` strings submitted to the reservation API — byte-identical. */
  reservationTimes: string[];
}

/** Hero / section copy for the MORA dining page. */
export const MORA_RESTAURANT_NAME = "MORA";
export const MORA_HEADLINE = "KERALA-INSPIRED.\nCONTEMPORARY.\nLOCAL.";
export const MORA_BODY =
  "MORA brings together the flavours of Kerala's coast with a modern approach to dining.";

/** Restaurant hours + the time slots offered for reservations at each meal. */
export const MORA_MEAL_SLOTS: MealSlot[] = [
  {
    id: "breakfast",
    label: "BREAKFAST",
    timeRange: "7:00 AM – 10:30 AM",
    reservationTimes: ["Breakfast (8:30 AM)"],
  },
  {
    id: "lunch",
    label: "LUNCH",
    timeRange: "12:30 PM – 3:30 PM",
    reservationTimes: ["Lunch (1:00 PM)"],
  },
  {
    id: "dinner",
    label: "DINNER",
    timeRange: "7:00 PM – 11:00 PM",
    reservationTimes: ["Dinner (7:30 PM)", "Late Dinner (9:00 PM)"],
  },
];

/** Display header for each menu-category group rendered on the dining page. */
export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  starters: "STARTERS & SMALL PLATES",
  mains: "MAINS & CURRIES",
  desserts: "DESSERTS",
  "appam-breads": "APPAM & BREADS",
  beverages: "BEVERAGES & BOTANICALS",
};

/** The MORA sample menu — every dish across all categories. */
export const MORA_SAMPLE_MENU: MenuItem[] = [
  {
    id: "malabar-pepper-prawns",
    name: "Malabar Pepper Prawns",
    description: "Seared tiger prawns, ground black pepper, crushed curry leaves",
    price: 850,
    category: "starters",
  },
  {
    id: "charred-banana-blossom",
    name: "Charred Banana Blossom",
    description: "Braised flower blossom, mustard temper, coconut charcoal",
    price: 540,
    category: "starters",
  },
  {
    id: "crab-raw-mango-salad",
    name: "Crab & Raw Mango Salad",
    description: "Fresh mud crab, green mango juliennes, shallot oil",
    price: 780,
    category: "starters",
  },
  {
    id: "coconut-milk-fish-curry",
    name: "Coconut Milk Fish Curry",
    description: "Line-caught Pearl Spot, poached in light coconut milk & kudampuli",
    price: 720,
    category: "mains",
  },
  {
    id: "slow-cooked-duck-roast",
    name: "Slow-Cooked Duck Roast",
    description: "Kuttanad duck leg, braised with fennel, star anise & caramelized shallots",
    price: 920,
    category: "mains",
  },
  {
    id: "kerala-appam-stew",
    name: "Kerala Appam & Stew",
    description: "Lace rice crepe with roasted vegetable coconut stew",
    price: 480,
    category: "mains",
  },
  {
    id: "tender-coconut-pudding",
    name: "Tender Coconut Pudding",
    description: "Chilled young coconut gel, palm jaggery drizzle, toasted coconut",
    price: 320,
    category: "desserts",
  },
  {
    id: "jaggery-cardamom-tart",
    name: "Jaggery & Cardamom Tart",
    description: "Organic cane jaggery, cardamom pod cream, cashewnut crust",
    price: 360,
    category: "desserts",
  },
  {
    id: "curry-leaf-gin-tonic",
    name: "Curry Leaf & Gin Tonic",
    description: "Artisanal Indian gin, infused curry oil, tonic water",
    price: 650,
    category: "beverages",
  },
  {
    id: "tender-coconut-spritz",
    name: "Tender Coconut Spritz",
    description: "Non-alcoholic fresh coconut water, mint, lime & elderflower",
    price: 350,
    category: "beverages",
  },
];
