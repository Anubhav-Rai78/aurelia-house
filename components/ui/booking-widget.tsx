"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { format, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { CustomSelect } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { calculateNights, getTomorrowISO, getNDaysLaterISO, parseLocalDateISO } from "@/lib/date";

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
    params.set("checkin", checkIn);
    params.set("checkout", checkOut);
    params.set("guests", guests);
    params.set("rooms", roomsCount);
    router.push(`/stay?${params.toString()}`);
  }

  const guestOptions = ["1 Adult", "2 Adults", "3 Adults", "4 Adults"].map((opt) => ({
    label: opt,
    value: opt,
  }));
  const roomOptions = ["1 Room", "2 Rooms", "3 Rooms"].map((opt) => ({ label: opt, value: opt }));

  const fields: React.ReactNode[] = [
    <div key="checkin" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <label className="text-label text-forest/60">CHECK-IN</label>
      <DatePicker
        date={checkIn ? parseLocalDateISO(checkIn) : undefined}
        onDateChange={(d) => {
          if (d) handleCheckInChange(format(d, "yyyy-MM-dd"));
        }}
        placeholder="Select check-in"
        minDate={startOfDay(new Date())}
      />
    </div>,
    <div key="checkout" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <div className="flex items-center justify-between">
        <label className="text-label text-forest/60">CHECK-OUT</label>
        {nights > 0 && (
          <span className="text-[11px] font-sans font-medium uppercase text-terracotta">
            {nights} {nights === 1 ? "Night" : "Nights"}
          </span>
        )}
      </div>
      <DatePicker
        date={checkOut ? parseLocalDateISO(checkOut) : undefined}
        onDateChange={(d) => {
          if (d) setCheckOut(format(d, "yyyy-MM-dd"));
        }}
        placeholder="Select check-out"
        minDate={checkIn ? parseLocalDateISO(getNDaysLaterISO(1, checkIn)) : startOfDay(new Date())}
      />
    </div>,
    <div key="guests" className="flex-1 px-6 py-4 md:border-r md:border-forest/10">
      <CustomSelect
        label="GUESTS"
        value={guests}
        onValueChange={setGuests}
        options={guestOptions}
        placeholder="Select guests"
      />
    </div>,
    <div key="rooms" className="flex-1 px-6 py-4">
      <CustomSelect
        label="ROOMS"
        value={roomsCount}
        onValueChange={setRoomsCount}
        options={roomOptions}
        placeholder="Select rooms"
      />
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
