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
          booking_code: string | null
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
          booking_code?: string | null
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
          booking_code?: string | null
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
      mora_reservations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date: string
          time_slot: string
          party_size: number
          seating_preference: string | null
          special_requests: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date: string
          time_slot: string
          party_size: number
          seating_preference?: string | null
          special_requests?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date?: string
          time_slot?: string
          party_size?: number
          seating_preference?: string | null
          special_requests?: string | null
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

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];
export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationInsert = Database["public"]["Tables"]["reservations"]["Insert"];
export type MoraReservation = Database["public"]["Tables"]["mora_reservations"]["Row"];
export type MoraReservationInsert = Database["public"]["Tables"]["mora_reservations"]["Insert"];