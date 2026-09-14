"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { SiteImage } from "@/components/ui/site-image";
import { GALLERY } from "@/lib/constants";

/**
 * Gallery image definition — one entry per slot. Each keeps its native
 * aspect ratio in the masonry layout (never force object-cover to a fixed
 * box). Aspect ratios alternate portrait/landscape for editorial rhythm.
 * `src` reuses the site's 18 real photos across all 20 slots.
 */
interface GalleryItem {
  category: string;
  caption: string;
  aspect: string;
  id: string;
  src: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  // Architecture (4)
  { category: "Architecture", id: "arch-1", caption: "Placeholder — hotel facade, Kerala architecture, warm light", aspect: "aspect-[3/4]", src: "/images/hero-golden-hour.jpg", alt: "Aurelia House exterior bathed in golden hour light" },
  { category: "Architecture", id: "arch-2", caption: "Placeholder — courtyard, natural materials, quiet", aspect: "aspect-[4/3]", src: "/images/intro-courtyard.jpg", alt: "Quiet courtyard with natural materials and greenery" },
  { category: "Architecture", id: "arch-3", caption: "Placeholder — corridor detail, contemporary design", aspect: "aspect-[4/3]", src: "/images/story-main.jpg", alt: "Contemporary architectural detail at Aurelia House" },
  { category: "Architecture", id: "arch-4", caption: "Placeholder — architectural detail, terracotta tile", aspect: "aspect-[3/4]", src: "/images/story-architecture.jpg", alt: "Kerala terracotta and wood architectural detail" },
  // Rooms (4)
  { category: "Rooms", id: "room-1", caption: "Placeholder — Courtyard Room interior, calm", aspect: "aspect-[4/3]", src: "/images/room-courtyard.jpg", alt: "Courtyard Room interior with warm natural light" },
  { category: "Rooms", id: "room-2", caption: "Placeholder — Garden Suite, natural textures", aspect: "aspect-[3/4]", src: "/images/room-garden.jpg", alt: "Garden Suite with natural textures and soft light" },
  { category: "Rooms", id: "room-3", caption: "Placeholder — Aurelia Suite living area", aspect: "aspect-[4/3]", src: "/images/room-aurelia.jpg", alt: "Aurelia Suite living area and private terrace" },
  { category: "Rooms", id: "room-4", caption: "Placeholder — rain shower detail, warm light", aspect: "aspect-[3/4]", src: "/images/room-shower.jpg", alt: "Stone rain shower bathed in warm light" },
  // Dining (4)
  { category: "Dining", id: "dine-1", caption: "Placeholder — MORA dining room, evening light", aspect: "aspect-[4/3]", src: "/images/dining-hero.jpg", alt: "MORA dining room in warm evening light" },
  { category: "Dining", id: "dine-2", caption: "Placeholder — plated Kerala dish", aspect: "aspect-[3/4]", src: "/images/dining-home.jpg", alt: "Plated coastal dish at MORA" },
  { category: "Dining", id: "dine-3", caption: "Placeholder — spice counter, local produce", aspect: "aspect-[4/3]", src: "/images/dining-spices.jpg", alt: "Spice counter with vibrant local produce" },
  { category: "Dining", id: "dine-4", caption: "Placeholder — chef plating at MORA", aspect: "aspect-[3/4]", src: "/images/dining-chef.jpg", alt: "Chef plating a dish in the MORA kitchen" },
  // Experiences (4)
  { category: "Experiences", id: "exp-1", caption: "Placeholder — backwaters sunrise boat", aspect: "aspect-[4/3]", src: "/images/exp-backwaters.jpg", alt: "Backwaters at sunrise with a wooden canoe" },
  { category: "Experiences", id: "exp-2", caption: "Placeholder — Fort Kochi street at night", aspect: "aspect-[3/4]", src: "/images/exp-fort-kochi-night.jpg", alt: "Lantern-lit colonial street in Fort Kochi at night" },
  { category: "Experiences", id: "exp-3", caption: "Placeholder — cooking with a local chef", aspect: "aspect-[4/3]", src: "/images/exp-cooking.jpg", alt: "Cooking with a local chef in a Kerala kitchen" },
  { category: "Experiences", id: "exp-4", caption: "Placeholder — harbour sunset cruise", aspect: "aspect-[3/4]", src: "/images/exp-sunset-cruise.jpg", alt: "Golden hour harbour sunset cruise" },
  // Kochi (4)
  { category: "Kochi", id: "kochi-1", caption: "Placeholder — Chinese fishing nets at dusk", aspect: "aspect-[3/4]", src: "/images/kochi-fishing-nets.jpg", alt: "Chinese fishing nets at dusk in Kochi" },
  { category: "Kochi", id: "kochi-2", caption: "Placeholder — Princess Street colonial architecture", aspect: "aspect-[4/3]", src: "/images/exp-fort-kochi-night.jpg", alt: "Colonial architecture along Fort Kochi streets" },
  { category: "Kochi", id: "kochi-3", caption: "Placeholder — spice market, colour and texture", aspect: "aspect-[3/4]", src: "/images/dining-spices.jpg", alt: "Spice market with colour and texture" },
  { category: "Kochi", id: "kochi-4", caption: "Placeholder — waterfront, boats moored", aspect: "aspect-[4/3]", src: "/images/exp-backwaters.jpg", alt: "Kochi waterfront with moored boats at dawn" },
];

/**
 * GalleryGrid — true masonry via CSS columns (not a fixed cropped grid).
 * Category filtering via understated text tabs styled like the Stay page.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<string>(GALLERY.categories[0]);

  const items =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <div className="py-16">
      <FilterTabs tabs={GALLERY.categories} active={active} onChange={setActive} />

      <div className="columns-1 gap-4 md:columns-3">
        {items.map((item) => (
          <figure key={item.id} className="mb-4 break-inside-avoid">
            <div className={`${item.aspect} overflow-hidden rounded`}>
              <SiteImage
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                aspectRatio="h-full w-full"
                className="h-full w-full"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 px-1 text-label uppercase text-forest/40">
              {item.category}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
