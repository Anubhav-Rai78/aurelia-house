"use client";

import { useEffect, useRef } from "react";

/**
 * Section-reveal hook — observes an element and adds the `revealed` class
 * once it enters the viewport (threshold 0.2, single trigger). The whole
 * section moves together per the site-wide motion policy; never stagger
 * child elements.
 *
 * Respects prefers-reduced-motion via CSS in globals.css (reveal elements
 * are shown at final state immediately).
 *
 * Usage:
 *   const ref = useSectionReveal<HTMLDivElement>();
 *   return <div ref={ref} className="reveal">…</div>;
 */
export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is unavailable, show content immediately.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}