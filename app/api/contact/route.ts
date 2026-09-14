import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactRequestSchema } from "@/lib/validators";
import { toDatabaseError } from "@/lib/errors";

/**
 * POST /api/contact
 * Validates the contact form payload with the shared Zod schema and persists
 * it to the Supabase `contacts` table via the RLS-bounded server client.
 *
 * Returns:
 *   400 — validation failure  500 — insert / server failure  200 — success
 * Schema: see supabase/migrations/00001_initial_aurelia_house.sql
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = contactRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("contacts").insert({
      ...parsed.data,
      checkin: parsed.data.checkin || null,
      checkout: parsed.data.checkout || null,
    });

    if (error) {
      const dbError = toDatabaseError(error);
      console.error("Contact API — Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: dbError?.message ?? "Failed to save your request." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Contact request received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}