"use client";

import { useEffect } from "react";

// Root-level error boundary — must render its own <html>/<body> tags
// because the root layout itself may have failed.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <span className="text-label text-terracotta">SOMETHING WENT WRONG</span>
          <h1 className="mt-4 text-display-lg text-forest">NOT QUITE RIGHT.</h1>
          <p className="mt-4 max-w-[420px] text-body text-charcoal">
            A critical error prevented this page from loading.
            Please try again, or return to the home page.
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
      </body>
    </html>
  );
}
