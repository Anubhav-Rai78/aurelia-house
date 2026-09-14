import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { reservationRequestSchema } from "@/lib/validators";
import { toDatabaseError } from "@/lib/errors";

/**
 * POST /api/reservation
 * Validates a reservation request with the shared Zod schema (including
 * check-in/check-out ordering and past-date rules) and persists it to the
 * Supabase `reservations` table.
 *
 * Returns:
 *   400 — validation failure  500 — insert / server failure  200 — success
 * Schema: see supabase/migrations/00001_initial_aurelia_house.sql
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = reservationRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("reservations").insert({
      ...parsed.data,
      phone: parsed.data.phone || null,
      guests: parsed.data.guests || null,
      room: parsed.data.room || null,
      message: parsed.data.message || null,
    });

    if (error) {
      const dbError = toDatabaseError(error);
      console.error("Reservation API — Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: dbError?.message ?? "Failed to save your reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Reservation request received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { error: "Failed to process reservation." },
      { status: 500 }
    );
  }
}