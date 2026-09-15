"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BRAND_NAME, BOOKING_CTA } from "@/lib/constants";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    // Check initial position (e.g. on load with a hash or restored scroll).
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Site header. Two states:
 *   • Home at scrollY === 0: transparent background, ivory text over hero.
 *   • Everywhere else (and Home once scrolled): ivory background, forest text.
 * The booking CTA stays visible at all times — it never collapses into the
 * hamburger menu on mobile (brief requirement). The CTA is always primary
 * (forest background, ivory text) so "BOOK YOUR STAY" stays crisp and
 * legible whether the header is transparent over the hero or solid.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  // On non-home pages the header starts solid (no hero image behind it).
  const solid = isHome ? scrolled : true;

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[72px] transition-colors duration-300",
          solid
            ? "border-b border-forest/10 bg-ivory text-forest"
            : "bg-transparent text-ivory",
        )}
      >
        <div className="flex h-full w-full items-center justify-between px-6 md:px-8 lg:px-10">
          {/* Wordmark — brand name is already typed in caps; no CSS uppercase */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 py-1 transition-colors duration-300",
              solid ? "text-forest" : "text-ivory"
            )}
            aria-label="Aurelia House — home"
          >
            <BrandIcon
              size={64}
              viewBox="88 154 293 189"
              className="h-14 md:h-16 w-auto shrink-0 -my-2"
            />
            <span className="font-serif text-[20px] md:text-[22px] font-medium tracking-[0.02em]">
              {BRAND_NAME}
            </span>
          </Link>

          {/* Desktop nav (md and up) */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const href = item.href as string;
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-sans text-[13px] md:text-[14px] uppercase transition-all duration-300 py-1",
                    solid
                      ? "text-forest font-medium tracking-[0.12em] hover:text-terracotta"
                      : "text-white font-semibold tracking-[0.14em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:text-white/80",
                    isActive && "border-b-2 border-terracotta pb-0.5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* Booking CTA — always visible, never hidden on mobile.
                Always primary (forest bg / ivory text) so it stays crisp on
                both the transparent header over the hero and the solid header. */}
            <Button
              href="/contact"
              variant="primary"
              className="hidden px-6 py-3 md:inline-flex"
            >
              {BOOKING_CTA}
            </Button>
            <Button
              href="/contact"
              variant="primary"
              className="inline-flex px-4 py-3 md:hidden"
              aria-label="Book your stay"
            >
              BOOK
            </Button>

            {/* Hamburger (md and below) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
