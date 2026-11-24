import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

export function SanityImage({
  image,
  sizes,
  alt,
  priority = false,
  className = "",
}: {
  image?: SanityImageType;
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!image?.asset?._id) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-navy-100 text-navy-300 ${className}`}
      >
        <ImageIcon aria-hidden className="size-8" />
      </div>
    );
  }

  const src = urlFor(image).fit("max").url();
  const position = image.hotspot
    ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
    : "50% 50%";
  const lqip = image.asset.metadata?.lqip;

  return (
    <Image
      src={src}
      alt={alt ?? image.alt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
      className={`object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
