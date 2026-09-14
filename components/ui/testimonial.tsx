import { HOME } from "@/lib/constants";

/**
 * Testimonial — the one and only place italics are used on the whole site:
 * an attributed quotation, the legitimate typographic use-case.
 */
export function Testimonial() {
  return (
    <figure className="mx-auto max-w-[720px] px-6 py-16 text-center md:py-[120px]">
      <blockquote className="text-display-sm italic text-forest">
        “{HOME.testimonial}”
      </blockquote>
      <figcaption className="mt-4 text-body-sm text-forest/60">
        {HOME.testimonialAuthor}
      </figcaption>
    </figure>
  );
}