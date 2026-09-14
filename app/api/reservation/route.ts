import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { reservationRequestSchema } from "@/lib/validators";
import { toDatabaseError } from "@/lib/errors";
import { rooms } from "@/data/rooms";

/**
 * POST /api/reservation
 * Validates reservation payload, checks 24-room inventory bounds to prevent
 * double-booking, and persists to Supabase `reservations` table.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = reservationRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid reservation request." },
        { status: 400 }
      );
    }

    const { room: roomName, checkin, checkout } = parsed.data;

    // Find room inventory limit (10 Courtyard, 10 Garden, 4 Aurelia)
    const targetRoom = rooms.find(
      (r) => r.name.toLowerCase() === roomName?.toLowerCase()
    );
    const inventoryLimit = targetRoom ? targetRoom.inventoryCount : 10;

    const supabase = await createClient();

    // Check for date overlaps on the target room type
    if (roomName) {
      const { data: overlapping, error: checkError } = await supabase
        .from("reservations")
        .select("id")
        .eq("room", roomName)
        .neq("status", "cancelled")
        .lt("checkin", checkout)
        .gt("checkout", checkin);

      if (!checkError && overlapping && overlapping.length >= inventoryLimit) {
        return NextResponse.json(
          {
            error: `All ${inventoryLimit} ${roomName}s are fully booked for your selected dates. Please select different dates or room type.`,
          },
          { status: 409 }
        );
      }
    }

    // Generate unique booking code AH-XXXXXX
    const randomCode = "AH-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabase.from("reservations").insert({
      ...parsed.data,
      room: roomName || "Courtyard Room",
      booking_code: randomCode,
      status: "pending",
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
      {
        message: "Reservation request received successfully.",
        bookingCode: randomCode,
      },
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