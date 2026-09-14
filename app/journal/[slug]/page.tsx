import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { journalArticles } from "@/data/journalArticles";
import { BRAND_NAME, JOURNAL } from "@/lib/constants";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const captions: Record<string, string> = {
    "48-hours-in-fort-kochi": "Hero — Fort Kochi street scene, colonial architecture, daylight",
    "a-guide-to-keralas-coastal-cuisine": "Hero — Kerala seafood and spices on a table, warm light",
    "why-slow-travel-matters": "Hero — quiet courtyard with tropical greenery",
    "the-architecture-of-aurelia-house": "Hero — architectural detail, contemporary Kerala design",
  };

  // Predecessor / successor logic — circular list
  const idx = journalArticles.findIndex((a) => a.slug === slug);
  const prev = journalArticles[(idx - 1 + journalArticles.length) % journalArticles.length];
  const next = journalArticles[(idx + 1) % journalArticles.length];

  return (
    <>
      {/* Hero — full-bleed header image + category + title */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-forest pt-24 md:pt-28">
        <div className="absolute inset-0">
          <PlaceholderImage
            caption={captions[slug] ?? "Placeholder — journal hero image"}
            aspectRatio="h-full w-full"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[800px] px-6 pb-12 pt-16 md:px-12 md:pb-16">
          <span className="text-label text-sand">{article.category}</span>
          <h1 className="mt-4 text-display-lg text-ivory">{article.title}</h1>
        </div>
      </section>

      {/* Article body placeholder */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <SectionReveal>
            <p className="text-body-lg text-charcoal">
              {article.description}
            </p>
            <div className="mt-8 text-body text-charcoal/70">
              <p className="mb-4">
                {/* SPEC-GAP: Real article body content not provided in brief —
                    placeholder text below until real content is available */}
                This is a placeholder article body. Real content will include richly
                formatted editorial copy covering the topic in depth — with inline
                photography, pull quotes, and contextual information drawn from
                direct knowledge of Fort Kochi and its culture.
              </p>
              <p>
                The full article will follow the same typographic rules as the rest
                of the site: Cormorant Garamond for pull quotes, DM Sans for body,
                and the site's warm ivory palette as the background.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Previous / Next navigation */}
      <section className="border-t border-forest/10 py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link
              href={`/journal/${prev.slug}`}
              className="group flex flex-col rounded border border-forest/10 p-6 transition-colors hover:bg-forest/5"
            >
              <span className="text-label text-forest/40">← Previous</span>
              <span className="mt-2 text-display-sm text-forest transition-colors group-hover:text-terracotta">
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/journal/${next.slug}`}
              className="group flex flex-col items-end rounded border border-forest/10 p-6 transition-colors hover:bg-forest/5 md:text-right"
            >
              <span className="text-label text-forest/40">Next →</span>
              <span className="mt-2 text-display-sm text-forest transition-colors group-hover:text-terracotta">
                {next.title}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}