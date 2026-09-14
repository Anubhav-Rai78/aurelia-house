import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BookingWidget } from "@/components/ui/booking-widget";
import { RoomCard } from "@/components/ui/room-card";
import { ExperienceCard } from "@/components/ui/experience-card";
import { Testimonial } from "@/components/ui/testimonial";
import { SiteImage } from "@/components/ui/site-image";
import { rooms } from "@/data/rooms";
import { experiences } from "@/data/experiences";
import { HOME } from "@/lib/constants";

export const metadata = {
  title: "Aurelia House — Luxury Boutique Hotel in Fort Kochi",
  description:
    "A 24-room design-led boutique hotel in Fort Kochi, Kerala. Contemporary architecture, Kerala heritage, MORA dining and slow luxury.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative flex h-screen flex-col justify-end overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <div className="animate-hero-zoom h-full w-full">
            <SiteImage
              src="/images/hero-golden-hour.jpg"
              alt="Aurelia House at golden hour — architecture-forward exterior in warm Kerala light"
              caption="Cinematic exterior of Aurelia House at golden hour"
              aspectRatio="h-full w-full"
              className="h-full w-full"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/45 to-forest/30"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="hero-entrance pb-14 text-center md:pb-24">
            <h1 className="text-display-xl whitespace-pre-line text-ivory">
              {HOME.heroHeadline}
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-body-lg text-ivory/90">
              {HOME.heroSubtext}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary-inverse">
                {HOME.heroCta1}
              </Button>
              <Button href="#introduction" variant="secondary-inverse">
                {HOME.heroCta2}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Booking Widget ───────────────────────────────────── */}
      <section className="relative z-20 mx-auto max-w-[1120px] px-6 md:px-12">
        <BookingWidget overlap />
      </section>

      {/* ── Section 3: Introduction ─────────────────────────────────────── */}
      <section id="introduction" className="scroll-mt-24 py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-12">
          <SectionReveal className="order-1 md:col-span-5 md:col-start-8 md:order-none">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <SiteImage
                src="/images/intro-courtyard.jpg"
                alt="Quiet courtyard at Aurelia House — natural materials, dappled light"
                caption="Architectural detail — courtyard natural materials"
                aspectRatio="h-full w-full"
                className="h-full w-full"
                sizes="(min-width: 768px) 42vw, 100vw"
              />
            </div>
          </SectionReveal>
          <SectionReveal className="md:col-span-7 md:col-start-1 md:row-start-1">
            <span className="text-label text-terracotta">{HOME.introLabel}</span>
            <h2 className="mt-4 text-display-md text-forest">
              {HOME.introHeadline}
            </h2>
            <p className="mt-6 max-w-[520px] text-body text-charcoal">
              {HOME.introBody}
            </p>
            <Button href="/our-story" variant="secondary" className="mt-8">
              {HOME.introCta}
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* ── Section 4: Rooms Preview ────────────────────────────────────── */}
      <section className="bg-sand/30 py-16 md:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h2 className="text-display-md text-center text-forest">
              {HOME.roomsHeadline}
            </h2>
            <p className="mt-3 text-center text-body-sm text-forest/60">
              24 design-led sanctuaries across three distinct room categories
            </p>
          </SectionReveal>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {rooms.map((room, i) => (
              <SectionReveal key={room.slug} className="flex">
                <RoomCard
                  room={room}
                  showIndex
                  imageAspectRatio={i === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                  className="w-full"
                />
              </SectionReveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/stay" variant="primary">
              {HOME.roomsCta}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 5: Dining ───────────────────────────────────────────── */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-12">
          <SectionReveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <SiteImage
                src="/images/dining-home.jpg"
                alt="Plated coastal dish from MORA, Aurelia House's restaurant"
                caption="MORA signature coastal dish"
                aspectRatio="h-full w-full"
                className="h-full w-full"
                sizes="(min-width: 768px) 42vw, 100vw"
              />
            </div>
          </SectionReveal>
          <SectionReveal className="md:col-span-7">
            <h2 className="text-display-md whitespace-pre-line text-forest">
              {HOME.diningHeadline}
            </h2>
            <p className="mt-6 max-w-[480px] text-body text-charcoal">
              {HOME.diningBody}
            </p>
            <p className="mt-4 font-serif text-[28px] font-medium leading-[1.2] tracking-[0.05em] text-forest">
              {HOME.restaurantName}
            </p>
            <Button href="/dining" variant="secondary" className="mt-8">
              {HOME.diningCta}
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* ── Section 6: Experiences ──────────────────────────────────────── */}
      <section className="bg-forest py-16 text-ivory md:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h2 className="text-display-md mx-auto max-w-[640px] text-center text-ivory">
              {HOME.experiencesHeadline}
            </h2>
          </SectionReveal>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {experiences.map((experience, i) => (
              <SectionReveal key={experience.slug}>
                <ExperienceCard experience={experience} index={i} mode="overlay" />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Testimonial ──────────────────────────────────────── */}
      <SectionReveal>
        <Testimonial />
      </SectionReveal>

      {/* ── Section 8: Final CTA ────────────────────────────────────────── */}
      <section className="bg-forest py-16 text-center text-ivory md:py-[120px]">
        <SectionReveal>
          <h2 className="text-display-lg text-ivory">{HOME.finalCtaHeadline}</h2>
          <div className="mt-8 flex justify-center">
            <Button href="/stay" variant="primary-inverse">
              {HOME.finalCtaButton}
            </Button>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
