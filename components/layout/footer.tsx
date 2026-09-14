"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import {
  BRAND_NAME,
  CONTACT,
  COPYRIGHT,
  TAGLINE,
} from "@/lib/constants";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/data/navigation";

/**
 * Site footer — 4-column grid on desktop, stacked on mobile.
 * Includes Journal newsletter subscription form.
 */
export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-forest py-16 text-ivory md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Column 1 — Wordmark + tagline + Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex flex-col items-start transition-opacity hover:opacity-80">
              <BrandIcon size={144} className="mb-1 text-ivory" />
              <span className="text-display-sm">{BRAND_NAME}</span>
            </Link>
            <p className="mt-3 text-body-sm text-ivory/70">{TAGLINE}</p>

            <div className="mt-8 border-t border-ivory/15 pt-6">
              <p className="text-label text-ivory/60">JOURNAL NEWSLETTER</p>
              {subscribed ? (
                <p className="mt-3 text-body-sm text-sand">Thank you for subscribing.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex items-center border-b border-ivory/30 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-transparent text-body-sm text-ivory placeholder-ivory/40 focus:outline-none"
                  />
                  <button type="submit" aria-label="Subscribe" className="text-ivory hover:text-sand">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h2 className="text-label text-ivory/50">Navigate</h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm transition-colors duration-300 hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h2 className="text-label text-ivory/50">Contact</h2>
            <address className="mt-4 space-y-3 text-body-sm not-italic">
              <p>
                {CONTACT.name}
                <br />
                {CONTACT.address.join(", ")}
              </p>
              <p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-300 hover:text-sand"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors duration-300 hover:text-sand"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>

          {/* Column 4 — Follow */}
          <div>
            <h2 className="text-label text-ivory/50">Follow</h2>
            <div className="mt-4 flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aurelia House on Instagram"
                className="inline-flex items-center justify-center rounded-full border border-ivory/30 p-2 transition-colors duration-300 hover:border-sand hover:text-sand"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aurelia House on Facebook"
                className="inline-flex items-center justify-center rounded-full border border-ivory/30 p-2 transition-colors duration-300 hover:border-sand hover:text-sand"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-ivory/20 pt-8 sm:flex-row">
          <p className="text-body-sm text-ivory/50">{COPYRIGHT}</p>
          <div className="mt-4 flex gap-6 text-body-sm text-ivory/50 sm:mt-0">
            <Link href="/contact" className="hover:text-ivory">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-ivory">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}