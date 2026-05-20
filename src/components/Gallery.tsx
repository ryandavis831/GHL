"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gallery, galleryCategories, type GalleryCategory, type GalleryImage } from "@/lib/site";

const categoryOrder: GalleryCategory[] = [
  "Kitchens",
  "Hardwood Floors",
  "Bathrooms",
  "Bedrooms",
  "Carpets",
];

const categoryBlurb: Record<GalleryCategory, string> = {
  Kitchens: "Counters, cabinets, and floors brought back to a showroom shine.",
  "Hardwood Floors": "Polished hardwoods and tile that catch the light.",
  Bathrooms: "Tubs, showers, and tile scrubbed to a true clean.",
  Bedrooms: "Made beds, dusted surfaces, fresh floors.",
  Carpets: "Lifted, refreshed, and brought back to life.",
};

export default function Gallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flat list (filter-aware) is used for lightbox navigation.
  const flatItems = useMemo<GalleryImage[]>(
    () => (active === "All" ? gallery : gallery.filter((g) => g.category === active)),
    [active]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % flatItems.length)),
    [flatItems.length]
  );
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + flatItems.length) % flatItems.length)),
    [flatItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, next, prev, close]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-gallery-depth py-20 md:py-28">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-brand-teal/8 blur-3xl" />
      <div className="container-tight relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Project Gallery</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Our Cleaning Results
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Kitchens, hardwood floors, bathrooms, bedrooms, and carpets &mdash; cleaning results
            from homes and spaces across the Raleigh area.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "text-white" : "text-brand-navy/75 hover:text-brand-navy"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 rounded-full bg-brand-teal shadow-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </div>

        {active === "All" ? (
          <div className="mt-12 space-y-12 sm:space-y-14">
            {categoryOrder.map((cat) => {
              const items = gallery.filter((g) => g.category === cat);
              if (!items.length) return null;
              const startIndex = flatItems.findIndex((i) => i.src === items[0].src);
              return (
                <CategoryBand
                  key={cat}
                  category={cat}
                  blurb={categoryBlurb[cat]}
                  items={items}
                  onOpen={(localIdx) => setLightboxIndex(startIndex + localIdx)}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-10">
            <MasonryGrid
              items={flatItems}
              onOpen={(idx) => setLightboxIndex(idx)}
            />
          </div>
        )}
      </div>

      <Lightbox
        index={lightboxIndex}
        items={flatItems}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </section>
  );
}

function CategoryBand({
  category,
  blurb,
  items,
  onOpen,
}: {
  category: GalleryCategory;
  blurb: string;
  items: GalleryImage[];
  onOpen: (localIndex: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            {category}
          </span>
          <p className="mt-2 text-sm text-brand-navy/65">{blurb}</p>
        </div>
        <span className="hidden text-xs font-medium text-brand-navy/40 sm:block">
          {items.length} {items.length === 1 ? "result" : "results"}
        </span>
      </div>
      <MasonryGrid items={items} onOpen={onOpen} />
    </motion.div>
  );
}

function MasonryGrid({
  items,
  onOpen,
}: {
  items: GalleryImage[];
  onOpen: (index: number) => void;
}) {
  // Item-count-aware layout to keep every band balanced without empty columns.
  // 1 → single wide cinematic card
  // 2 → side-by-side, uniform aspect
  // 3 → 1-col mobile, 3-col desktop, uniform aspect
  // 4 → 2 / 4 column uniform grid (no orphan tiles)
  // 5+ → CSS columns masonry (3 cols sm, 4 cols lg) with intrinsic heights
  const count = items.length;

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div>
        <Tile item={items[0]} onClick={() => onOpen(0)} variant="cinematic" />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {items.map((img, idx) => (
          <Tile key={img.src} item={img} onClick={() => onOpen(idx)} variant="square" />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {items.map((img, idx) => (
          <Tile key={img.src} item={img} onClick={() => onOpen(idx)} variant="portrait" />
        ))}
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((img, idx) => (
          <Tile key={img.src} item={img} onClick={() => onOpen(idx)} variant="portrait" />
        ))}
      </div>
    );
  }

  if (count === 5) {
    // Magazine-style: 2 wider tiles on top, 3 portrait tiles below — every row fills.
    return (
      <div className="grid gap-3 sm:gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {items.slice(0, 2).map((img, idx) => (
            <Tile key={img.src} item={img} onClick={() => onOpen(idx)} variant="square" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.slice(2).map((img, i) => (
            <Tile key={img.src} item={img} onClick={() => onOpen(i + 2)} variant="portrait" />
          ))}
        </div>
      </div>
    );
  }

  // 6+ items: masonry columns with intrinsic image heights.
  return (
    <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [column-fill:balance]">
      {items.map((img, idx) => (
        <div key={img.src} className="mb-3 sm:mb-4 [break-inside:avoid]">
          <Tile item={img} onClick={() => onOpen(idx)} variant="natural" />
        </div>
      ))}
    </div>
  );
}

function Tile({
  item,
  onClick,
  variant,
}: {
  item: GalleryImage;
  onClick: () => void;
  variant: "natural" | "square" | "portrait" | "cinematic";
}) {
  const wrapper =
    "group relative block w-full overflow-hidden rounded-2xl bg-brand-soft text-left shadow-card ring-1 ring-brand-navy/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal";

  if (variant === "natural") {
    return (
      <button type="button" onClick={onClick} className={wrapper}>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <TileOverlay item={item} />
      </button>
    );
  }

  const aspectClass =
    variant === "square"
      ? "aspect-[4/3]"
      : variant === "portrait"
      ? "aspect-[4/5]"
      : "aspect-[16/9]"; // cinematic

  const sizes =
    variant === "cinematic"
      ? "(max-width: 1024px) 100vw, 1024px"
      : variant === "square"
      ? "(max-width: 640px) 100vw, 50vw"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <button type="button" onClick={onClick} className={`${wrapper} ${aspectClass} relative`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <TileOverlay item={item} />
    </button>
  );
}

function TileOverlay({ item }: { item: GalleryImage }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/0 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute left-3 top-3">
        <span className="inline-block rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-navy shadow-sm backdrop-blur">
          {item.category}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-medium leading-snug">{item.caption}</p>
      </div>
    </>
  );
}

function Lightbox({
  index,
  items,
  onClose,
  onNext,
  onPrev,
}: {
  index: number | null;
  items: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const img = index !== null ? items[index] : null;
  const touchHandlers = useTouchSwipe(onNext, onPrev);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/85 p-4 backdrop-blur"
          onClick={onClose}
          {...touchHandlers}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-navy shadow-soft transition hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-3 text-brand-navy shadow-soft transition hover:scale-105 sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-3 text-brand-navy shadow-soft transition hover:scale-105 sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
            </svg>
          </button>

          <motion.figure
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[88vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-white">
              <div>
                <p className="text-sm font-semibold">{img.caption}</p>
                <p className="text-xs text-white/70">{img.category}</p>
              </div>
              <div className="text-xs text-white/60">
                {(index ?? 0) + 1} / {items.length}
              </div>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useTouchSwipe(onNext: () => void, onPrev: () => void) {
  let startX = 0;
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) onNext();
        else onPrev();
      }
    },
  };
}
