"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { calculateNights, getTomorrowISO, getNDaysLaterISO } from "@/lib/date";
import { formatCurrency } from "@/lib/utils";

export function BookThisRoomSidebar({
  roomName,
  pricePerNight = 12500,
}: {
  roomName: string;
  pricePerNight?: number;
}) {
  const router = useRouter();

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const defaultCheckIn = useMemo(() => getTomorrowISO(), []);
  const defaultCheckOut = useMemo(() => getNDaysLaterISO(3, defaultCheckIn), [defaultCheckIn]);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const totalPrice = useMemo(() => nights * pricePerNight, [nights, pricePerNight]);
  const taxEstimate = useMemo(() => Math.round(totalPrice * 0.18), [totalPrice]); // 18% GST

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
        <div>
          <label htmlFor="sidebar-checkin" className="text-label text-forest/60">
            CHECK-IN
          </label>
          <input
            id="sidebar-checkin"
            type="date"
            min={todayISO}
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="sidebar-checkout" className="text-label text-forest/60">
              CHECK-OUT
            </label>
            {nights > 0 && (
              <span className="text-[11px] font-sans font-medium uppercase text-terracotta">
                {nights} {nights === 1 ? "Night" : "Nights"}
              </span>
            )}
          </div>
          <input
            id="sidebar-checkout"
            type="date"
            min={checkIn ? getNDaysLaterISO(1, checkIn) : todayISO}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
          />
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="mt-6 border-t border-forest/10 pt-4 space-y-2 text-body-sm">
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