import Image from "next/image";

export interface SingleImageProps {
  /** Source for the image or video */
  src: string;
  /** Alt text / accessible label for the media */
  alt: string;
  /**
   * Media type. Defaults to "image". When set to "video",
   * the component will render a <video> element instead of next/image.
   */
  mediaType?: "image" | "video";
  /** Optional caption below the media */
  caption?: string;
  /** Optional className for the wrapper */
  className?: string;
}

export default function SingleImage({
  src,
  alt,
  mediaType = "image",
  caption,
  className = "",
}: SingleImageProps) {
  const wrapperClass = `portfolio-single-image ${className}`.trim();

  const isVideo = mediaType === "video";

  return (
    <figure className={wrapperClass}>
      <div className="portfolio-single-image__frame">
        {isVideo ? (
          <video
            className="portfolio-single-image__media"
            src={src}
            aria-label={alt}
            playsInline
            muted
            loop
            autoPlay
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={800}
            className="portfolio-single-image__media"
          />
        )}
      </div>
      {caption != null && (
        <figcaption className="portfolio-single-image__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
