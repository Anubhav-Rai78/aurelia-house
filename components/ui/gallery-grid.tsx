"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { SiteImage } from "@/components/ui/site-image";
import { Lightbox } from "@/components/ui/lightbox";
import { GALLERY } from "@/lib/constants";

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
  { category: "Architecture", id: "arch-1", caption: "Aurelia House exterior bathed in golden hour light", aspect: "aspect-[3/4]", src: "/images/hero-golden-hour.jpg", alt: "Aurelia House exterior bathed in golden hour light" },
  { category: "Architecture", id: "arch-2", caption: "Quiet courtyard with natural materials and tropical greenery", aspect: "aspect-[4/3]", src: "/images/intro-courtyard.jpg", alt: "Quiet courtyard with natural materials and greenery" },
  { category: "Architecture", id: "arch-3", caption: "Contemporary architectural detail at Aurelia House", aspect: "aspect-[4/3]", src: "/images/story-main.jpg", alt: "Contemporary architectural detail at Aurelia House" },
  { category: "Architecture", id: "arch-4", caption: "Kerala terracotta and wood architectural detail", aspect: "aspect-[3/4]", src: "/images/story-architecture.jpg", alt: "Kerala terracotta and wood architectural detail" },
  // Rooms (4)
  { category: "Rooms", id: "room-1", caption: "Courtyard Room interior with warm natural light", aspect: "aspect-[4/3]", src: "/images/room-courtyard.jpg", alt: "Courtyard Room interior with warm natural light" },
  { category: "Rooms", id: "room-2", caption: "Garden Suite with natural textures and soft light", aspect: "aspect-[3/4]", src: "/images/room-garden.jpg", alt: "Garden Suite with natural textures and soft light" },
  { category: "Rooms", id: "room-3", caption: "Aurelia Suite living area and private terrace", aspect: "aspect-[4/3]", src: "/images/room-aurelia.jpg", alt: "Aurelia Suite living area and private terrace" },
  { category: "Rooms", id: "room-4", caption: "Stone rain shower bathed in warm light", aspect: "aspect-[3/4]", src: "/images/room-shower.jpg", alt: "Stone rain shower bathed in warm light" },
  // Dining (4)
  { category: "Dining", id: "dine-1", caption: "MORA dining room in warm evening light", aspect: "aspect-[4/3]", src: "/images/dining-hero.jpg", alt: "MORA dining room in warm evening light" },
  { category: "Dining", id: "dine-2", caption: "Plated coastal dish at MORA", aspect: "aspect-[3/4]", src: "/images/dining-home.jpg", alt: "Plated coastal dish at MORA" },
  { category: "Dining", id: "dine-3", caption: "Spice counter with vibrant local produce", aspect: "aspect-[4/3]", src: "/images/dining-spices.jpg", alt: "Spice counter with vibrant local produce" },
  { category: "Dining", id: "dine-4", caption: "Chef plating a dish in the MORA kitchen", aspect: "aspect-[3/4]", src: "/images/dining-chef.jpg", alt: "Chef plating a dish in the MORA kitchen" },
  // Experiences (4)
  { category: "Experiences", id: "exp-1", caption: "Backwaters at sunrise with a wooden canoe", aspect: "aspect-[4/3]", src: "/images/exp-backwaters.jpg", alt: "Backwaters at sunrise with a wooden canoe" },
  { category: "Experiences", id: "exp-2", caption: "Lantern-lit colonial street in Fort Kochi at night", aspect: "aspect-[3/4]", src: "/images/exp-fort-kochi-night.jpg", alt: "Lantern-lit colonial street in Fort Kochi at night" },
  { category: "Experiences", id: "exp-3", caption: "Cooking with a local chef in a Kerala kitchen", aspect: "aspect-[4/3]", src: "/images/exp-cooking.jpg", alt: "Cooking with a local chef in a Kerala kitchen" },
  { category: "Experiences", id: "exp-4", caption: "Golden hour harbour sunset cruise", aspect: "aspect-[3/4]", src: "/images/exp-sunset-cruise.jpg", alt: "Golden hour harbour sunset cruise" },
  // Kochi (4)
  { category: "Kochi", id: "kochi-1", caption: "Chinese fishing nets at dusk in Kochi", aspect: "aspect-[3/4]", src: "/images/kochi-fishing-nets.jpg", alt: "Chinese fishing nets at dusk in Kochi" },
  { category: "Kochi", id: "kochi-2", caption: "Historic Fort Kochi street in daylight", aspect: "aspect-[4/3]", src: "/images/kochi-street-day.jpg", alt: "Colonial architecture along Fort Kochi streets" },
  { category: "Kochi", id: "kochi-3", caption: "Spice market with colour and texture", aspect: "aspect-[3/4]", src: "/images/dining-spices.jpg", alt: "Spice market with colour and texture" },
  { category: "Kochi", id: "kochi-4", caption: "Quiet courtyard reflection", aspect: "aspect-[4/3]", src: "/images/pool-courtyard.jpg", alt: "Kochi waterfront with pool reflection at dawn" },
];

/**
 * GalleryGrid — true masonry via CSS columns with Lightbox modal preview.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<string>(GALLERY.categories[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div className="py-16">
      <FilterTabs tabs={GALLERY.categories} active={active} onChange={setActive} />

      <div className="mt-8 columns-1 gap-4 md:columns-3">
        {items.map((item, idx) => (
          <figure
            key={item.id}
            className="group mb-4 cursor-pointer break-inside-avoid"
            onClick={() => setLightboxIndex(idx)}
          >
            <div className={`${item.aspect} overflow-hidden rounded`}>
              <SiteImage
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                aspectRatio="h-full w-full"
                className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 flex items-center justify-between px-1">
              <span className="text-label uppercase text-forest/40">{item.category}</span>
              <span className="text-[11px] font-sans text-terracotta opacity-0 transition-opacity group-hover:opacity-100">
                View Fullscreen →
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          imageSrc={currentItem.src}
          imageAlt={currentItem.alt}
          caption={currentItem.caption}
          onPrev={() =>
            setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0))
          }
        />
      )}
    </div>
  );
}
