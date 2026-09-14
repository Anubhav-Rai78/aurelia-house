import { NextRequest, NextResponse } from "next/server";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "r3UhpzMvRHBkgp32dtlkfQxsXnScG11DHpNJaFJ2butp3wZve4tJEEDg";

/**
 * GET /api/pexels?query=...&orientation=landscape
 * Server endpoint proxying requests to Pexels API with caching headers.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "luxury boutique hotel courtyard";
  const orientation = searchParams.get("orientation") || "landscape";
  const perPage = searchParams.get("per_page") || "3";

  try {
    const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}&orientation=${orientation}`;

    const res = await fetch(pexelsUrl, {
      headers: { Authorization: PEXELS_API_KEY },
      next: { revalidate: 86400 }, // Cache response for 24 hours
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Pexels API HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Pexels API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images from Pexels." },
      { status: 500 }
    );
  }
}
