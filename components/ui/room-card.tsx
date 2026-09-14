import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import type { Room } from "@/data/rooms";
import { STAY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * RoomCard — reused on Home preview and Stay listing.
 * Displays room specs, max guests badge, price per night, and Quick View link.
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
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory transition-colors duration-300 hover:border-forest/30",
        className
      )}
    >
      {/* Image with subtle hover zoom */}
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
          <SiteImage
            src={room.image}
            alt={`${room.name} interior at Aurelia House, Fort Kochi`}
            caption={`${room.name} interior`}
            aspectRatio="h-full w-full"
            className="h-full w-full"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
        {showIndex && (
          <span className="absolute left-4 top-4 rounded bg-forest/80 px-2 py-1 text-label text-ivory backdrop-blur-sm">
            {room.index}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-display-sm text-forest">{room.name}</h3>
          <span className="text-[11px] font-sans uppercase tracking-wider text-forest/50">
            Max {room.guests} Guests
          </span>
        </div>

        <p className="mt-2 text-body-sm text-forest/70">
          {room.size} · {room.bed} · {room.view}
        </p>
        <p className="mt-3 text-body text-charcoal">{room.description}</p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <span className="text-price text-terracotta">{room.priceDisplay}</span>
        </div>
        <Button
          href={`/stay/${room.slug}`}
          variant="secondary"
          className="mt-4 w-full"
        >
          {STAY.viewRoomCta}
        </Button>
      </div>
    </article>
  );
}
