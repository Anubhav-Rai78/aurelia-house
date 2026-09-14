"use client";

import { useState } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

/**
 * SiteImage — production image component replacing PlaceholderImage.
 *
 * Renders the real photo with next/image (fill + object-cover) inside the exact
 * aspect-ratio box the placeholder used, so layout is identical once files land
 * in /public/images. If `src` is missing or the file fails to load, it falls
 * back to the sand-coloured PlaceholderImage so the build/site never breaks.
 */
export function SiteImage({
  src,
  alt,
  caption,
  aspectRatio = "aspect-[4/3]",
  className,
  captionClassName,
  sizes = "100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  captionClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <PlaceholderImage
        caption={caption ?? alt}
        aspectRatio={aspectRatio}
        className={className}
        captionClassName={captionClassName}
      />
    );
  }

  return (
    <div className={cn(aspectRatio, className)}>
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
