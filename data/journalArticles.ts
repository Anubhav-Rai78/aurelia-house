// ─── Journal Article Data ─────────────────────────────────────────────────────
// Complete long-form editorial articles for Aurelia House Journal.
// ──────────────────────────────────────────────────────────────────────────────

export interface JournalArticle {
  slug: string;
  category: "Travel" | "Food" | "Philosophy" | "Design";
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "48-hours-in-fort-kochi",
    category: "Travel",
    title: "48 Hours in Fort Kochi",
    description:
      "A considered weekend itinerary through Fort Kochi's streets, coast and courtyards.",
    author: "Aurelia House Editorial",
    date: "September 10, 2026",
    readTime: "6 min read",
    image: "/images/exp-fort-kochi-night.jpg",
    content: `
Fort Kochi moves to a rhythm dictated by tides, trade winds, and centuries of architectural accumulation. Unlike fast-paced urban centers, two days spent within its ancient grid are best approached with unhurried curiosity.

## Day One: Shadows, Spices, and Sunset

### Morning (08:00 AM – 11:30 AM)
Begin your day at Aurelia House's quiet courtyard over a pot of single-origin Nilgiri tea. Step onto **Princess Street**, one of the oldest surviving colonial thoroughfares in Asia. As the morning light hits the yellow ochre facades, walk north toward **St. Francis Church**, built by Portuguese friars in 1503. The interior radiates a quiet coolness, framed by timber rafters and hand-pulled punkha fans.

From there, wander toward the waterfront. The iconic **Chinese Fishing Nets** (*Cheena Vala*) stand like giant bamboo sculptures against the Arabian Sea. Watch as teams of six fishermen operate the complex counterweight leverage systems—a technique brought to Kochi by traders from the court of Kublai Khan in the 14th century.

### Afternoon (12:30 PM – 04:00 PM)
For lunch, head to **MORA** at Aurelia House for a modern interpretation of coastal seafood—try the *Malabar Pepper Prawns* served with steamed appam. Afterward, take a short tuk-tuk ride to **Jew Town** in Mattancherry. 

The narrow lane leading to the **Paradesi Synagogue** (built in 1568) smells richly of cardamoms, star anise, and dry ginger. The floor of the synagogue is paved with thousands of hand-painted 18th-century Chinese porcelain tiles, no two entirely alike. Browse the surrounding antique spice warehouses where heavy wooden doors open into sunlit inner courtyards filled with brass urulis and teak furniture.

> "To walk through Fort Kochi is to experience a living tapestry where Portuguese timber, Dutch gables, and Keralite roof tiles share a single skyline."

### Evening (05:30 PM – 09:00 PM)
Board our private wooden boat for the *Harbour Sunset Cruise*. As twilight settles, the harbour turns from ochre to deep indigo. Conclude your night with a slow walk along the sea wall, listening to the waves lap against ancient granite sea fortifications.

---

## Day Two: Art, Architecture, and Slow Living

### Morning (09:00 AM – 12:00 PM)
Dedicate your second morning to contemporary culture. Fort Kochi is the permanent home of the **Kochi-Muziris Biennale**, and art spaces permeate the historic quarter year-round. Visit **Pepper House**, a waterfront heritage spice godown converted into a sprawling library, café, and artist residency space. Sit beneath the massive rain tree in the central lawn while sipping cold-brewed local coffee.

### Afternoon (01:00 PM – 04:30 PM)
Explore **David Hall**, a 1670 Dutch colonial bungalow surrounded by sprawling gardens, housing rotating contemporary art exhibitions. Spend the afternoon browsing local textile ateliers where hand-loomed organic cottons (*Kasavu*) are dyed using natural indigo and madder root.

### Evening (07:00 PM onwards)
Return to Aurelia House for a nightcap on the private garden terrace. Order a signature botanical spritz crafted with fresh curry leaf oil and local white rum, reflecting on a landscape where history isn't preserved behind glass, but lived every single day.
`,
  },
  {
    slug: "a-guide-to-keralas-coastal-cuisine",
    category: "Food",
    title: "A Guide to Kerala's Coastal Cuisine",
    description:
      "From appam to karimeen, the ingredients and traditions behind MORA's menu.",
    author: "Chef K. Varghese, MORA",
    date: "August 28, 2026",
    readTime: "5 min read",
    image: "/images/dining-home.jpg",
    content: `
Kerala’s culinary identity is inseparable from its geography. With a 590-kilometer coastline flanked by the Western Ghats mountain range, the region’s food culture sits at the intersection of wild mountain spices and coastal marine abundance.

At **MORA**, our restaurant at Aurelia House, we do not view Kerala cuisine as a static museum exhibit. Instead, we honor traditional culinary alchemy while introducing subtle contemporary technique.

## The Pillars of the Kerala Kitchen

### 1. Coconut in Three Manifestations
In Malayalam, Kerala translates to *"Land of Coconuts."* In our kitchen, every element of the palm is utilized:
* **First-press coconut milk** provides creamy sweetness to slow-simmered fish curries.
* **Toasted grated coconut** (*Thenga Varuthathu*) forms the smoky dark base for rich meat stews.
* **Cold-pressed virgin coconut oil** delivers an aromatic finishing gloss to seared seafood.

### 2. The Souring Agents: Kokum & Kudampuli
Unlike Northern Indian cuisines that rely on tomatoes or yogurt for acidity, coastal Kerala relies on dried forest fruits:
* **Kudampuli** (*Garcinia cambogioides*), or Malabar Tamarind, is sun-dried and smoked over coconut husks until dark black. It imparts a deep, fruity tartness essential to traditional fish curry (*Meen Veppithu*).
* **Fresh Green Kokum** provides a brighter, floral acidity that elevates fresh shellfish.

> "A true Malabar curry does not overpower seafood with heat; it surrounds fresh catch in an intricate web of coconut, dark tamarind, and freshly crushed black pepper."

## Signature Dishes at MORA

### Coconut Milk Fish Curry
We source line-caught Pearl Spot (*Karimeen*) daily from local fishermen. The fish is gently poached in an infusion of green chilies, ginger juliennes, curry leaves, and light coconut milk, finished with a reduction of black kudampuli.

### Fermented Appam & Stew
Appam—the bowl-shaped lace crepe made from fermented rice batter and coconut toddy—is the ultimate vessel for absorbing savory broth. At MORA, our batter ferments for 12 hours overnight to achieve a delicate sourdough-like tang and pillowy center.

### Charred Banana Blossom
Demonstrating our commitment to slow plant-based cooking, fresh banana blossoms are braised with roasted mustard seeds, shallots, and crushed bird's eye chilies (*Kanthari Mulaku*), then lightly charred over coconut charcoal.
`,
  },
  {
    slug: "why-slow-travel-matters",
    category: "Philosophy",
    title: "Why Slow Travel Matters",
    description:
      "On taking the long way around, and the small luxuries of a slower rhythm.",
    author: "Aurelia House Philosophy",
    date: "August 14, 2026",
    readTime: "4 min read",
    image: "/images/intro-courtyard.jpg",
    content: `
In an era dominated by hyper-optimized itineraries and bucket-list checklists, the art of dwelling in a place has become a rare luxury. 

Slow travel is not merely about moving at a lower speed; it is an intentional shift in consciousness. It is deciding to spend three hours reading in a sunlit courtyard rather than visiting five monuments in an afternoon.

## The Principles of Slow Travel

### 1. Spatial Mindfulness
When you stay at Aurelia House, we encourage you to spend your first day without a map. Allow your footsteps to be guided by the sound of waves along the sea wall, the smell of roasting coffee beans, or the shadow play of bamboo palms against lime-plastered walls.

### 2. Deep Local Engagement
Slow travel prioritizes connection over consumption. It means having a twenty-minute conversation with the wooden boatman who has navigated the backwater canals for forty years, understanding the micro-seasons of Kerala's monsoons, or lingering over dinner at MORA long after dessert has been cleared.

> "Luxury is no longer defined by opulence or excess, but by the luxury of time, silence, and unhurried space."

## Creating Room to Breathe

At Aurelia House, our 24 rooms were intentionally built without excess digital noise. High ceilings, natural linen textures, and quiet courtyard views encourage a state of resting awareness. 

Here, luxury is quiet: a morning rain shower after a walk, the smell of damp laterite stone, and the realization that there is nowhere else you need to be.
`,
  },
  {
    slug: "the-architecture-of-aurelia-house",
    category: "Design",
    title: "The Architecture of Aurelia House",
    description:
      "Contemporary design, Kerala materials, and a quiet sense of place.",
    author: "Editorial Studio",
    date: "July 30, 2026",
    readTime: "5 min read",
    image: "/images/story-architecture.jpg",
    content: `
Architectural design at Aurelia House is an exercise in quiet restraint. Rather than creating a theme park replica of historical Kerala, our structure weaves regional materials, passive tropical ventilation, and contemporary spatial geometry into a seamless sanctuary.

## Materials That Tell a Story

### Laterite Stone & Terracotta
The foundation and lower wall planes use locally quarried red laterite stone. Porous and thermal-resistant, laterite naturally cools interior spaces during hot tropical afternoons. Rooflines feature reclaimed handmade terracotta tiles sourced from dismantled heritage structures across Malabar.

### Teak & Brass Joinery
All doors, window frames, and custom furniture were hand-carved from sustainably harvested Kerala teakwood. Over time, the wood ages into a warm golden honey patina, accented by custom hand-turned brass door pulls and lamps crafted by local metalworkers in Mannar.

> "Architecture should feel as though it grew naturally out of the soil of its region—listening to the wind, honoring local stone, and welcoming natural light."

## Passive Tropical Design

The layout of Aurelia House revolves around a central open-air courtyard. This spatial arrangement creates a natural thermal chimney: warm air rises out through the open courtyard ceiling, drawing cool breezes across the shaded verandas and private guest room balconies.

By combining high ceilings, lime-washed walls (*Chunnambu*), and deep overhangs, the property minimizes energy reliance while offering guests a tangible sensory connection to Fort Kochi's tropical climate.
`,
  },
];
