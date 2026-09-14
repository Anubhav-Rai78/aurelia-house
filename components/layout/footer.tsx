import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import {
  BRAND_NAME,
  CONTACT,
  COPYRIGHT,
  FOOTER_NAV,
  SOCIAL,
  TAGLINE,
} from "@/lib/constants";

/**
 * Site footer — 4-column grid on desktop, stacked on mobile.
 * Forest background, ivory text, always renders identically on every page.
 */
export function Footer() {
  return (
    <footer className="bg-forest py-16 text-ivory md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Column 1 — Wordmark + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-display-sm hover:opacity-80 transition-opacity">
              {BRAND_NAME}
            </Link>
            <p className="mt-3 text-body-sm text-ivory/70">{TAGLINE}</p>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h2 className="text-label text-ivory/50">Navigate</h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_NAV.map((item) => (
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
                href={SOCIAL.instagram}
                aria-label="Aurelia House on Instagram"
                className="inline-flex items-center justify-center rounded-full border border-ivory/30 p-2 transition-colors duration-300 hover:border-sand hover:text-sand"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL.facebook}
                aria-label="Aurelia House on Facebook"
                className="inline-flex items-center justify-center rounded-full border border-ivory/30 p-2 transition-colors duration-300 hover:border-sand hover:text-sand"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-ivory/20 pt-8">
          <p className="text-body-sm text-ivory/50">{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}