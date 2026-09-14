"use client";

import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import { cn } from "@/lib/utils";

/**
 * SectionReveal — client wrapper applying the single site-wide entrance
 * treatment: fade-up-on-scroll (400ms, ease-out) triggered once per section
 * as it enters view. The whole section moves together — never staggered
 * per-child. Respects prefers-reduced-motion via CSS.
 */
export function SectionReveal({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useSectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("reveal", className)} id={id}>
      {children}
    </div>
  );
}