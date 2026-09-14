import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { Room } from "@/data/rooms";
import { STAY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * RoomCard — reused on Home preview and Stay listing.
 * Image on top (aspect ratio overridable per page), then p-6 text block:
 * name → spec line → description → price → View Room button.
 * Cards separate via a 1px forest/10 hairline — never a shadow.
 */
export function RoomCard({
  room,
  imageAspectRatio = "aspect-[4/3]",
  showIndex = false,
  className,
}: {
  room: Room;
  imageAspectRatio?: string;
  showIndex?: boolean;
  className?: string;
}) {
  const imageCaption =
    room.name === "Courtyard Room"
      ? "Placeholder — Courtyard Room interior, calm and intimate, warm natural light"
      : room.name === "Garden Suite"
        ? "Placeholder — Garden Suite interior, natural textures, soft light"
        : "Placeholder — Aurelia Suite interior, spacious, private terrace";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory",
        className
      )}
    >
      {/* Image with subtle hover zoom on the inner element */}
      <Link
        href={`/stay/${room.slug}`}
        className="group relative block overflow-hidden"
        aria-label={`View ${room.name}`}
      >
        <div
          className={cn(
            "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            imageAspectRatio
          )}
        >
          <PlaceholderImage
            caption={imageCaption}
            aspectRatio="h-full w-full"
            className="h-full w-full"
          />
        </div>
        {showIndex && (
          <span className="absolute left-4 top-4 text-label text-ivory">
            {room.index}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-display-sm text-forest">{room.name}</h3>
        <p className="mt-2 text-body-sm text-forest/70">
          {room.size} · {room.bed} · {room.view}
        </p>
        <p className="mt-3 text-body text-charcoal">{room.description}</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <span className="text-price text-terracotta">{room.priceDisplay}</span>
        </div>
        <Button
          href={`/stay/${room.slug}`}
          variant="secondary"
          className="mt-4 w-full md:w-auto"
        >
          {STAY.viewRoomCta}
        </Button>
      </div>
    </article>
  );
}