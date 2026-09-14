"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { RoomCard } from "@/components/ui/room-card";
import { BookingWidget } from "@/components/ui/booking-widget";
import { rooms } from "@/data/rooms";
import { STAY } from "@/lib/constants";

const allTabs = ["All", "Courtyard", "Garden", "Suite"] as const;

/**
 * /stay — Rooms listing page.
 * Filter tabs with sticky filter bar. Cards separate via 1px hairlines.
 * Optimised for portrait-mode room card images — no hard-crop.
 */
export default function StayPage() {
  const [active, setActive] = useState<string>(allTabs[0]);

  const filtered = active === "All" ? rooms : rooms.filter((r) => {
    const name = r.name.toLowerCase();
    return name.includes(active.toLowerCase());
  });

  return (
    <>
      {/* Hero banner (no booking widget — that's only on Home) */}
      <section className="bg-sand/30 pt-32 pb-16 md:pt-40 md:pb-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg whitespace-pre-line text-center text-forest">
              {STAY.headline}
            </h1>
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