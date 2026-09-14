"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary — Aurelia House branded.
 * No error codes, no tracking IDs, no console output visible to users.
 * Friendly, calm message; "Back to Home" recovery action.
 */
export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled Route Error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-label text-terracotta">SOMETHING WENT WRONG</span>
      <h1 className="mt-4 text-display-lg text-forest">NOT QUITE RIGHT.</h1>
      <p className="mt-4 max-w-[420px] text-body text-charcoal">
        Something unexpected happened. You can try again, or head back to the home page.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded bg-forest px-8 py-4 text-label text-ivory transition-colors duration-300 hover:bg-terracotta"
        >
          TRY AGAIN
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded border border-forest bg-transparent px-8 py-4 text-label text-forest transition-colors duration-300 hover:bg-forest/10"
        >
          BACK TO HOME
        </a>
      </div>
    </section>
  );
}
