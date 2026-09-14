// ─── Experience Data ──────────────────────────────────────────────────────────
// Four experiences shown on Home preview (title only) and full detail on the
// Experiences page. Single source of truth — never hardcode anywhere else.
// ──────────────────────────────────────────────────────────────────────────────

export interface Experience {
  slug: string;
  title: string;
  description: string;
  priceDisplay: string;
  /** Local image path in /public/images. */
  image: string;
}

export const experiences: Experience[] = [
  {
    slug: "morning-on-the-backwaters",
    title: "Morning on the Backwaters",
    description: "Private sunrise boat experience.",
    priceDisplay: "₹3,500 / couple",
    image: "/images/exp-backwaters.jpg",
  },
  {
    slug: "fort-kochi-after-dark",
    title: "Fort Kochi After Dark",
    description: "Curated evening walking experience.",
    priceDisplay: "₹1,800 / person",
    image: "/images/exp-fort-kochi-night.jpg",
  },
  {
    slug: "the-kerala-table",
    title: "The Kerala Table",
    description: "Private cooking experience with a local chef.",
    priceDisplay: "₹2,500 / person",
    image: "/images/exp-cooking.jpg",
  },
  {
    slug: "harbour-sunset",
    title: "Harbour Sunset",
    description: "Private sunset cruise.",
    priceDisplay: "₹4,500 / couple",
    image: "/images/exp-sunset-cruise.jpg",
  },
];
