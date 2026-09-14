// ─── AURELIA HOUSE — Supabase Database Types ────────────────────────────────
// Hand-maintained to match supabase/migrations/00001_initial_aurelia_house.sql.
// The hotel site uses two public tables:
//   • contacts      — form submissions from /contact
//   • reservations  — reservation requests from the booking flow
//
// Regenerate and replace this file wholesale with `supabase gen types` whenever
// the schema grows (rooms inventory, journal articles, availability, etc.).
// ──────────────────────────────────────────────────────────────────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          guests: string | null
          checkin: string | null
          checkout: string | null
          room: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          guests?: string | null
          checkin?: string | null
          checkout?: string | null
          room?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          guests?: string | null
          checkin?: string | null
          checkout?: string | null
          room?: string | null
          message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          guests: string | null
          checkin: string
          checkout: string
          room: string | null
          message: string | null
          status: ReservationStatus
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          guests?: string | null
          checkin: string
          checkout: string
          room?: string | null
          message?: string | null
          status?: ReservationStatus
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          guests?: string | null
          checkin?: string
          checkout?: string
          room?: string | null
          message?: string | null
          status?: ReservationStatus
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ── Convenience row types used across the codebase ───────────────────────────
export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];
export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationInsert =
  Database["public"]["Tables"]["reservations"]["Insert"];