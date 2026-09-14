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

export const BOOKING_CTA = "BOOK YOUR STAY";

export const COPYRIGHT = "© 2026 Aurelia House. All rights reserved.";

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