import { cn } from "@/lib/utils";

/**
 * Section label — the brief's uppercase tracked eyebrow device
 * ("A DIFFERENT KIND OF STAY."). Applied consistently across the site.
 * Terracotta by default; always a small label, never a headline.
 */
export function SectionLabel({
  children,
  className,
  tone = "terracotta",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "terracotta" | "forest" | "ivory";
}) {
  return (
    <span
      className={cn(
        "text-label",
        tone === "terracotta" && "text-terracotta",
        tone === "forest" && "text-forest/60",
        tone === "ivory" && "text-ivory/60",
        className
      )}
    >
      {children}
    </span>
  );
}