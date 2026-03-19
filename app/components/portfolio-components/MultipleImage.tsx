"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export interface ImageItem {
  src: string;
  alt: string;
  /** Render type for this media. When "video", renders a <video> element instead of next/image. */
  mediaType?: "image" | "video";
}

export interface MultipleImageProps {
  images: ImageItem[];
  /** Enable click-to-open overlay. Default false. */
  enableOverlay?: boolean;
  /** Optional className for the wrapper */
  className?: string;
}

export default function MultipleImage({
  images,
  enableOverlay = false,
  className = "",
}: MultipleImageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!enableOverlay) return;
    if (openIndex == null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableOverlay, openIndex]);

  const openImage = useMemo(() => {
    if (openIndex == null) return null;
    return images[openIndex] ?? null;
  }, [images, openIndex]);

  const overlayEl =
    enableOverlay && openImage && mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className="overlayBackdrop"
            role="button"
            tabIndex={0}
            aria-label="Close image overlay"
            onClick={() => setOpenIndex(null)}
            onKeyDown={(e) => e.key === "Escape" && setOpenIndex(null)}
          >
            <div
              className="overlayContent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overlayInner">
                {openImage.mediaType === "video" ? (
                  <video
                    className="overlayVideo"
                    src={openImage.src}
                    aria-label={openImage.alt}
                    playsInline
                    muted
                    loop
                    autoPlay
                    controls
                  />
                ) : (
                  <img
                    src={openImage.src}
                    alt={openImage.alt}
                    className="overlayImage"
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className={`portfolio-multiple-image ${className}`.trim()} role="list">
        {images.map((img, i) => (
          <figure
            key={i}
            className="portfolio-multiple-image__item"
            role="listitem"
          >
            {enableOverlay ? (
              <button
                type="button"
                className="portfolio-multiple-image__button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${img.alt}`}
              >
                <div className="portfolio-multiple-image__frame">
                  {img.mediaType === "video" ? (
                    <video
                      className="portfolio-multiple-image__img"
                      src={img.src}
                      aria-label={img.alt}
                      playsInline
                      muted
                      loop
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="portfolio-multiple-image__img"
                      sizes="(max-width: 1128px) 50vw, 540px"
                    />
                  )}
                </div>
              </button>
            ) : (
              <div className="portfolio-multiple-image__frame">
                {img.mediaType === "video" ? (
                  <video
                    className="portfolio-multiple-image__img"
                    src={img.src}
                    aria-label={img.alt}
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="portfolio-multiple-image__img"
                    sizes="(max-width: 1128px) 50vw, 540px"
                  />
                )}
              </div>
            )}
          </figure>
        ))}
      </div>
      {overlayEl}
    </>
  );
}
