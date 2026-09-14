import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BookThisRoomSidebar } from "@/components/ui/book-this-room-sidebar";
import { RoomCard } from "@/components/ui/room-card";
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
    title: `${room.name} — Aurelia House`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <section className="flex h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-display-lg text-forest">{ROOM_PAGE.notFoundHeadline}</h1>
        <Button href="/stay" variant="secondary" className="mt-8">
          {ROOM_PAGE.backCta}
        </Button>
      </section>
    );
  }

  const otherRooms = rooms.filter((r) => r.slug !== slug);

  return (
    <>
      {/* Hero photo */}
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="overflow-hidden rounded">
            <SiteImage
              src={room.image}
              alt={`${room.name} at Aurelia House, Fort Kochi`}
              caption={`${room.name} sanctuary view`}
              aspectRatio="aspect-[16/9] md:aspect-[21/9]"
              className="h-full w-full"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main room details & sidebar */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-8">
            <SectionReveal>
              <span className="text-label text-forest/40">{room.index}</span>
              {room.headline ? (
                <h1 className="mt-2 text-display-lg whitespace-pre-line text-forest">
                  {room.headline}
                </h1>
              ) : (
                <h1 className="mt-2 text-display-lg text-forest">{room.name}</h1>
              )}
              <p className="mt-6 max-w-[560px] text-body-lg text-charcoal">
                {room.longDescription || room.description}
              </p>
              <p className="mt-4 text-body-sm text-forest/60">
                {room.size} · {room.bed} · {room.view} · Max {room.guests} Guests
              </p>
            </SectionReveal>

            {/* Room Specifications Table */}
            <SectionReveal className="mt-12">
              <h2 className="text-label text-terracotta">SPECIFICATIONS</h2>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {room.specifications.map((spec) => (
                  <div key={spec.label} className="border-b border-forest/10 pb-3">
                    <dt className="text-label text-forest/50">{spec.label}</dt>
                    <dd className="mt-1 text-body-sm text-forest">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </SectionReveal>

            {/* Amenities Grid */}
            <SectionReveal className="mt-12">
              <h2 className="text-label text-terracotta">{ROOM_PAGE.amenitiesLabel}</h2>
              <div className="scroll-snap-x scroll-hide mt-6 flex gap-3 overflow-x-auto pb-4 md:flex-wrap">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex-shrink-0 rounded border border-forest/10 px-4 py-2 text-body-sm text-forest bg-ivory"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </SectionReveal>

            {/* Dedicated Photo Gallery */}
            <SectionReveal className="mt-12">
              <h2 className="text-label text-terracotta">ROOM GALLERY</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {room.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded">
                    <SiteImage
                      src={img}
                      alt={`${room.name} gallery image ${i + 1}`}
                      caption={`${room.name} view`}
                      aspectRatio="h-full w-full"
                      className="h-full w-full"
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-price text-terracotta">{room.priceDisplay}</p>
              <BookThisRoomSidebar roomName={room.name} pricePerNight={room.price} />
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Rooms */}
      <section className="bg-sand/20 py-16 md:py-[100px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h2 className="text-display-md text-center text-forest">OTHER SANCTUARIES</h2>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherRooms.map((r) => (
              <SectionReveal key={r.slug}>
                <RoomCard room={r} showIndex />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
