import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { DINING } from "@/lib/constants";

export const metadata = {
  title: "Dining — MORA",
  description: "Kerala-inspired cuisine shaped by local ingredients, coastal traditions and contemporary technique.",
};

export default function DiningPage() {
  return (
    <>
      {/* Hero — MORA headline over a cinematic dining image */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SiteImage
            src="/images/dining-hero.jpg"
            alt="MORA restaurant interior in warm golden-hour light"
            caption="Cinematic MORA restaurant interior at golden hour, warm ambient lighting"
            aspectRatio="h-full w-full"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
          <h1 className="text-display-xl whitespace-pre-line text-ivory">
            {DINING.headline}
          </h1>
        </div>
      </section>

      {/* Body + menu side-by-side */}
      <section className="py-16 md:py-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Left — body text + hours */}
          <SectionReveal className="md:col-span-6">
            <p className="text-body-lg text-charcoal">{DINING.body}</p>
            <p className="mt-4 font-serif text-[28px] font-medium leading-[1.2] tracking-[0.05em] text-forest">
              {DINING.restaurantName}
            </p>

            {/* Opening hours */}
            <div className="mt-12">
              <h2 className="text-label text-terracotta">OPENING HOURS</h2>
              <dl className="mt-6 space-y-4">
                {DINING.hours.map((h) => (
                  <div key={h.label} className="flex items-baseline justify-between border-b border-forest/10 pb-4">
                    <dt className="text-body font-medium text-forest">{h.label}</dt>
                    <dd className="text-body-sm text-charcoal">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button href="#sample-menu" variant="secondary" className="mt-8">
              {DINING.viewFullMenuCta}
            </Button>
          </SectionReveal>

          {/* Right — sample menu with text list + image accent */}
          <SectionReveal className="md:col-span-6" id="sample-menu">
            <h2 className="text-label text-terracotta">{DINING.sampleMenuLabel}</h2>
            
            {/* Editorial text menu with dotted leader prices */}
            <dl className="mt-6 space-y-3">
              {DINING.menu.map((item) => (
                <div key={item.dish} className="flex items-baseline justify-between">
                  <dt className="text-body text-charcoal">{item.dish}</dt>
                  <dd className="text-body text-charcoal">
                    <span className="mx-2 flex-1 border-b border-dotted border-forest/20"></span>
                    <span className="text-terracotta">{item.price}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Menu image as accent, smaller */}
            <div className="mt-8">
              <SiteImage
                src="/images/dining-menu.jpg"
                alt="Editorial photograph of MORA's sample menu on a natural surface"
                caption="MORA sample menu — editorial layout, terracotta / ivory, on a natural surface"
                aspectRatio="aspect-[4/3]"
                className="w-full max-w-[280px]"
                sizes="(min-width: 768px) 25vw, 100vw"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Parallax strip */}
      <section className="relative h-[320px] overflow-hidden bg-forest">
        <SiteImage
          src="/images/dining-chef.jpg"
          alt="Chef plating a dish at MORA"
          caption="Cinematic detail of MORA — plated food / chef at work"
          aspectRatio="absolute inset-0 h-full w-full"
          className="absolute inset-0 h-full w-full opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-forest/30">
          <p className="text-display-md text-center text-ivory">
            THE TABLE IS SET.
          </p>
        </div>
      </section>
    </>
  );
}
