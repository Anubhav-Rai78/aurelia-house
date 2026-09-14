"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { calculateNights, getTomorrowISO, getNDaysLaterISO } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";
import { parseISO } from "date-fns";

export function BookThisRoomSidebar({
  roomName,
  pricePerNight = 12500,
}: {
  roomName: string;
  pricePerNight?: number;
}) {
  const router = useRouter();

  const todayDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const defaultCheckIn = useMemo(() => getTomorrowISO(), []);
  const defaultCheckOut = useMemo(() => getNDaysLaterISO(3, defaultCheckIn), [defaultCheckIn]);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const totalPrice = useMemo(() => nights * pricePerNight, [nights, pricePerNight]);
  const taxEstimate = useMemo(() => Math.round(totalPrice * 0.18), [totalPrice]); // 18% GST

  const minCheckOutDate = useMemo(() => {
    if (!checkIn) return todayDate;
    try {
      const d = parseISO(checkIn);
      d.setDate(d.getDate() + 1);
      return d;
    } catch {
      return todayDate;
    }
  }, [checkIn, todayDate]);

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (val >= checkOut) {
      setCheckOut(getNDaysLaterISO(1, val));
    }
  };

  const handleBookNow = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    params.set("room", roomName);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="mt-8 rounded border border-forest/10 bg-ivory p-6">
      <h3 className="text-display-sm text-forest">RESERVE THIS ROOM</h3>
      <p className="mt-1 text-body-sm text-forest/60">Best rate guaranteed · Instant booking request</p>

      <div className="mt-6 space-y-4">
        <DatePicker
          label="CHECK-IN"
          date={checkIn}
          onDateChange={handleCheckInChange}
          minDate={todayDate}
          placeholder="Select check-in"
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-label text-forest/60">CHECK-OUT</span>
            {nights > 0 && (
              <span className="text-[11px] font-sans font-medium uppercase text-terracotta">
                {nights} {nights === 1 ? "Night" : "Nights"}
              </span>
            )}
          </div>
          <DatePicker
            date={checkOut}
            onDateChange={setCheckOut}
            minDate={minCheckOutDate}
            placeholder="Select check-out"
          />
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="mt-6 space-y-2 border-t border-forest/10 pt-4 text-body-sm">
          <div className="flex justify-between text-charcoal">
            <span>{formatCurrency(pricePerNight)} × {nights} nights</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-forest/60">
            <span>Estimated Taxes (18% GST)</span>
            <span>{formatCurrency(taxEstimate)}</span>
          </div>
          <div className="flex justify-between border-t border-forest/10 pt-2 font-medium text-forest text-body">
            <span>Estimated Total</span>
            <span className="text-terracotta">{formatCurrency(totalPrice + taxEstimate)}</span>
          </div>
        </div>
      )}

      <Button variant="primary" className="mt-6 w-full" onClick={handleBookNow}>
        REQUEST RESERVATION
      </Button>

      <p className="mt-3 text-center text-[12px] text-forest/50">
        No payment charged today. Confirmation within 24 hours.
      </p>
    </div>
  );
}