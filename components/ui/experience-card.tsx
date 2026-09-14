import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { SiteImage } from "@/components/ui/site-image";
import type { Experience } from "@/data/experiences";
import { cn } from "@/lib/utils";

/**
 * ExperienceCard — two display modes:
 *   • `overlay` (Home teaser): title overlaid bottom-left on the image with a forest scrim.
 *   • `below` (Experiences page): full description + price + duration beneath image.
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
  const isAlt = index === 0 || index === 3;
  const aspect = mode === "overlay" ? (isAlt ? "aspect-[4/5]" : "aspect-[16/10]") : (isAlt ? "aspect-[3/4]" : "aspect-[16/10]");

  if (mode === "overlay") {
    return (
      <article className={cn("group relative overflow-hidden rounded", aspect, className)}>
        <SiteImage
          src={experience.image}
          alt={experience.title}
          caption={experience.title}
          aspectRatio="absolute inset-0 h-full w-full"
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-sand">
            {experience.duration}
          </span>
          <h3 className="mt-1 text-display-sm text-ivory">
            {experience.title}
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory", className)}>
      <div className={cn("overflow-hidden", aspect)}>
        <SiteImage
          src={experience.image}
          alt={experience.title}
          caption={experience.title}
          aspectRatio="h-full w-full"
          className="h-full w-full transition-transform duration-500 ease-out hover:scale-[1.03]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-[12px] text-forest/60">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {experience.duration}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {experience.groupSize}
          </span>
        </div>

        <h2 className="mt-2 text-display-sm text-forest">{experience.title}</h2>
        <p className="mt-2 text-body text-charcoal">{experience.description}</p>
        
        <div className="mt-6 flex items-center justify-between border-t border-forest/10 pt-4">
          <span className="text-price text-terracotta">{experience.priceDisplay}</span>
          <Link 
            href={`/contact?experience=${experience.slug}`}
            className="text-body-sm text-terracotta underline decoration-terracotta/30 underline-offset-4 transition-colors hover:decoration-terracotta"
          >
            Enquire & Reserve →
          </Link>
        </div>
      </div>
    </article>
  );
}
