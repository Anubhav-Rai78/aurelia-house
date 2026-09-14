import Link from "next/link";

/**
 * 404 — Aurelia House branded. Warm, editorial, not cold or generic.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-label text-terracotta">PAGE NOT FOUND</span>
      <h1 className="mt-4 text-display-lg text-forest">SOMETHING WENT MISSING.</h1>
      <p className="mt-4 max-w-[420px] text-body text-charcoal">
        The page you&apos;re looking for may have moved, or may no longer exist.
        Let&apos;s get you back somewhere worth being.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded bg-forest px-8 py-4 text-label text-ivory transition-colors duration-300 hover:bg-terracotta"
      >
        BACK TO HOME
      </Link>
    </section>
  );
}
