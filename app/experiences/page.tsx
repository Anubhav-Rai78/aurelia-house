import { SectionReveal } from "@/components/ui/section-reveal";
import { ExperienceCard } from "@/components/ui/experience-card";
import { experiences } from "@/data/experiences";
import { EXPERIENCES } from "@/lib/constants";

export const metadata = {
  title: "Experiences — Things to Do in Fort Kochi",
  description: "Curated experiences: backwaters, cooking, walking tours, and sunset cruises.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="bg-sand/30 pt-32 pb-16 md:pt-40 md:pb-[80px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {EXPERIENCES.headline}
            </h1>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {experiences.map((experience, i) => (
              <SectionReveal key={experience.slug}>
                <ExperienceCard experience={experience} index={i} mode="below" />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}