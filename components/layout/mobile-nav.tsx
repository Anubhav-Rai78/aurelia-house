"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, BOOKING_CTA } from "@/lib/constants";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Full-screen mobile navigation overlay. Forest background, ivory text,
 * large serif links for generous tap targets. Fades/slides in over 300ms.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-forest text-ivory transition-all duration-300 md:hidden",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!open}
    >
      {/* Top bar with wordmark + close */}
      <div className="flex items-center justify-between px-6 py-6">
        <Link
          href="/"
          onClick={onClose}
          className="group flex items-center gap-3"
        >
          <BrandIcon
            size={30}
            className="shrink-0 transition-colors duration-300 group-hover:text-terracotta"
          />
          <span className="font-serif text-[20px] font-medium tracking-[0.02em]">
            {BRAND_NAME}
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center p-2"
          aria-label="Close navigation menu"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Stacked nav links — display-sm size for editorial feel */}
      <nav
        className="flex flex-1 flex-col justify-center gap-2 px-6"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="py-3 text-display-sm transition-colors duration-300 hover:text-sand"
            style={open ? { transitionDelay: `${i * 40}ms` } : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Booking CTA stays highly visible on mobile */}
      <div className="px-6 pb-10">
        <Button
          href="/contact"
          variant="primary"
          className="w-full"
          onClick={onClose}
        >
          {BOOKING_CTA}
        </Button>
      </div>
    </div>
  );
}