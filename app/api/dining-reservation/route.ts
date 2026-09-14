import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { moraReservationSchema } from "@/lib/validators";
import { toDatabaseError } from "@/lib/errors";

/**
 * POST /api/dining-reservation
 * Validates MORA table reservation and persists to Supabase `mora_reservations`.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = moraReservationSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid table reservation request." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("mora_reservations").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      date: parsed.data.date,
      time_slot: parsed.data.timeSlot,
      party_size: parsed.data.partySize,
      seating_preference: parsed.data.seatingPreference,
      special_requests: parsed.data.specialRequests || null,
    });

    if (error) {
      const dbError = toDatabaseError(error);
      console.error("MORA Reservation API — Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: dbError?.message ?? "Failed to save table reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Table reserved successfully at MORA." },
      { status: 200 }
    );
  } catch (error) {
    console.error("MORA Reservation API error:", error);
    return NextResponse.json(
      { error: "Failed to process dining reservation." },
      { status: 500 }
    );
  }
}
