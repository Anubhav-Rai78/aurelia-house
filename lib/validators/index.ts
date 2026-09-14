// ─── AURELIA HOUSE — Zod Validation Schemas ──────────────────────────────────
// Single source of truth for every request payload the site accepts. Inferred
// types are exported so API routes and (future) client-side forms share the
// same constraints.
//
// Dependency: zod (already in package.json)
// ──────────────────────────────────────────────────────────────────────────────

import { z } from "zod";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Optional text field — accepts either a trimmed string or an empty string. */
const optionalString = z.string().trim().optional().or(z.literal(""));

/** A real calendar date in YYYY-MM-DD form (empty string allowed). */
const isoDateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .refine(
    (val) => val === "" || !isNaN(new Date(`${val}T00:00:00Z`).getTime()),
    "Must be a valid date"
  );

const nameField = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(100, "Name must be under 100 characters.");

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .max(254, "Email must be under 254 characters.");

const messageField = z
  .string()
  .trim()
  .max(2000, "Message must be under 2000 characters.")
  .optional()
  .or(z.literal(""));

// ── POST /api/contact ────────────────────────────────────────────────────────

export const contactRequestSchema = z.object({
  name: nameField,
  email: emailField,
  phone: optionalString,
  guests: optionalString,
  checkin: isoDateString.optional(),
  checkout: isoDateString.optional(),
  room: optionalString,
  message: messageField,
});

export type ContactRequestPayload = z.infer<typeof contactRequestSchema>;

// ── POST /api/reservation ────────────────────────────────────────────────────

export const reservationRequestSchema = z
  .object({
    name: nameField,
    email: emailField,
    phone: optionalString,
    guests: optionalString,
    checkin: isoDateString,
    checkout: isoDateString,
    room: optionalString,
    message: messageField,
  })
  .superRefine((data, ctx) => {
    const today = new Date().toISOString().slice(0, 10);
    const checkin = Date.parse(`${data.checkin}T00:00:00Z`);
    const checkout = Date.parse(`${data.checkout}T00:00:00Z`);

    if (checkin < Date.parse(`${today}T00:00:00Z`)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["checkin"],
        message: "Check-in cannot be in the past.",
      });
    }

    if (checkout <= checkin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["checkout"],
        message: "Check-out must be after check-in.",
      });
    }
  });

export type ReservationRequestPayload = z.infer<typeof reservationRequestSchema>;