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
    "./lib/**/*.{ts,tsx}",
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
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
