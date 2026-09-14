import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BookThisRoomSidebar } from "@/components/ui/book-this-room-sidebar";
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
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="overflow-hidden rounded">
            <SiteImage
              src={room.image}
              alt={`${room.name} at Aurelia House, Fort Kochi`}
              caption={captions[room.slug] ?? "Placeholder — room interior"}
              aspectRatio="aspect-[16/9] md:aspect-[21/9]"
              className="h-full w-full"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
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

            <SectionReveal className="mt-12">
              <h2 className="text-label text-terracotta">GALLERY</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="aspect-[4/3] overflow-hidden rounded">
                  <SiteImage
                    src={room.image}
                    alt={`${room.name} bedroom view`}
                    caption={`${room.name} — bedroom`}
                    aspectRatio="h-full w-full"
                    className="h-full w-full"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded">
                  <SiteImage
                    src="/images/room-shower.jpg"
                    alt={`${room.name} bathroom detail`}
                    caption={`${room.name} — bathroom`}
                    aspectRatio="h-full w-full"
                    className="h-full w-full"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded md:block">
                  <SiteImage
                    src="/images/intro-courtyard.jpg"
                    alt={`${room.name} view from balcony`}
                    caption={`${room.name} — ${room.view.toLowerCase()}`}
                    aspectRatio="h-full w-full"
                    className="h-full w-full"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-price text-terracotta">{room.priceDisplay}</p>
              <Button href={`/contact?room=${room.name}`} variant="primary" className="mt-6 w-full">
                {ROOM_PAGE.bookThisRoomCta}
              </Button>
              <BookThisRoomSidebar roomName={room.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
