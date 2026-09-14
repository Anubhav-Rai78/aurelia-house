// ─── Room Data ────────────────────────────────────────────────────────────────
// Single source of truth for all three rooms. Used on Home preview, Stay
// listing, and Individual Room pages — never re-type this data elsewhere.
// The `feature` field for Aurelia Suite ("Living Room" before "Private Terrace")
// follows the original brief's Home section order — the reconciled single
// version to use everywhere.
// ──────────────────────────────────────────────────────────────────────────────

export interface Room {
  slug: string;
  name: string;
  size: string;
  bed: string;
  view: string;
  feature: string;
  price: number;
  priceDisplay: string;
  description: string;
  guests: number;
  amenities: string[];
  /** Index is 1-based room number displayed as "ROOM 01" etc. */
  index: string;
  /** Optional dedicated headline used on the individual room page. */
  headline?: string;
}

export const rooms: Room[] = [
  {
    slug: "courtyard-room",
    name: "Courtyard Room",
    size: "28 m²",
    bed: "King Bed",
    view: "Courtyard View",
    feature: "Rain Shower",
    price: 12500,
    priceDisplay: "₹12,500 / night",
    description:
      "A calm, intimate room opening onto the hotel's quiet central courtyard.",
    guests: 2,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "King-size bed",
      "Rain shower",
      "Mini bar",
      "Coffee station",
      "Smart TV",
      "Bath amenities",
      "Work desk",
    ],
    index: "ROOM 01",
  },
  {
    slug: "garden-suite",
    name: "Garden Suite",
    size: "42 m²",
    bed: "King Bed",
    view: "Garden View",
    feature: "Private Balcony",
    price: 18500,
    priceDisplay: "₹18,500 / night",
    description:
      "A spacious suite with natural textures, soft light and a private garden-facing balcony.",
    guests: 2,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "King-size bed",
      "Rain shower",
      "Mini bar",
      "Coffee station",
      "Smart TV",
      "Bath amenities",
      "Work desk",
      "Balcony",
    ],
    index: "ROOM 02",
    headline: "A LITTLE MORE ROOM\nTO BREATHE.",
  },
  {
    slug: "aurelia-suite",
    name: "Aurelia Suite",
    size: "65 m²",
    bed: "King Bed",
    view: "Private Terrace",
    feature: "Living Room",
    price: 26000,
    priceDisplay: "₹26,000 / night",
    description:
      "Our most spacious accommodation, designed for long, slow stays with a private terrace.",
    guests: 2,
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "King-size bed",
      "Rain shower",
      "Mini bar",
      "Coffee station",
      "Smart TV",
      "Bath amenities",
      "Work desk",
      "Balcony",
    ],
    index: "ROOM 03",
  },
];