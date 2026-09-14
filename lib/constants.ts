// ─── AURELIA HOUSE — Single Source of Truth for All Shared Copy ───────────────
// Every string used more than once across the site lives here. Never duplicate
// a literal string in two different component files — import from here instead.
// This prevents typos, casing inconsistencies, and "BOOK YOUR STAY" becoming
// "Book Your Stay" somewhere.
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

  testimonial:
    "Beautifully designed, incredibly calm, and somehow still feels like Kochi.",
  testimonialAuthor: "Maya R., Mumbai",

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

// ── Dining Page ──────────────────────────────────────────────────────────────
export const DINING = {
  headline: "KERALA-INSPIRED.\nCONTEMPORARY.\nLOCAL.",
  restaurantName: "MORA",
  body: "MORA brings together the flavours of Kerala's coast with a modern approach to dining.",
  hours: [
    { label: "BREAKFAST", time: "7:00 AM – 10:30 AM" },
    { label: "LUNCH", time: "12:30 PM – 3:30 PM" },
    { label: "DINNER", time: "7:00 PM – 11:00 PM" },
  ] as const,
  sampleMenuLabel: "SAMPLE MENU",
  menu: [
    { dish: "Malabar Pepper Prawns", price: "₹850" },
    { dish: "Coconut Milk Fish Curry", price: "₹720" },
    { dish: "Charred Banana Blossom", price: "₹540" },
    { dish: "Kerala Appam", price: "₹180" },
    { dish: "Tender Coconut Pudding", price: "₹320" },
  ] as const,
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
  ],
  pullQuote:
    "The property combines contemporary design with subtle references to the region's history and culture.",
  subsections: [
    { label: "ARCHITECTURE" },
    { label: "FOUNDER STORY" },
    { label: "HOTEL PHILOSOPHY" },
    { label: "LOCAL CULTURE" },
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
    "Thank you — we've received your request and will confirm within 24 hours.",
  errorMessage:
    "Something went wrong sending your request. Please try again or email us at stay@aureliahouse.in.",
  guestOptions: ["1 Adult", "2 Adults", "3 Adults", "4 Adults", "5 Adults", "6 Adults"] as const,
  roomOptions: ["Select a room", "Courtyard Room", "Garden Suite", "Aurelia Suite"] as const,
} as const;