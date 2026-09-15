import { SectionReveal } from "@/components/ui/section-reveal";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { GALLERY } from "@/lib/constants";

export const metadata = {
  title: "Gallery — Aurelia House",
  description: "Visual moments from Aurelia House, Fort Kochi, MORA dining, and our curated experiences.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-sand/30 pb-16 pt-24 md:pb-[80px] md:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg text-center text-forest">{GALLERY.headline}</h1>
            <p className="mt-3 text-center text-body text-forest/70">
              An editorial visual journey through architecture, dining, rooms, and Fort Kochi
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <GalleryGrid />
      </section>
    </>
  );
}