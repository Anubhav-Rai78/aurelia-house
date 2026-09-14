import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Cormorant Garamond 400/500 for all headings (serif). DM Sans 400/500 for
// all body/UI text. Loaded via next/font per the brief's technical direction.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aurelia House — Boutique Hotel in Fort Kochi",
    template: "%s — Aurelia House",
  },
  description:
    "A 24-room design-led boutique hotel in Fort Kochi, Kerala. Contemporary architecture, Kerala heritage and slow luxury. Stay Somewhere Worth Remembering.",
  keywords: [
    "boutique hotel",
    "Fort Kochi",
    "Kerala",
    "Aurelia House",
    "luxury hotel",
    "MORA restaurant",
  ],
  openGraph: {
    title: "Aurelia House — Stay Somewhere Worth Remembering.",
    description:
      "A 24-room design-led boutique hotel in the heart of Fort Kochi.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-charcoal">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

