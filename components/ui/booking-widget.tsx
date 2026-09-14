"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calculateNights, getTomorrowISO, getNDaysLaterISO } from "@/lib/date";

/**
 * BookingWidget — slim horizontal bar with CHECK-IN / CHECK-OUT / GUESTS /
 * ROOMS fields. Enforces checkin >= today and checkout > checkin bounds.
 * Displays live night count preview.
 */
export function BookingWidget({
  className,
  overlap = true,
}: {
  className?: string;
  overlap?: boolean;
}) {
  const router = useRouter();

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const defaultCheckIn = useMemo(() => getTomorrowISO(), []);
  const defaultCheckOut = useMemo(() => getNDaysLaterISO(3, defaultCheckIn), [defaultCheckIn]);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState("2 Adults");
  const [roomsCount, setRoomsCount] = useState("1 Room");

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);

  // When check-in changes, ensure check-out is at least 1 day later
  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (val >= checkOut) {
      setCheckOut(getNDaysLaterISO(1, val));
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    params.set("guests", guests);
    params.set("rooms", roomsCount);
    router.push(`/stay?${params.toString()}`);
  }

  const fields: React.ReactNode[] = [
    <div key="checkin" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <label htmlFor="booking-checkin" className="text-label text-forest/60">
        CHECK-IN
      </label>
      <input
        id="booking-checkin"
        type="date"
        min={todayISO}
        value={checkIn}
        onChange={(e) => handleCheckInChange(e.target.value)}
        className="mt-2 block w-full bg-transparent text-body text-forest focus:outline-none"
      />
    </div>,
    <div key="checkout" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <div className="flex items-center justify-between">
        <label htmlFor="booking-checkout" className="text-label text-forest/60">
          CHECK-OUT
        </label>
        {nights > 0 && (
          <span className="text-[11px] font-sans font-medium uppercase text-terracotta">
            {nights} {nights === 1 ? "Night" : "Nights"}
          </span>
        )}
      </div>
      <input
        id="booking-checkout"
        type="date"
        min={checkIn ? getNDaysLaterISO(1, checkIn) : todayISO}
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="mt-2 block w-full bg-transparent text-body text-forest focus:outline-none"
      />
    </div>,
    <div key="guests" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <label htmlFor="booking-guests" className="text-label text-forest/60">
        GUESTS
      </label>
      <select
        id="booking-guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="mt-2 block w-full cursor-pointer bg-transparent text-body text-forest focus:outline-none"
      >
        {["1 Adult", "2 Adults", "3 Adults", "4 Adults"].map(
          (opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>,
    <div key="rooms" className="flex-1 px-6 py-4">
      <label htmlFor="booking-rooms" className="text-label text-forest/60">
        ROOMS
      </label>
      <select
        id="booking-rooms"
        value={roomsCount}
        onChange={(e) => setRoomsCount(e.target.value)}
        className="mt-2 block w-full cursor-pointer bg-transparent text-body text-forest focus:outline-none"
      >
        {["1 Room", "2 Rooms", "3 Rooms"].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>,
    <div key="submit" className="flex flex-1 items-center justify-end px-6 py-4 md:justify-center md:border-l md:border-forest/10">
      <Button type="submit" variant="primary" className="w-full md:w-auto">
        CHECK AVAILABILITY
      </Button>
    </div>,
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded border border-forest/10 bg-ivory p-4 md:p-0",
        overlap && "md:-translate-y-1/2",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-stretch">{fields}</div>
    </form>
  );
}