"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { GALLERY } from "@/lib/constants";

/**
 * Gallery image definition — one entry per slot. Each keeps its native
 * aspect ratio in the masonry layout (never force object-cover to a fixed
 * box). Aspect ratios alternate portrait/landscape for editorial rhythm.
 */
interface GalleryItem {
  category: string;
  caption: string;
  aspect: string;
  id: string;
}

const galleryItems: GalleryItem[] = [
  // Architecture (4)
  { category: "Architecture", id: "arch-1", caption: "Placeholder — hotel facade, Kerala architecture, warm light", aspect: "aspect-[3/4]" },
  { category: "Architecture", id: "arch-2", caption: "Placeholder — courtyard, natural materials, quiet", aspect: "aspect-[4/3]" },
  { category: "Architecture", id: "arch-3", caption: "Placeholder — corridor detail, contemporary design", aspect: "aspect-[4/3]" },
  { category: "Architecture", id: "arch-4", caption: "Placeholder — architectural detail, terracotta tile", aspect: "aspect-[3/4]" },
  // Rooms (4)
  { category: "Rooms", id: "room-1", caption: "Placeholder — Courtyard Room interior, calm", aspect: "aspect-[4/3]" },
  { category: "Rooms", id: "room-2", caption: "Placeholder — Garden Suite, natural textures", aspect: "aspect-[3/4]" },
  { category: "Rooms", id: "room-3", caption: "Placeholder — Aurelia Suite living area", aspect: "aspect-[4/3]" },
  { category: "Rooms", id: "room-4", caption: "Placeholder — rain shower detail, warm light", aspect: "aspect-[3/4]" },
  // Dining (4)
  { category: "Dining", id: "dine-1", caption: "Placeholder — MORA dining room, evening light", aspect: "aspect-[4/3]" },
  { category: "Dining", id: "dine-2", caption: "Placeholder — plated Kerala dish", aspect: "aspect-[3/4]" },
  { category: "Dining", id: "dine-3", caption: "Placeholder — spice counter, local produce", aspect: "aspect-[4/3]" },
  { category: "Dining", id: "dine-4", caption: "Placeholder — chef plating at MORA", aspect: "aspect-[3/4]" },
  // Experiences (4)
  { category: "Experiences", id: "exp-1", caption: "Placeholder — backwaters sunrise boat", aspect: "aspect-[4/3]" },
  { category: "Experiences", id: "exp-2", caption: "Placeholder — Fort Kochi street at night", aspect: "aspect-[3/4]" },
  { category: "Experiences", id: "exp-3", caption: "Placeholder — cooking with a local chef", aspect: "aspect-[4/3]" },
  { category: "Experiences", id: "exp-4", caption: "Placeholder — harbour sunset cruise", aspect: "aspect-[3/4]" },
  // Kochi (4)
  { category: "Kochi", id: "kochi-1", caption: "Placeholder — Chinese fishing nets at dusk", aspect: "aspect-[3/4]" },
  { category: "Kochi", id: "kochi-2", caption: "Placeholder — Princess Street colonial architecture", aspect: "aspect-[4/3]" },
  { category: "Kochi", id: "kochi-3", caption: "Placeholder — spice market, colour and texture", aspect: "aspect-[3/4]" },
  { category: "Kochi", id: "kochi-4", caption: "Placeholder — waterfront, boats moored", aspect: "aspect-[4/3]" },
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
              <PlaceholderImage
                caption={item.caption}
                aspectRatio="h-full w-full"
                className="h-full w-full"
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