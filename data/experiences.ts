// ─── Experience Data ──────────────────────────────────────────────────────────
// Detailed curated experiences shown across Home and Experiences pages.
// ──────────────────────────────────────────────────────────────────────────────

export interface ItineraryStep {
  time: string;
  activity: string;
}

export interface Experience {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  priceDisplay: string;
  priceAmount: number;
  duration: string;
  timing: string;
  groupSize: string;
  meetingPoint: string;
  included: string[];
  itinerary: ItineraryStep[];
  image: string;
}

export const experiences: Experience[] = [
  {
    slug: "morning-on-the-backwaters",
    title: "Morning on the Backwaters",
    shortDescription: "Private sunrise boat experience.",
    description:
      "Drift silently along quiet palm-fringed canals as morning mist rises over the backwaters. A private wooden boat journey with traditional chai, local snacks, and pristine birdwatching.",
    priceDisplay: "₹3,500 / couple",
    priceAmount: 3500,
    duration: "3.5 Hours",
    timing: "05:45 AM – 09:15 AM",
    groupSize: "Private (2 Guests)",
    meetingPoint: "Aurelia House Courtyard (Private transfer included)",
    included: [
      "Private hand-crafted wooden country boat",
      "Experienced local river guide",
      "Hot spiced chai & traditional banana fritters",
      "Binoculars for birdwatching",
      "Private roundtrip transfer from Aurelia House",
    ],
    itinerary: [
      { time: "05:45 AM", activity: "Depart Aurelia House via private vehicle" },
      { time: "06:15 AM", activity: "Board wooden canoe at quiet canal inlet" },
      { time: "06:45 AM", activity: "Sunrise reflection and birdwatching along palm corridors" },
      { time: "08:00 AM", activity: "Fresh coconut water & home-cooked breakfast bites on board" },
      { time: "09:15 AM", activity: "Return to Aurelia House for morning leisure" },
    ],
    image: "/images/exp-backwaters.jpg",
  },
  {
    slug: "fort-kochi-after-dark",
    title: "Fort Kochi After Dark",
    shortDescription: "Curated evening walking experience.",
    description:
      "Uncover 500 years of colonial history illuminated by lantern light. Explore ancient Dutch courtyards, quiet heritage lanes, and secret spice warehouses after the daytime crowds vanish.",
    priceDisplay: "₹1,800 / person",
    priceAmount: 1800,
    duration: "2.5 Hours",
    timing: "06:30 PM – 09:00 PM",
    groupSize: "Small Group (Max 6 Guests)",
    meetingPoint: "Aurelia House Front Porch",
    included: [
      "Expert local architectural historian guide",
      "Access to private colonial heritage courtyard",
      "Artisanal herbal digestif & local sweet tasting",
      "Personalized walking map & historical guide pamphlet",
    ],
    itinerary: [
      { time: "06:30 PM", activity: "Gather at Aurelia House porch for brief historical introduction" },
      { time: "07:00 PM", activity: "Stroll along Princess Street & Bastion Bungalow under lanterns" },
      { time: "07:45 PM", activity: "Private evening entry to a restored 18th-century Dutch warehouse" },
      { time: "08:30 PM", activity: "Digestif tasting at a secret courtyard café" },
      { time: "09:00 PM", activity: "Conclude at MORA or return to hotel" },
    ],
    image: "/images/exp-fort-kochi-night.jpg",
  },
  {
    slug: "the-kerala-table",
    title: "The Kerala Table",
    shortDescription: "Private cooking experience with a local chef.",
    description:
      "A hands-on culinary journey through coastal Kerala flavors. Accompany MORA's chef to the morning fish market, select fresh spices, and master traditional clay pot cooking techniques.",
    priceDisplay: "₹2,500 / person",
    priceAmount: 2500,
    duration: "3 Hours",
    timing: "10:30 AM – 01:30 PM",
    groupSize: "Intimate (2–4 Guests)",
    meetingPoint: "MORA Kitchen at Aurelia House",
    included: [
      "Guided market tour with MORA Executive Chef",
      "Hands-on cooking masterclass in private pavilion",
      "4-course sit-down lunch with organic beverage pairing",
      "Aurelia House linen apron & printed recipe journal",
    ],
    itinerary: [
      { time: "10:30 AM", activity: "Chef-led spice selection & coconut grating demonstration" },
      { time: "11:15 AM", activity: "Preparing Malabar seafood curry & fermentation of appam batter" },
      { time: "12:15 PM", activity: "Clay pot simmering and traditional banana leaf plating" },
      { time: "01:00 PM", activity: "Enjoy your crafted meal paired with fresh tender coconut water" },
    ],
    image: "/images/exp-cooking.jpg",
  },
  {
    slug: "harbour-sunset",
    title: "Harbour Sunset",
    shortDescription: "Private sunset cruise.",
    description:
      "Sail past historic Chinese fishing nets as the sun dips into the Arabian Sea. Enjoy chilled organic wines, Kerala canapés, and panoramic sea views aboard our private wooden launch.",
    priceDisplay: "₹4,500 / couple",
    priceAmount: 4500,
    duration: "2 Hours",
    timing: "05:00 PM – 07:00 PM",
    groupSize: "Private (2 Guests)",
    meetingPoint: "Fort Kochi Jetty (Private transfer included)",
    included: [
      "Private classic wooden motor vessel",
      "Dedicated skipper & steward",
      "Chilled organic sparkling wine / non-alcoholic botanical spritz",
      "Selection of MORA gourmet coastal canapés",
      "Roundtrip jetty transfers",
    ],
    itinerary: [
      { time: "05:00 PM", activity: "Chauffeur transfer from Aurelia House to private pier" },
      { time: "05:20 PM", activity: "Welcome drink on board and departure into Cochin Harbour" },
      { time: "06:00 PM", activity: "Positioning beside Chinese Fishing Nets for golden hour views" },
      { time: "06:45 PM", activity: "Sunset toast over the Arabian Sea and return voyage" },
    ],
    image: "/images/exp-sunset-cruise.jpg",
  },
];
