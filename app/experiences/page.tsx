import { SectionReveal } from "@/components/ui/section-reveal";
import { ExperienceCard } from "@/components/ui/experience-card";
import { experiences } from "@/data/experiences";
import { EXPERIENCES } from "@/lib/constants";

export const metadata = {
  title: "Experiences — Aurelia House",
  description:
    "Curated experiences in Fort Kochi: backwater sunrise cruises, evening walking tours, private cooking masterclasses, and harbour sunsets.",
};

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-sand/30 pb-16 pt-32 md:pb-[80px] md:pt-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {EXPERIENCES.headline}
            </h1>
            <p className="mt-4 text-center text-body text-forest/70">
              Thoughtfully curated private journeys designed to connect you with the soul of Kochi
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Main Experience Cards */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {experiences.map((experience, i) => (
              <SectionReveal key={experience.slug}>
                <ExperienceCard experience={experience} index={i} mode="below" />

                {/* Itinerary Timeline */}
                <div className="mt-6 rounded border border-forest/10 bg-ivory p-6">
                  <h3 className="text-label text-terracotta">EXPERIENCE ITINERARY</h3>
                  <ul className="mt-4 space-y-3">
                    {experience.itinerary.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-body-sm">
                        <span className="font-medium text-forest">{step.time}</span>
                        <span className="text-charcoal">{step.activity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-forest/10 pt-4">
                    <h4 className="text-label text-forest/60">WHAT'S INCLUDED</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {experience.included.map((item) => (
                        <span
                          key={item}
                          className="rounded bg-sand/30 px-3 py-1 text-[12px] text-forest"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}