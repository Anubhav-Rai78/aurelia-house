import { SiteImage } from "@/components/ui/site-image";
import type { Experience } from "@/data/experiences";
import { cn } from "@/lib/utils";

/**
 * ExperienceCard — two display modes:
 *   • `overlay` (Home teaser): title overlaid bottom-left on the image with a
 *     forest scrim. Alternating aspect ratios per card index.
 *   • `below` (Experiences page): full description + price beneath the image.
 */
export function ExperienceCard({
  experience,
  index,
  mode = "below",
  className,
}: {
  experience: Experience;
  index: number;
  mode?: "overlay" | "below";
  className?: string;
}) {
  // Alternating heights: cards 1 & 4 taller (aspect-[4/5] overlay / [3/4] below),
  // cards 2 & 3 wider (aspect-[16/10]) — breaks the uniform grid monotony.
  const isAlt = index === 0 || index === 3;
  const aspect = mode === "overlay" ? (isAlt ? "aspect-[4/5]" : "aspect-[16/10]") : (isAlt ? "aspect-[3/4]" : "aspect-[16/10]");

  const captions = [
    "Placeholder — backwaters at sunrise, private boat, mist over water",
    "Placeholder — Fort Kochi street at night, warm lantern light",
    "Placeholder — cooking with a local chef, Kerala kitchen",
    "Placeholder — harbour sunset cruise, golden light on water",
  ];
  const caption = captions[index] ?? captions[0];

  const sizes = mode === "overlay" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw";

  if (mode === "overlay") {
    return (
      <article className={cn("group relative overflow-hidden rounded", aspect, className)}>
        <SiteImage
          src={experience.image}
          alt={experience.title}
          caption={caption}
          aspectRatio="absolute inset-0 h-full w-full"
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
        />
        {/* Forest scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" aria-hidden="true" />
        <h3 className="absolute bottom-4 left-4 right-4 text-display-sm text-ivory">
          {experience.title}
        </h3>
      </article>
    );
  }

  return (
    <article className={cn("flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory", className)}>
      <div className={cn("overflow-hidden", aspect)}>
        <SiteImage
          src={experience.image}
          alt={experience.title}
          caption={caption}
          aspectRatio="h-full w-full"
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-display-sm text-forest">{experience.title}</h2>
        <p className="mt-2 text-body text-charcoal">{experience.description}</p>
        <p className="mt-4 text-price text-terracotta">{experience.priceDisplay}</p>
      </div>
    </article>
  );
}
