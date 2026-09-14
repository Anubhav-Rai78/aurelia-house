"use client";

import { useState, useEffect } from "react";
import { HOME } from "@/lib/constants";

/**
 * Testimonial — multi-quote slider featuring guest reviews.
 */
export function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HOME.testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = HOME.testimonials[index];

  return (
    <figure className="mx-auto max-w-[760px] px-6 py-16 text-center md:py-[120px]">
      <blockquote className="text-display-sm min-h-[90px] italic text-forest transition-opacity duration-500">
        “{current?.quote}”
      </blockquote>
      <figcaption className="mt-4 text-body-sm text-forest/60">
        {current?.author}
      </figcaption>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2">
        {HOME.testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-terracotta" : "w-2 bg-forest/20"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}