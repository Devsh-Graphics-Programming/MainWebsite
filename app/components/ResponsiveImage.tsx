import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  widths?: number[];
  fallbackWidth?: number;
  pictureClassName?: string;
};

function optimizedPath(src: string, width: number, format: "avif" | "webp") {
  const clean = src.startsWith("/") ? src.slice(1) : src;
  const dot = clean.lastIndexOf(".");
  const base = dot === -1 ? clean : clean.slice(0, dot);
  return `/optimized/${base}-${width}.${format}`;
}

function srcSet(src: string, widths: number[], format: "avif" | "webp") {
  return widths.map((width) => `${optimizedPath(src, width, format)} ${width}w`).join(", ");
}

export default function ResponsiveImage({
  src,
  widths = [480, 960],
  fallbackWidth = widths[widths.length - 1],
  sizes,
  alt,
  loading = "lazy",
  decoding = "async",
  pictureClassName,
  ...imgProps
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={srcSet(src, widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(src, widths, "webp")} sizes={sizes} />
      <img
        {...imgProps}
        src={optimizedPath(src, fallbackWidth, "webp")}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}
