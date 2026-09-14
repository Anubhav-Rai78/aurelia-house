"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BookThisRoomSidebar({ roomName }: { roomName: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const router = useRouter();

  const handleBookNow = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    params.set("room", roomName);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="mt-8 rounded border border-forest/10 bg-ivory p-4">
      <p className="text-label text-forest/60">CHECK-IN</p>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="mt-2 w-full bg-transparent text-body text-forest focus:outline-none"
      />
      <p className="mt-4 text-label text-forest/60">CHECK-OUT</p>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="mt-2 w-full bg-transparent text-body text-forest focus:outline-none"
      />
      <Button variant="secondary" className="mt-4 w-full" onClick={handleBookNow}>
        CHECK AVAILABILITY
      </Button>
    </div>
  );
}