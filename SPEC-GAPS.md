# SPEC-GAPS.md — Content Missing from Initial Brief

This document tracks content items that are structurally present in the codebase
but have **no real content provided** in the original specification brief.
Each item is marked with `SPEC-GAP` in the corresponding source file as well.

---

## Images (critical — every slot is a PlaceholderImage)

| Page / Section | Placeholder Caption | Required Real Image |
|---|---|---|
| Home Hero | Cinematic exterior/interior at golden hour | Hero exterior photograph |
| Home Intro | Architectural detail — courtyard | Architectural portrait |
| Home Rooms ×3 | Courtyard Room / Garden Suite / Aurelia Suite interiors | 3 room interior photographs |
| Home Dining | MORA interior or plated dish | 1 dining photograph |
| Home Experiences ×4 | Backwaters, Fort Kochi at night, cooking, sunset | 4 experience photographs |
| Stay Room Cards ×3 | Room interiors (same as Home Rooms) | 3 room interior photographs |
| Room Page Hero | Room interior full-width | 1 panoramic room photograph per room |
| Dining Hero | MORA restaurant at golden hour | 1 restaurant exterior/interior |
| Dining Parallax | Chef at work / plated food | 1 atmospheric dining shot |
| Our Story Hero | Founder or architectural detail | 1 founder/architectural portrait |
| Our Story Subsections ×4 | Architecture, Founder, Philosophy, Culture | 4 editorial photographs |
| Gallery ×20 | Various (Architecture/Rooms/Dining/Experiences/Kochi) | 20 gallery images |
| Journal Heroes ×4 | Per-article hero images | 4 editorial photographs |

**Total real images needed: ~35+**

---

## Copy / Content

| Item | Status | Notes |
|---|---|---|
| Hero headline | ✅ Provided | "STAY SOMEWHERE WORTH REMEMBERING." |
| Introduction body | ✅ Provided | |
| All section headlines + CTAs | ✅ Provided | |
| Room descriptions ×3 | ✅ Provided | |
| Room amenities ×3 | ✅ Provided | |
| Dining menu items ×5 | ✅ Provided | |
| Dining hours | ✅ Provided | |
| Experience titles ×4 | ✅ Provided | |
| Experience prices ×4 | ✅ Provided | |
| Our Story paragraphs | ✅ Provided | |
| Our Story pull quote | ✅ Provided | |
| Journal article titles ×4 | ✅ Provided | |
| Journal article categories | ⚠️ Inferred | Categories not specified in brief — inferred as Travel/Food/Philosophy/Design |
| Journal article descriptions ×4 | ⚠️ Written | No descriptions provided in brief — written as placeholders |
| Journal article body content ×4 | ❌ Missing | No full article content provided |
| Social media URLs | ❌ Missing | Instagram/Facebook URLs not provided — defaulted to "#" |
| Real phone number | ⚠️ Simulated | +91 480 000 2148 is a placeholder |
| Real email | ⚠️ Simulated | stay@aureliahouse.in is a placeholder |
| Real address | ⚠️ Simulated | 12 Princess Street is plausible but not confirmed |
| Privacy Policy page | ❌ Missing | Referenced in footer? No — but may be legally required |
| Terms & Conditions page | ❌ Missing | May be needed for booking flow |
| 404 copy | ✅ Created | |
| Error boundary copy | ✅ Created | |

---

## Technical / Functional

| Item | Status | Notes |
|---|---|---|
| Supabase `contacts` table | ⚠️ Not yet created | SQL migration pending |
| Supabase `reservations` table | ⚠️ Not yet created | SQL migration pending |
| Real form submission → Supabase | ⚠️ Not connected | API routes return simulated success |
| Image optimization (next/image) | ⚠️ Not used yet | All images are PlaceholderImage components |
| SEO metadata per page | ✅ Set | |
| Responsive design | ✅ Built | Mobile-first with md: breakpoint |
| Accessibility | ✅ Built | Semantic HTML, aria labels, focus states |
| Motion / animation | ✅ Built | Hero zoom, scroll reveal, reduced-motion respected |
