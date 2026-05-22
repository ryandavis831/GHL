"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  title,
  description,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    function onMove(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        if (e.touches.length === 0) return;
        updateFromClientX(e.touches[0].clientX);
      } else {
        updateFromClientX(e.clientX);
      }
    }
    function onUp() {
      setDragging(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateFromClientX]);

  function handleStart(clientX: number) {
    setDragging(true);
    updateFromClientX(clientX);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPosition(0);
    if (e.key === "End") setPosition(100);
  }

  return (
    <figure className="group">
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-aquaMist ring-1 ring-brand-navy/10 shadow-card transition-shadow hover:shadow-soft ${
          dragging ? "cursor-grabbing" : "cursor-ew-resize"
        }`}
      >
        {/* After image (full underneath) */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* Before image (clipped on top) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-navyDeep/85 backdrop-blur-sm px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-card">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          Before
        </span>
        <span className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-aqua/95 backdrop-blur-sm px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-card">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          After
        </span>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-[3px] bg-white shadow-[0_0_0_1px_rgba(15,42,68,0.15)] pointer-events-none"
          style={{ left: `calc(${position}% - 1.5px)` }}
        />

        {/* Drag handle */}
        <button
          type="button"
          role="slider"
          aria-label={`${title} — drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={handleKey}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleStart(e.clientX);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleStart(e.touches[0].clientX);
          }}
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft ring-2 ring-brand-aqua transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-aqua/40 ${
            dragging ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ left: `${position}%` }}
        >
          <svg className="h-5 w-5 text-brand-aquaDeep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
          </svg>
        </button>
      </div>
      <figcaption className="mt-4">
        <h3 className="font-bold text-brand-navy">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-brand-slate leading-relaxed">{description}</p>
        )}
      </figcaption>
    </figure>
  );
}
