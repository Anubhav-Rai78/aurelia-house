import { SectionReveal } from "@/components/ui/section-reveal";
import { ArticleCard } from "@/components/ui/article-card";
import { journalArticles } from "@/data/journalArticles";
import { JOURNAL } from "@/lib/constants";

export const metadata = {
  title: "Journal",
  description: "Stories, guides and reflections on Fort Kochi, slow travel, local food and contemporary design.",
};

export default function JournalPage() {
  return (
    <>
      <section className="bg-sand/30 pt-24 pb-16 md:pt-28 md:pb-[80px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg text-center text-forest">{JOURNAL.headline}</h1>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {journalArticles.map((article) => (
              <SectionReveal key={article.slug}>
                <ArticleCard article={article} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}