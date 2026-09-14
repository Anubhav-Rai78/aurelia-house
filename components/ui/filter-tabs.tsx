"use client";

import { cn } from "@/lib/utils";

/**
 * FilterTabs — understated text tabs separated by · (middle dot), used on the
 * Stay page (room filtering) and Gallery page (category filtering). Active tab
 * gets a 2px terracotta bottom border. Scrollable on small screens.
 */
export function FilterTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: readonly string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "scroll-hide flex items-center justify-start overflow-x-auto whitespace-nowrap px-4 py-2 md:justify-center",
        className
      )}
      role="tablist"
      aria-label="Filter"
    >
      <div className="flex items-center gap-3">
        {tabs.map((tab, i) => (
          <span key={tab} className="flex items-center gap-3">
            {i > 0 && <span className="text-forest/30" aria-hidden="true">·</span>}
            <button
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => onChange(tab)}
              className={cn(
                "border-b-2 py-1 text-label transition-colors duration-300",
                active === tab
                  ? "border-terracotta text-forest font-medium"
                  : "border-transparent text-forest/60 hover:text-forest"
              )}
            >
              {tab}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}