// ─── AURELIA HOUSE — Single Source of Truth for Shared Copy ─────────────────────
// Every string used across the site lives here.
// ──────────────────────────────────────────────────────────────────────────────

// ── Brand ────────────────────────────────────────────────────────────────────
export const BRAND_NAME = "AURELIA HOUSE";
export const TAGLINE = "Stay Somewhere Worth Remembering.";

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  name: "Aurelia House",
  address: ["12 Princess Street", "Fort Kochi", "Kerala 682001", "India"],
  phone: "+91 480 000 2148",
  email: "stay@aureliahouse.in",
  coordinates: { lat: 9.9656, lng: 76.2425 },
  airportDistance: "42 km from Cochin International Airport (COK) — ~60 mins by car",
} as const;

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Stay", href: "/stay" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
] as const;

export const BOOKING_CTA = "BOOK YOUR STAY";

// ── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_NAV = [
  { label: "Stay", href: "/stay" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const COPYRIGHT = "© 2026 Aurelia House. All rights reserved.";

// ── Social ────────────────────────────────────────────────────────────────────
export const SOCIAL = {
  instagram: "https://www.instagram.com/aureliahouse.kochi",
  facebook: "https://www.facebook.com/aureliahouse.kochi",
} as const;

// ── Home Page Copy ───────────────────────────────────────────────────────────
export const HOME = {
  heroHeadline: "STAY SOMEWHERE\nWORTH REMEMBERING.",
  heroSubtext:
    "A design-led boutique retreat in the heart of Fort Kochi, where heritage, slow living and contemporary comfort meet.",
  heroCta1: "BOOK YOUR STAY",
  heroCta2: "EXPLORE AURELIA",

  introLabel: "A DIFFERENT KIND OF STAY.",
  introHeadline: "A QUIET CORNER OF KOCHI.",
  introBody:
    "Aurelia House is a 24-room boutique hotel created for travellers who prefer character over convention. Thoughtful spaces, local flavours and a slower rhythm come together in the heart of Fort Kochi.",
  introCta: "DISCOVER OUR STORY",

  roomsHeadline: "ROOMS DESIGNED FOR SLOW MORNINGS.",
  roomsCta: "EXPLORE ROOMS",

  diningHeadline: "LOCAL FLAVOURS.\nSLOWLY SERVED.",
  diningBody:
    "Kerala-inspired cuisine shaped by local ingredients, coastal traditions and contemporary technique.",
  restaurantName: "MORA",
  diningCta: "DISCOVER DINING",

  experiencesHeadline: "SEE KOCHI A LITTLE DIFFERENTLY.",

  testimonials: [
    {
      quote: "Beautifully designed, incredibly calm, and somehow still feels like Kochi.",
      author: "Maya R., Mumbai",
    },
    {
      quote: "The quiet courtyards and MORA dining made our stay completely unforgettable.",
      author: "Julian K., Berlin",
    },
    {
      quote: "An architectural masterpiece rooted in Kerala culture. Pure slow luxury.",
      author: "Ananya & Vikram, Bengaluru",
    },
  ],

  finalCtaHeadline: "YOUR ROOM IS WAITING.",
  finalCtaButton: "CHECK AVAILABILITY",
} as const;

// ── Stay Page ────────────────────────────────────────────────────────────────
export const STAY = {
  headline: "ROOMS DESIGNED\nFOR SLOW MORNINGS.",
  filterTabs: ["All", "Courtyard", "Garden", "Suite"] as const,
  viewRoomCta: "VIEW ROOM",
} as const;

// ── Individual Room Page ─────────────────────────────────────────────────────
export const ROOM_PAGE = {
  amenitiesLabel: "AMENITIES",
  bookThisRoomCta: "BOOK THIS ROOM",
  notFoundHeadline: "ROOM NOT FOUND.",
  backCta: "BACK TO ALL ROOMS",
} as const;

// ── MORA Full Menu Breakdown ─────────────────────────────────────────────────
export interface MenuCategory {
  title: string;
  items: { dish: string; description?: string; price: string }[];
}

export const DINING = {
  headline: "KERALA-INSPIRED.\nCONTEMPORARY.\nLOCAL.",
  restaurantName: "MORA",
  body: "MORA brings together the flavours of Kerala's coast with a modern approach to dining.",
  hours: [
    { label: "BREAKFAST", time: "7:00 AM – 10:30 AM" },
    { label: "LUNCH", time: "12:30 PM – 3:30 PM" },
    { label: "DINNER", time: "7:00 PM – 11:00 PM" },
  ] as const,
  sampleMenuLabel: "FULL MENU",
  categories: [
    {
      title: "STARTERS & SMALL PLATES",
      items: [
        { dish: "Malabar Pepper Prawns", description: "Seared tiger prawns, ground black pepper, crushed curry leaves", price: "₹850" },
        { dish: "Charred Banana Blossom", description: "Braised flower blossom, mustard temper, coconut charcoal", price: "₹540" },
        { dish: "Crab & Raw Mango Salad", description: "Fresh mud crab, green mango juliennes, shallot oil", price: "₹780" },
      ],
    },
    {
      title: "MAINS & CURRIES",
      items: [
        { dish: "Coconut Milk Fish Curry", description: "Line-caught Pearl Spot, poached in light coconut milk & kudampuli", price: "₹720" },
        { dish: "Slow-Cooked Duck Roast", description: "Kuttanad duck leg, braised with fennel, star anise & caramelized shallots", price: "₹920" },
        { dish: "Kerala Appam & Stew", description: "Lace rice crepe with roasted vegetable coconut stew", price: "₹480" },
      ],
    },
    {
      title: "DESSERTS",
      items: [
        { dish: "Tender Coconut Pudding", description: "Chilled young coconut gel, palm jaggery drizzle, toasted coconut", price: "₹320" },
        { dish: "Jaggery & Cardamom Tart", description: "Organic cane jaggery, cardamom pod cream, cashewnut crust", price: "₹360" },
      ],
    },
    {
      title: "BEVERAGES & BOTANICALS",
      items: [
        { dish: "Curry Leaf & Gin Tonic", description: "Artisanal Indian gin, infused curry oil, tonic water", price: "₹650" },
        { dish: "Tender Coconut Spritz", description: "Non-alcoholic fresh coconut water, mint, lime & elderflower", price: "₹350" },
      ],
    },
  ] as MenuCategory[],
  viewFullMenuCta: "VIEW FULL MENU",
} as const;

// ── Experiences Page ─────────────────────────────────────────────────────────
export const EXPERIENCES = {
  headline: "SEE KOCHI\nA LITTLE DIFFERENTLY.",
} as const;

// ── Our Story Page ───────────────────────────────────────────────────────────
export const OUR_STORY = {
  headline: "BUILT AROUND\nA SENSE OF PLACE.",
  paragraphs: [
    "Aurelia House was imagined as a modern retreat rooted in the character of Fort Kochi.",
    "Rather than recreating Kerala as a theme, the hotel takes inspiration from its materials, food, architecture and slower rhythm of life.",
    "The property combines contemporary design with subtle references to the region's history and culture, offering 24 design-led sanctuaries across three distinct room categories.",
  ],
  pullQuote:
    "The property combines contemporary design with subtle references to the region's history and culture.",
  subsections: [
    { label: "ARCHITECTURE", desc: "Passive tropical ventilation, laterite stone & teakwood carpentry." },
    { label: "FOUNDER STORY", desc: "Imagined by travellers who sought slow luxury over standard chain hotels." },
    { label: "HOTEL PHILOSOPHY", desc: "Cultivating spatial mindfulness, quiet silence & unhurried time." },
    { label: "LOCAL CULTURE", desc: "Rooted in Fort Kochi's heritage, spice trade & coastal flavors." },
  ] as const,
} as const;

// ── Gallery Page ─────────────────────────────────────────────────────────────
export const GALLERY = {
  headline: "GALLERY",
  categories: ["All", "Architecture", "Rooms", "Dining", "Experiences", "Kochi"] as const,
} as const;

// ── Journal Page ─────────────────────────────────────────────────────────────
export const JOURNAL = {
  headline: "JOURNAL",
  readArticleCta: "Read Article",
} as const;

// ── Contact / Booking Page ───────────────────────────────────────────────────
export const CONTACT_PAGE = {
  headline: "PLAN YOUR STAY.",
  submitCta: "REQUEST A RESERVATION",
  successMessage:
    "Thank you — we've received your reservation request. Our host team will confirm within 24 hours.",
  errorMessage:
    "Something went wrong sending your request. Please check your information or email stay@aureliahouse.in.",
  guestOptions: ["1 Adult", "2 Adults", "3 Adults", "4 Adults"] as const,
  roomOptions: ["Select a room", "Courtyard Room", "Garden Suite", "Aurelia Suite"] as const,
} as const;