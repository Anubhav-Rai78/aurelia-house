import { SectionReveal } from "@/components/ui/section-reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { OUR_STORY } from "@/lib/constants";

export const metadata = {
  title: "Our Story — A Sense of Place",
  description: "Aurelia House was imagined as a modern retreat rooted in the character of Fort Kochi.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero — large headline over atmospheric portrait image */}
      <section className="bg-sand/30 pt-32 pb-16 md:pt-40 md:pb-[80px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {OUR_STORY.headline}
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Main body — 12-col grid, image left + text right */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Image — left, portrait */}
          <SectionReveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <PlaceholderImage
                caption="Architectural / founder detail — natural materials, authentic sense of place"
                aspectRatio="h-full w-full"
                className="h-full w-full"
              />
            </div>
          </SectionReveal>

          {/* Text — right side */}
          <SectionReveal className="md:col-span-7 md:col-start-7 md:row-start-1">
            {OUR_STORY.paragraphs.map((p, i) => (
              <p key={i} className="text-body-lg text-charcoal">
                {p}
              </p>
            ))}
          </SectionReveal>
        </div>

        {/* Pull quote */}
        <SectionReveal className="mx-auto max-w-[800px] px-6 py-16 text-center md:py-[120px]">
          <blockquote className="text-display-sm italic text-forest">
            “{OUR_STORY.pullQuote}”
          </blockquote>
        </SectionReveal>

        {/* Subsections — horizontal strip with cards */}
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {OUR_STORY.subsections.map((sub, i) => {
                const captions = [
                  "Placeholder — architectural detail, contemporary design, Kerala materials",
                  "Placeholder — the founder in a calm, natural setting",
                  "Placeholder — the hotel's philosophy in visual form, quiet spaces",
                  "Placeholder — local cultural element woven into the hotel's design",
                ];
                return (
                  <article key={sub.label} className="flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory">
                    <div className="aspect-[3/4] overflow-hidden">
                      <PlaceholderImage
                        caption={captions[i]}
                        aspectRatio="h-full w-full"
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-label text-terracotta">{sub.label}</h2>
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