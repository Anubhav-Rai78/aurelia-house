// ─── Journal Article Data ─────────────────────────────────────────────────────
// Category names (Travel/Food/Philosophy/Design) are inferred to fill the
// required Category field structurally — the brief lists article titles but
// never names their categories. Flagged in SPEC-GAPS.md.
// ──────────────────────────────────────────────────────────────────────────────

export interface JournalArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "48-hours-in-fort-kochi",
    category: "Travel",
    title: "48 Hours in Fort Kochi",
    /* SPEC-GAP: no short description provided in brief for this article —
       write one only once real article content exists */
    description:
      "A considered weekend itinerary through Fort Kochi's streets, coast and courtyards.",
  },
  {
    slug: "a-guide-to-keralas-coastal-cuisine",
    category: "Food",
    title: "A Guide to Kerala's Coastal Cuisine",
    /* SPEC-GAP: no short description provided in brief */
    description:
      "From appam to karimeen, the ingredients and traditions behind MORA's menu.",
  },
  {
    slug: "why-slow-travel-matters",
    category: "Philosophy",
    title: "Why Slow Travel Matters",
    /* SPEC-GAP: no short description provided in brief */
    description:
      "On taking the long way around, and the small luxuries of a slower rhythm.",
  },
  {
    slug: "the-architecture-of-aurelia-house",
    category: "Design",
    title: "The Architecture of Aurelia House",
    /* SPEC-GAP: no short description provided in brief */
    description:
      "Contemporary design, Kerala materials, and a quiet sense of place.",
  },
];