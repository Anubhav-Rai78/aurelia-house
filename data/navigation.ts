// ─── Navigation & Social Links ───────────────────────────────────────────────
// Single source of truth for site-wide navigation and social URLs. Header,
// MobileNav, and Footer all render from these so links can never drift apart.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

/** Primary site navigation — rendered by the desktop header and mobile nav. */
export const NAV_LINKS: NavLink[] = [
  { label: "Stay", href: "/stay" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
];

/**
 * Footer navigation = main links + utility pages. Kept at the footer's
 * title-case display style (the footer does not use the uppercase .text-label
 * treatment that the header does).
 */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Stay", href: "/stay" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/aureliahouse.kochi",
  facebook: "https://www.facebook.com/aureliahouse.kochi",
} as const;
