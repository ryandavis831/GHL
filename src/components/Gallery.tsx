"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { gallery, galleryCategories, type GalleryImage } from "@/lib/site";

export default function Gallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo<GalleryImage[]>(
    () => (active === "All" ? gallery : gallery.filter((g) => g.category === active)),
    [active]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
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
    <section id="gallery" className="py-20 md:py-28">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Project Gallery</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Our Cleaning Results
          </h2>
          <p className="mt-3 text-brand-navy/70">
            From sparkling hardwood floors to refreshed carpets, kitchens, bathrooms, and bedrooms,
            every detail matters.
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
                  isActive
                    ? "text-white"
                    : "text-brand-navy/75 hover:text-brand-navy"
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

        <LayoutGroup>
          <motion.div
            layout
            className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((img, idx) => (
                <motion.button
                  type="button"
                  layout
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  onClick={() => setLightboxIndex(idx)}
                  className={`group relative block overflow-hidden rounded-2xl bg-brand-soft shadow-card ring-1 ring-brand-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                    idx % 7 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-brand-teal/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                      {img.category}
                    </span>
                    <p className="mt-1 text-sm font-medium leading-snug">{img.caption}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <Lightbox
        index={lightboxIndex}
        items={items}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </section>
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
  const touchStart = useTouchSwipe(onNext, onPrev);

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
          {...touchStart}
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
