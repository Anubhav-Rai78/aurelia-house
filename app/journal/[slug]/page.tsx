import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SiteImage } from "@/components/ui/site-image";
import { journalArticles } from "@/data/journalArticles";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — Journal`,
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

  // Predecessor / successor logic — circular list
  const idx = journalArticles.findIndex((a) => a.slug === slug);
  const prev = journalArticles[(idx - 1 + journalArticles.length) % journalArticles.length];
  const next = journalArticles[(idx + 1) % journalArticles.length];

  // Simple paragraph renderer replacing raw markdown for fast SSR performance
  const paragraphs = article.content
    .trim()
    .split("\n\n")
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="mt-10 mb-4 text-display-md text-forest">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="mt-8 mb-3 text-display-sm text-forest">{block.replace("### ", "")}</h3>;
      }
      if (block.startsWith("> ")) {
        return (
          <blockquote key={i} className="my-10 border-l-2 border-terracotta pl-6 font-serif text-[24px] italic leading-snug text-forest md:text-[30px]">
            {block.replace("> ", "").replace(/"/g, "")}
          </blockquote>
        );
      }
      if (block.startsWith("---")) {
        return <hr key={i} className="my-10 border-forest/10" />;
      }

      // Convert **bold** and *italic*
      const formattedText = block.split("\n").map((line, lIdx) => (
        <p key={lIdx} className="mb-4 text-body-lg leading-relaxed text-charcoal">
          {line}
        </p>
      ));

      return <div key={i}>{formattedText}</div>;
    });

  return (
    <>
      {/* Hero — full-bleed header image + category + title */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-forest pt-24 md:pt-28">
        <div className="absolute inset-0">
          <SiteImage
            src={article.image}
            alt={article.title}
            caption={article.title}
            aspectRatio="h-full w-full"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/40 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[840px] px-6 pb-12 pt-16 md:px-12 md:pb-16">
          <span className="text-label text-sand">{article.category}</span>
          <h1 className="mt-4 text-display-lg text-ivory">{article.title}</h1>

          {/* Article Metadata Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-body-sm text-ivory/70">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-sand" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-sand" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-sand" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <SectionReveal className="prose-aurelia">
            {paragraphs}
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
              <span className="flex items-center gap-2 text-label text-forest/40">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous Story
              </span>
              <span className="mt-2 text-display-sm text-forest transition-colors group-hover:text-terracotta">
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/journal/${next.slug}`}
              className="group flex flex-col items-end rounded border border-forest/10 p-6 transition-colors hover:bg-forest/5 md:text-right"
            >
              <span className="flex items-center gap-2 text-label text-forest/40">
                Next Story <ArrowRight className="h-3.5 w-3.5" />
              </span>
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
