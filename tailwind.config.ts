import type { Config } from "tailwindcss";

// ─── AURELIA HOUSE Design Tokens ─────────────────────────────────────────────
// Luxury boutique hotel — warm ivory / deep forest / sand / terracotta palette.
// Cormorant Garamond (serif headings) + DM Sans (body/UI).
// 8px base unit. Rounded-[4px] site-wide constant. No shadows — borders only.
// ──────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  // Safelist button text colors to prevent JIT from stripping them
  safelist: [
    "text-ivory",
    "text-forest",
    "hover:text-ivory",
    "hover:text-forest",
    "text-ivory!",
    "text-forest!",
    "hover:text-ivory!",
    "hover:text-forest!",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E8",
        forest: "#17352F",
        sand: "#D8C8AA",
        terracotta: "#A95F43",
        charcoal: "#242421",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      screens: {
        xl: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
