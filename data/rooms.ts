// ─── Room Data ────────────────────────────────────────────────────────────────
// Single source of truth for all room categories. Used across Home preview, Stay
// listing, and Individual Room pages.
// 24-Room Inventory Breakdown: 10 Courtyard Rooms, 10 Garden Suites, 4 Aurelia Suites.
// ──────────────────────────────────────────────────────────────────────────────

export interface RoomSpecification {
  label: string;
  value: string;
}

export interface Room {
  slug: string;
  name: string;
  category: "courtyard" | "garden" | "suite";
  size: string;
  bed: string;
  view: string;
  feature: string;
  price: number;
  priceDisplay: string;
  description: string;
  longDescription: string;
  guests: number;
  inventoryCount: number; // 10 Courtyard, 10 Garden, 4 Aurelia = 24 total
  amenities: string[];
  image: string;
  gallery: string[];
  index: string;
  headline?: string;
  specifications: RoomSpecification[];
}

export const rooms: Room[] = [
  {
    slug: "courtyard-room",
    name: "Courtyard Room",
    category: "courtyard",
    size: "28 m²",
    bed: "King Bed",
    view: "Courtyard View",
    feature: "Rain Shower",
    price: 12500,
    priceDisplay: "₹12,500 / night",
    description:
      "A calm, intimate room opening onto the hotel's quiet central courtyard.",
    longDescription:
      "Designed as a sanctuary from the vibrant energy of Fort Kochi, the Courtyard Room combines high timber ceilings, lime-plastered walls, and soft linen drapery. Step directly out toward our central garden courtyard, where lush tropical foliage and dappled sunlight frame your morning coffee.",
    guests: 2,
    inventoryCount: 10,
    amenities: [
      "Wi-Fi (High-speed Fiber)",
      "Air conditioning & ceiling fan",
      "Custom Teak King-size bed",
      "Monsoon rain shower",
      "Curated artisanal mini bar",
      "Pour-over coffee station",
      "Smart TV with streaming",
      "Organic Kerala botanical bath amenities",
      "Architectural work desk",
      "Courtyard seating area",
    ],
    image: "/images/room-courtyard.jpg",
    gallery: [
      "/images/room-courtyard.jpg",
      "/images/room-shower.jpg",
      "/images/intro-courtyard.jpg",
      "/images/pool-courtyard.jpg",
    ],
    index: "ROOM 01",
    headline: "INTIMATE CALM IN THE HEART OF THE COURTYARD.",
    specifications: [
      { label: "ROOM SIZE", value: "28 m² / 300 sq ft" },
      { label: "BED TYPE", value: "Custom King-Size (Hand-carved Teak)" },
      { label: "MAX OCCUPANCY", value: "2 Adults" },
      { label: "VIEW", value: "Central Lush Courtyard" },
      { label: "BATHROOM", value: "Ensuite with Italian Stone Rain Shower" },
      { label: "LOCATION", value: "Ground & First Floor, Courtyard Wing" },
    ],
  },
  {
    slug: "garden-suite",
    name: "Garden Suite",
    category: "garden",
    size: "42 m²",
    bed: "King Bed",
    view: "Garden View",
    feature: "Private Balcony",
    price: 18500,
    priceDisplay: "₹18,500 / night",
    description:
      "A spacious suite with natural textures, soft light and a private garden-facing balcony.",
    longDescription:
      "The Garden Suite offers an expansive open plan bathed in soft daylight. Featuring hand-turned brass fixtures, warm terracotta flooring, and a private shaded balcony over the tropical gardens, it provides an elevated sanctuary for slow, contemplative mornings.",
    guests: 2,
    inventoryCount: 10,
    amenities: [
      "Wi-Fi (High-speed Fiber)",
      "Air conditioning & climate control",
      "Custom Teak King-size bed",
      "Monsoon rain shower & deep soaking tub",
      "Curated artisanal mini bar",
      "Espresso & pour-over station",
      "Smart TV with soundbar",
      "Organic Kerala botanical bath amenities",
      "Private garden balcony with lounge chairs",
      "Dedicated reading corner",
    ],
    image: "/images/room-garden.jpg",
    gallery: [
      "/images/room-garden.jpg",
      "/images/room-shower.jpg",
      "/images/story-architecture.jpg",
      "/images/intro-courtyard.jpg",
    ],
    index: "ROOM 02",
    headline: "A LITTLE MORE ROOM TO BREATHE.",
    specifications: [
      { label: "ROOM SIZE", value: "42 m² / 450 sq ft" },
      { label: "BED TYPE", value: "Custom King-Size Bed" },
      { label: "MAX OCCUPANCY", value: "2 Adults + 1 Child" },
      { label: "VIEW", value: "Private Garden & Heritage Palms" },
      { label: "OUTDOOR SPACE", value: "Private Covered Balcony (10 m²)" },
      { label: "LOCATION", value: "First & Second Floor, Garden Pavilion" },
    ],
  },
  {
    slug: "aurelia-suite",
    name: "Aurelia Suite",
    category: "suite",
    size: "65 m²",
    bed: "King Bed",
    view: "Private Terrace",
    feature: "Living Room",
    price: 26000,
    priceDisplay: "₹26,000 / night",
    description:
      "Our most spacious accommodation, designed for long, slow stays with a private terrace.",
    longDescription:
      "The flagship residence of Aurelia House. Featuring a secluded living salon, custom hand-carved furniture, full stone bathroom with freestanding soaking bath, and an expansive private sun terrace overlooking the historic red-tile roofs of Fort Kochi.",
    guests: 2,
    inventoryCount: 4,
    amenities: [
      "Wi-Fi (High-speed Fiber)",
      "Zoned climate control",
      "Super-King custom bed with organic cottons",
      "Double rain shower & freestanding stone bathtub",
      "Full cocktail cabinet & premium mini bar",
      "Specialty coffee brewing bar",
      "High-end sound system & Smart TV",
      "Exclusive botanical skincare collection",
      "Private rooftop sun terrace with daybed",
      "Separate lounge & dining salon",
      "Personalized host service",
    ],
    image: "/images/room-aurelia.jpg",
    gallery: [
      "/images/room-aurelia.jpg",
      "/images/room-shower.jpg",
      "/images/hero-golden-hour.jpg",
      "/images/story-main.jpg",
    ],
    index: "ROOM 03",
    headline: "OUR SIGNATURE SANCTUARY.",
    specifications: [
      { label: "ROOM SIZE", value: "65 m² / 700 sq ft" },
      { label: "BED TYPE", value: "Custom Super-King Bed" },
      { label: "MAX OCCUPANCY", value: "3 Adults" },
      { label: "VIEW", value: "Panoramic Fort Kochi Rooftops & Garden" },
      { label: "OUTDOOR SPACE", value: "Private Sun Terrace (20 m²)" },
      { label: "LOCATION", value: "Top Floor, Main Residence" },
    ],
  },
];
