import { SectionReveal } from "@/components/ui/section-reveal";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { GALLERY } from "@/lib/constants";

export const metadata = {
  title: "Gallery",
  description: "Visual moments from Aurelia House, Fort Kochi, MORA dining, and our curated experiences.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-sand/30 pt-32 pb-16 md:pt-40 md:pb-[80px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg text-center text-forest">{GALLERY.headline}</h1>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <GalleryGrid />
      </section>
    </>
  );
}