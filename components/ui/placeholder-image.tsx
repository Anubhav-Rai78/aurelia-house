import { cn } from "@/lib/utils";

/**
 * PlaceholderImage — rendered in every image slot until real photography is
 * dropped into /public/images. Sand background with a caption describing the
 * exact shot required, sized to the matching aspect ratio so layout never
 * shifts once real photos are placed.
 */
export function PlaceholderImage({
  caption,
  aspectRatio,
  className,
  captionClassName,
}: {
  caption: string;
  aspectRatio?: string;
  className?: string;
  captionClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-sand/40 p-6",
        aspectRatio ?? "aspect-[4/3]",
        className
      )}
    >
      <span
        className={cn(
          "text-center text-body-sm leading-relaxed text-forest/50",
          captionClassName
        )}
      >
        {caption}
      </span>
    </div>
  );
}