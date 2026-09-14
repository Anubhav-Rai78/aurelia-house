# Aurelia House

> A design-led luxury boutique hotel in the heart of Fort Kochi, Kerala — 24 rooms, a contemporary Kerala-inspired restaurant (MORA), and a slower rhythm of life.

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Aurelia House is a boutique hotel website built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Supabase. It is a fully client-routed marketing site — public pages only, with contact and reservation requests persisted to Supabase.

---

## Table of Contents

- [Pages](#pages)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Repository Structure](#repository-structure)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Database](#database)
- [Contact & Reservation Flow](#contact--reservation-flow)
- [Code Quality](#code-quality)
- [Deployment](#deployment)

---

## Pages

| Route            | Purpose                                   |
| :--------------- | :---------------------------------------- |
| `/`              | Home — hero, rooms preview, dining, story |
| `/stay`          | Room catalogue with filters (24 rooms)    |
| `/stay/[slug]`   | Individual room details & amenities       |
| `/dining`        | MORA restaurant, hours & sample menu      |
| `/experiences`   | Experiences around Fort Kochi             |
| `/our-story`     | Brand story & philosophy                  |
| `/gallery`       | Photo gallery                             |
| `/journal`       | Editorial articles                        |
| `/contact`       | Contact form → `POST /api/contact`        |

## Architecture & Tech Stack

| Layer              | Technology                            | Purpose                                        |
| :----------------- | :------------------------------------ | :--------------------------------------------- |
| **Framework**      | Next.js 14 (App Router)               | RSC-first marketing site                        |
| **Language**       | TypeScript (strict)                   | End-to-end type safety                          |
| **Database**       | Supabase (PostgreSQL)                 | `contacts` + `reservations` tables, RLS enabled |
| **Validation**     | Zod                                   | Shared request schemas in `lib/validators`      |
| **Styling**        | Tailwind CSS + custom design tokens   | Ivory / forest / sand / terracotta palette      |
| **Typography**     | Cormorant Garamond (serif) + DM Sans  | Luxury editorial feel                           |

## Repository Structure

```text
app/
  api/
    contact/       # POST — validated, RLS-bounded insert into contacts
    reservation/   # POST — validated, RLS-bounded insert into reservations
  (public pages)   # stay/, dining/, experiences/, our-story/, gallery/, journal/, contact/
components/
  layout/          # header, footer, mobile nav
  ui/              # button, room-card, booking-widget, gallery-grid, etc.
data/              # rooms, experiences, journal articles (typed constants)
lib/
  supabase/        # client + server clients and hand-written Database types
  validators/      # Zod schemas (single source of truth for API payloads)
  errors/          # AppError taxonomy + Postgres error mapping
  api/             # shared fetch wrapper (retries, timeout, offline detection)
supabase/
  migrations/      # 00001_initial_aurelia_house.sql
```

## Environment Configuration

Copy `.env.example` to `.env.local` and fill in your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

The schema lives in `supabase/migrations/`. Apply it after linking your project:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

The migration creates exactly two tables:

- **`contacts`** — form submissions from `/contact`
- **`reservations`** — reservation requests with a `status` column (`pending` / `confirmed` / `cancelled`)

Both have Row Level Security enabled with an insert-only policy, so guests can submit forms but never read each other's data. Room inventory and pricing remain static marketing data in `data/rooms.ts` (per the original brief); an availability table can be added later if real-time booking is needed.

## Contact & Reservation Flow

1. The form on `/contact` posts to `POST /api/contact` through the shared `apiClient` wrapper.
2. The route handler validates the payload with `contactRequestSchema` (Zod) — 400 on failure.
3. A valid payload is inserted through the RLS-bounded server client into `contacts`.
4. Database errors are mapped through `lib/errors` to safe, user-facing messages.

`POST /api/reservation` follows the same pattern, additionally enforcing that check-out is after check-in and that check-in isn't in the past.

## Code Quality

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
```

## Deployment

Deploy on [Vercel](https://vercel.com) (or any Node 18+ host). Configure the three Supabase environment variables from `.env.example`, then deploy. Successful builds on `main` trigger production previews automatically.

---

© 2026 Aurelia House. All rights reserved.