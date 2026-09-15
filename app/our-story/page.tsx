import { SectionReveal } from "@/components/ui/section-reveal";
import { SiteImage } from "@/components/ui/site-image";
import { OUR_STORY } from "@/lib/constants";

export const metadata = {
  title: "Our Story — Aurelia House",
  description: "Aurelia House was imagined as a modern retreat rooted in the architectural character and slow rhythm of Fort Kochi.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sand/30 pb-16 pt-24 md:pb-[80px] md:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {OUR_STORY.headline}
            </h1>
            <p className="mt-4 text-center text-body text-forest/70">
              A 24-room design-led retreat combining Kerala heritage with quiet, editorial luxury
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Main body — 12-col grid */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Image — left */}
          <SectionReveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <SiteImage
                src="/images/story-main.jpg"
                alt="Architectural detail at Aurelia House — natural materials and a sense of place"
                caption="Natural materials and authentic sense of place"
                aspectRatio="h-full w-full"
                className="h-full w-full"
                sizes="(min-width: 768px) 42vw, 100vw"
              />
            </div>
          </SectionReveal>

          {/* Text — right side */}
          <SectionReveal className="md:col-span-7 md:col-start-7 md:row-start-1">
            <span className="text-label text-terracotta">FOUNDER STATEMENT</span>
            <h2 className="mt-2 text-display-md text-forest">CHARACTER OVER CONVENTION.</h2>
            <div className="mt-6 space-y-6">
              {OUR_STORY.paragraphs.map((p, i) => (
                <p key={i} className="text-body-lg text-charcoal leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Pull quote */}
        <SectionReveal className="mx-auto max-w-[800px] px-6 py-16 text-center md:py-[120px]">
          <blockquote className="text-display-sm italic text-forest">
            “{OUR_STORY.pullQuote}”
          </blockquote>
        </SectionReveal>

        {/* Subsections — 4 Pillars */}
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {OUR_STORY.subsections.map((sub, i) => {
                const images = [
                  "/images/story-architecture.jpg",
                  "/images/story-main.jpg",
                  "/images/intro-courtyard.jpg",
                  "/images/kochi-fishing-nets.jpg",
                ];
                return (
                  <article key={sub.label} className="flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory">
                    <div className="aspect-[3/4] overflow-hidden">
                      <SiteImage
                        src={images[i]}
                        alt={sub.label}
                        caption={sub.label}
                        aspectRatio="h-full w-full"
                        className="h-full w-full"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-label text-terracotta">{sub.label}</h3>
                      <p className="mt-2 text-body-sm text-charcoal/80">{sub.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
