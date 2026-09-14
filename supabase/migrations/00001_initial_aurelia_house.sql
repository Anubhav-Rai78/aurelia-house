-- ─────────────────────────────────────────────────────────────────────────────
-- AURELIA HOUSE — Complete Database Migration
-- Tables: contacts, reservations, rooms, mora_reservations, journal_posts
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. contacts: form submissions from /contact ──────────────────────────────
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

create policy "Service role inserts contacts"
  on public.contacts for insert
  with check (true);

-- ── 2. reservations: room reservation requests ────────────────────────────────
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  booking_code text unique default ('AH-' || upper(substring(md5(random()::text) from 1 for 6))),
  name text not null,
  email text not null,
  phone text,
  guests text,
  checkin date not null,
  checkout date not null,
  room text not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

create policy "Service role inserts reservations"
  on public.reservations for insert
  with check (true);

create index if not exists reservations_checkin_idx on public.reservations (checkin);
create index if not exists reservations_room_idx on public.reservations (room);

-- ── 3. rooms: 24-room inventory breakdown ────────────────────────────────────
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('courtyard', 'garden', 'suite')),
  size text not null,
  bed text not null,
  view text not null,
  feature text not null,
  price integer not null,
  price_display text not null,
  description text not null,
  guests integer not null default 2,
  inventory_count integer not null default 1,
  amenities text[] not null default '{}',
  image text not null,
  gallery text[] not null default '{}',
  index_label text not null,
  headline text
);

alter table public.rooms enable row level security;

create policy "Public reads rooms"
  on public.rooms for select
  using (true);

-- ── 4. mora_reservations: table bookings at MORA ──────────────────────────────
create table if not exists public.mora_reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time_slot text not null,
  party_size integer not null default 2,
  seating_preference text default 'Indoor',
  special_requests text,
  created_at timestamptz not null default now()
);

alter table public.mora_reservations enable row level security;

create policy "Service role inserts mora_reservations"
  on public.mora_reservations for insert
  with check (true);

-- ── 5. journal_posts: editorial articles ─────────────────────────────────────
create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  title text not null,
  description text not null,
  content text not null,
  author text not null default 'Aurelia House Editorial',
  read_time text not null default '5 min read',
  image text not null,
  published_at timestamptz not null default now()
);

alter table public.journal_posts enable row level security;

create policy "Public reads journal_posts"
  on public.journal_posts for select
  using (true);