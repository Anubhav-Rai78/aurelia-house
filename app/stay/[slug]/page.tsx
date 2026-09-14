import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BookingWidget } from "@/components/ui/booking-widget";
import { rooms } from "@/data/rooms";
import { ROOM_PAGE } from "@/lib/constants";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: `${room.name} — Room Details`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <section className="flex h-[60vh] flex-col items-center justify-center text-center px-6">
        <h1 className="text-display-lg text-forest">{ROOM_PAGE.notFoundHeadline}</h1>
        <Button href="/stay" variant="secondary" className="mt-8">
          {ROOM_PAGE.backCta}
        </Button>
      </section>
    );
  }

  const captions: Record<string, string> = {
    "courtyard-room": "Placeholder — Courtyard Room interior, warm natural light",
    "garden-suite": "Placeholder — Garden Suite interior, natural textures, soft light",
    "aurelia-suite": "Placeholder — Aurelia Suite interior, spacious, private terrace",
  };

  return (
    <>
      {/* Hero image — large, full-width, generous aspect */}
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="overflow-hidden rounded">
            <PlaceholderImage
              caption={captions[room.slug] ?? "Placeholder — room interior"}
              aspectRatio="aspect-[16/9] md:aspect-[21/9]"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Room details */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Main content (col span 8) */}
          <div className="md:col-span-8">
            <SectionReveal>
              <span className="text-label text-forest/40">{room.index}</span>
              {room.headline && (
                <h1 className="mt-2 text-display-lg whitespace-pre-line text-forest">
                  {room.headline}
                </h1>
              )}
              {!room.headline && (
                <h1 className="mt-2 text-display-lg text-forest">{room.name}</h1>
              )}
              <p className="mt-6 max-w-[520px] text-body-lg text-charcoal">
                {room.description}
              </p>
              <p className="mt-4 text-body-sm text-forest/60">
                {room.size} · {room.bed} · {room.view}
              </p>
            </SectionReveal>

            {/* Amenities — horizontal scroll on mobile */}
            <SectionReveal className="mt-12">
              <h2 className="text-label text-terracotta">{ROOM_PAGE.amenitiesLabel}</h2>
              <div className="scroll-snap-x scroll-hide mt-6 flex gap-4 overflow-x-auto pb-4 md:flex-wrap md:gap-3">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex-shrink-0 rounded border border-forest/10 px-4 py-2 text-body-sm text-forest"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Sidebar: price + CTA + BookingWidget (col span 4) */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-price text-terracotta">{room.priceDisplay}</p>
              <Button href="/contact" variant="primary" className="mt-6 w-full">
                {ROOM_PAGE.bookThisRoomCta}
              </Button>
              <div className="mt-8 rounded border border-forest/10 bg-ivory p-4">
                <p className="text-label text-forest/60">CHECK-IN</p>
                <input
                  type="date"
                  className="mt-2 w-full bg-transparent text-body text-forest focus:outline-none"
                />
                <p className="mt-4 text-label text-forest/60">CHECK-OUT</p>
                <input
                  type="date"
                  className="mt-2 w-full bg-transparent text-body text-forest focus:outline-none"
                />
                <Button href="/contact" variant="secondary" className="mt-4 w-full">
                  CHECK AVAILABILITY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}