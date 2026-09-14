-- ─────────────────────────────────────────────────────────────────────────────
-- AURELIA HOUSE — Supabase Migration
-- Tables: contacts, reservations
--
-- Run this in the Supabase SQL Editor (or via `supabase db push`) once the
-- Supabase project for Aurelia House is connected. Requires the UUID
-- extension (enabled by default on Supabase).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── contacts: form submissions from /contact ────────────────────────────────
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  guests text,
  checkin date,
  checkout date,
  room text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

-- The server (service role) writes these; guests never read the table.
create policy "Service role inserts contacts"
  on public.contacts for insert
  with check (true);

-- ── reservations: reservation requests from the booking flow ──────────────
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  guests text,
  checkin date not null,
  checkout date not null,
  room text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

-- The server (service role) writes these; guests never read the table.
create policy "Service role inserts reservations"
  on public.reservations for insert
  with check (true);

create index if not exists reservations_checkin_idx on public.reservations (checkin);

-- ── Notes ────────────────────────────────────────────────────────────────────
-- Room prices and the 24-room inventory are static marketing data defined in
-- data/rooms.ts. If real-time availability is ever needed, add a `rooms`
-- table + an `availability` table; the booking widget on /stay would then
-- query it. Not included in the initial build per the brief.