"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  caption,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 text-ivory backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Image view"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-full bg-forest/40 p-3 text-ivory hover:bg-forest hover:text-sand"
        aria-label="Close image view"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev / Next controls */}
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-6 z-10 rounded-full bg-forest/40 p-3 text-ivory hover:bg-forest hover:text-sand"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-6 z-10 rounded-full bg-forest/40 p-3 text-ivory hover:bg-forest hover:text-sand md:right-20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center">
        <div className="relative max-h-[75vh] w-[85vw] max-w-[1200px] aspect-[16/10] overflow-hidden rounded">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            priority
          />
        </div>
        {caption && (
          <p className="mt-4 text-center text-body-sm text-ivory/80">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
