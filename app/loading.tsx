/**
 * Root loading state — subtle skeleton screen matching the site's warm palette.
 * Shows a shimmer animation while pages load.
 */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 px-6 py-24 md:px-12">
      <div className="space-y-3">
        <div className="h-10 w-64 animate-pulse rounded bg-sand/50" />
        <div className="h-4 w-40 animate-pulse rounded bg-sand/40" />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-80 animate-pulse rounded border border-forest/10 bg-sand/30" />
        <div className="h-80 animate-pulse rounded border border-forest/10 bg-sand/30" />
        <div className="h-80 animate-pulse rounded border border-forest/10 bg-sand/30" />
      </div>
    </div>
  );
}
