import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { JournalArticle } from "@/data/journalArticles";
import { JOURNAL } from "@/lib/constants";

/**
 * ArticleCard — image, category label, title, description, and a text link
 * "Read Article" with terracotta underline. Text links are for reading;
 * buttons are for transactional actions (per brief interaction-intent rule).
 */
export function ArticleCard({ article }: { article: JournalArticle }) {
  const captions: Record<string, string> = {
    "48-hours-in-fort-kochi": "Placeholder — Fort Kochi street scene, colonial architecture, daylight",
    "a-guide-to-keralas-coastal-cuisine": "Placeholder — Kerala seafood and spices on a table, warm light",
    "why-slow-travel-matters": "Placeholder — quiet courtyard with tropical greenery",
    "the-architecture-of-aurelia-house": "Placeholder — architectural detail, Kerala materials, contemporary design",
  };
  const caption = captions[article.slug] ?? "Placeholder — journal article image";

  return (
    <article className="flex flex-col overflow-hidden rounded border border-forest/10 bg-ivory">
      <Link href={`/journal/${article.slug}`} className="block overflow-hidden">
        <div className="aspect-[16/10] transition-transform duration-500 ease-out hover:scale-[1.03]">
          <PlaceholderImage caption={caption} aspectRatio="h-full w-full" className="h-full w-full" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-label text-terracotta">{article.category}</span>
        <Link href={`/journal/${article.slug}`}>
          <h2 className="mt-2 text-display-sm text-forest transition-colors duration-300 hover:text-terracotta">
            {article.title}
          </h2>
        </Link>
        <p className="mt-2 text-body text-charcoal">{article.description}</p>
        <Link
          href={`/journal/${article.slug}`}
          className="mt-4 inline-block text-body-sm text-forest underline decoration-terracotta underline-offset-4 transition-colors duration-300 hover:text-terracotta"
        >
          {JOURNAL.readArticleCta}
        </Link>
      </div>
    </article>
  );
}