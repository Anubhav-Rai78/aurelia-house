import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = path.join(__dirname, "..", "public", "images");

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// User-supplied Pexels API Key
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "r3UhpzMvRHBkgp32dtlkfQxsXnScG11DHpNJaFJ2butp3wZve4tJEEDg";

// Comprehensive shot list for Aurelia House — luxury boutique hotel imagery
const SHOT_LIST = [
  // Hero & Architecture
  {
    query: "luxury boutique hotel courtyard golden hour architecture warm light",
    filename: "hero-golden-hour.jpg",
    orientation: "landscape",
    desc: "Home hero — cinematic hotel at golden hour",
  },
  {
    query: "tropical courtyard architecture minimal natural materials lush garden",
    filename: "intro-courtyard.jpg",
    orientation: "portrait",
    desc: "Home intro — courtyard or architectural detail",
  },
  {
    query: "kerala chinese fishing nets dusk golden hour Kochi India",
    filename: "kochi-fishing-nets.jpg",
    orientation: "landscape",
    desc: "Gallery Kochi — Chinese fishing nets at dusk",
  },
  {
    query: "minimalist architectural interior wood stone warm light contemporary design",
    filename: "story-main.jpg",
    orientation: "portrait",
    desc: "Our Story — architectural or founder detail",
  },
  {
    query: "kerala traditional architecture terracotta tiles wood heritage building",
    filename: "story-architecture.jpg",
    orientation: "portrait",
    desc: "Our Story architecture — Kerala materials",
  },

  // Rooms
  {
    query: "boutique hotel bedroom linen natural sunlight calm warm interior design",
    filename: "room-courtyard.jpg",
    orientation: "landscape",
    desc: "Courtyard Room — calm, intimate, warm natural light",
  },
  {
    query: "luxury hotel suite balcony tropical palms garden view natural textures",
    filename: "room-garden.jpg",
    orientation: "portrait",
    desc: "Garden Suite — natural textures, soft light",
  },
  {
    query: "luxury hotel suite living room private terrace spacious contemporary",
    filename: "room-aurelia.jpg",
    orientation: "landscape",
    desc: "Aurelia Suite — spacious, private terrace",
  },
  {
    query: "minimalist luxury stone bathroom rain shower warm light spa aesthetic",
    filename: "room-shower.jpg",
    orientation: "portrait",
    desc: "Rain shower detail — warm bathroom light",
  },

  // Dining / MORA
  {
    query: "fine dining gourmet plated seafood coastal terracotta table luxury",
    filename: "dining-home.jpg",
    orientation: "portrait",
    desc: "Home dining — plated signature dish",
  },
  {
    query: "intimate warm restaurant interior golden hour evening ambient lighting",
    filename: "dining-hero.jpg",
    orientation: "landscape",
    desc: "Dining hero — MORA restaurant interior",
  },
  {
    query: "gourmet food photography aesthetic plating linen table top editorial",
    filename: "dining-menu.jpg",
    orientation: "portrait",
    desc: "Sample menu — editorial food photography",
  },
  {
    query: "professional chef plating modern cuisine kitchen contemporary technique",
    filename: "dining-chef.jpg",
    orientation: "landscape",
    desc: "Chef at work — plating at MORA",
  },
  {
    query: "spice counter local produce market vibrant colour texture India",
    filename: "dining-spices.jpg",
    orientation: "landscape",
    desc: "Spice counter — local produce, vibrant colour",
  },

  // Experiences
  {
    query: "kerala backwaters wooden canoe morning mist sunrise peaceful water",
    filename: "exp-backwaters.jpg",
    orientation: "portrait",
    desc: "Backwaters — sunrise boat, mist over water",
  },
  {
    query: "colonial cobbled street night lantern warm light vintage architecture India",
    filename: "exp-fort-kochi-night.jpg",
    orientation: "landscape",
    desc: "Fort Kochi at night — lantern-lit street",
  },
  {
    query: "traditional cooking spices clay pot hands kitchen local chef India",
    filename: "exp-cooking.jpg",
    orientation: "landscape",
    desc: "Cooking experience — local chef, Kerala kitchen",
  },
  {
    query: "wooden boat ocean cruise sunset golden hour calm water peaceful",
    filename: "exp-sunset-cruise.jpg",
    orientation: "portrait",
    desc: "Harbour sunset — golden light on water",
  },

  // Additional Luxury Editorial Assets
  {
    query: "luxury hotel pool tropical palm trees warm sunset reflections",
    filename: "pool-courtyard.jpg",
    orientation: "landscape",
    desc: "Courtyard pool reflection",
  },
  {
    query: "fresh tropical fruit breakfast artisanal pastry wooden tray morning light",
    filename: "dining-breakfast.jpg",
    orientation: "portrait",
    desc: "MORA breakfast spread",
  },
  {
    query: "handcrafted cocktail ceramic glass warm bar lighting luxury hotel",
    filename: "dining-cocktails.jpg",
    orientation: "portrait",
    desc: "MORA signature cocktails",
  },
  {
    query: "fort kochi street colonial yellow building tropical trees daylight",
    filename: "kochi-street-day.jpg",
    orientation: "portrait",
    desc: "Fort Kochi historic streets in daylight",
  }
];

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(arrayBuffer));
}

async function main() {
  console.log("✨ Starting Pexels image downloads for Aurelia House…\n");
  console.log(`📁 Target directory: ${TARGET_DIR}\n`);

  let ok = 0;
  let fail = 0;

  for (const item of SHOT_LIST) {
    const destPath = path.join(TARGET_DIR, item.filename);

    if (fs.existsSync(destPath)) {
      const stat = fs.statSync(destPath);
      if (stat.size > 10_000) {
        console.log(`⏭️  ${item.filename} already exists (${(stat.size / 1024).toFixed(0)} KB) — skipping`);
        ok++;
        continue;
      }
    }

    console.log(`🔍 ${item.desc}`);

    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(item.query)}&per_page=3&orientation=${item.orientation}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: PEXELS_API_KEY },
      });

      if (!response.ok) {
        console.error(`   ❌ API error ${response.status}: ${response.statusText}\n`);
        fail++;
        continue;
      }

      const data = await response.json();
      if (!data.photos || data.photos.length === 0) {
        console.warn(`   ⚠️  No results for: "${item.query}"\n`);
        fail++;
        continue;
      }

      const best = data.photos.reduce((prev, curr) =>
        curr.width > prev.width ? curr : prev
      );

      const photoUrl = best.src.original || best.src.large2x || best.src.large;

      console.log(`   ⬇️  Downloading ${item.filename} (${best.width}×${best.height})…`);
      await downloadImage(photoUrl, destPath);
      const saved = fs.statSync(destPath).size;
      console.log(`   ✅ Saved: ${item.filename} (${(saved / 1024).toFixed(0)} KB)\n`);
      ok++;
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}\n`);
      fail++;
    }
  }

  console.log("━".repeat(56));
  console.log(`🎉 Done! ✅ ${ok}/${SHOT_LIST.length} images ready.`);
  console.log("━".repeat(56));
}

main();
