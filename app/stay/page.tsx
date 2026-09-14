"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { RoomCard } from "@/components/ui/room-card";
import { rooms } from "@/data/rooms";
import { STAY } from "@/lib/constants";

const allTabs = ["All", "Courtyard", "Garden", "Suite"] as const;

export default function StayPage() {
  const [active, setActive] = useState<string>(allTabs[0]);

  const filtered =
    active === "All"
      ? rooms
      : rooms.filter((r) => r.category.toLowerCase() === active.toLowerCase());

  return (
    <>
      {/* Hero banner */}
      <section className="bg-sand/30 pb-16 pt-32 md:pb-[100px] md:pt-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {STAY.headline}
            </h1>
            <p className="mt-4 text-center text-body text-forest/70">
              24 sanctuaries across 3 room categories in Fort Kochi, Kerala
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Rooms grid with filter tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <FilterTabs tabs={allTabs} active={active} onChange={setActive} />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {filtered.map((room) => (
              <SectionReveal key={room.slug} className="flex">
                <RoomCard room={room} showIndex className="w-full" />
              </SectionReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-body text-forest/60">
              No rooms match this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}