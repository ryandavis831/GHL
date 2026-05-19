"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { beforeAfter } from "@/lib/site";

export default function Transformations() {
  const [s, l, w] = beforeAfter;
  return (
    <section id="transformations" className="bg-brand-soft py-20 md:py-28">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Before &amp; After</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            See the Difference a Perfect Clean Makes
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Real before-and-after results from homes we helped refresh, organize, and clean.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <SliderReveal pair={s} />
          <FlipCard pair={l} />
          <SweepReveal pair={w} />
        </div>
      </div>
    </section>
  );
}

type Pair = (typeof beforeAfter)[number];

function PairFrame({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="card-soft overflow-hidden"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-navy/5">
        {children}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-navy shadow-sm backdrop-blur">
          {badge}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
        <p className="mt-1 text-sm text-brand-navy/70">{description}</p>
      </div>
    </motion.div>
  );
}

function SliderReveal({ pair }: { pair: Pair }) {
  const [pct, setPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPct(next);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <PairFrame title={pair.title} description={pair.description} badge="Drag to reveal">
      <div
        ref={containerRef}
        className="absolute inset-0 select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          updateFromClientX(e.touches[0].clientX);
        }}
      >
        <Image
          src={pair.after}
          alt={`${pair.title} — after cleaning`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${pair.title} — before cleaning`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `calc(${pct}% - 1px)` }}
        >
          <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(12,42,77,0.2)]" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-soft ring-1 ring-brand-navy/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-teal" fill="currentColor">
              <path d="M8 5 3 12l5 7V5zM16 5l5 7-5 7V5z" />
            </svg>
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-brand-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Before
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-brand-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          After
        </span>
      </div>
    </PairFrame>
  );
}

function FlipCard({ pair }: { pair: Pair }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <PairFrame title={pair.title} description={pair.description} badge="Tap to reveal">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        className="absolute inset-0 [perspective:1200px] focus:outline-none"
        aria-label="Reveal after image"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
              src={pair.before}
              alt={`${pair.title} — before cleaning`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-brand-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              Before
            </span>
            {!flipped && (
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-navy shadow-sm">
                Tap to reveal
              </span>
            )}
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image
              src={pair.after}
              alt={`${pair.title} — after cleaning`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-brand-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              After
            </span>
          </div>
        </motion.div>
      </button>
    </PairFrame>
  );
}

function SweepReveal({ pair }: { pair: Pair }) {
  const [key, setKey] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 2400);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <PairFrame title={pair.title} description={pair.description} badge="Auto sweep">
      <Image
        src={pair.after}
        alt={`${pair.title} — after cleaning`}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />

      <AnimatePresence>
        <motion.div
          key={`before-${key}`}
          initial={{ clipPath: "inset(0 0% 0 0)" }}
          animate={{ clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 2.0, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={pair.before}
            alt={`${pair.title} — before cleaning`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          key={`sweep-${key}`}
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: "110%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.0, ease: [0.65, 0, 0.35, 1] }}
          className="pointer-events-none absolute inset-y-0 w-24"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,182,168,0) 0%, rgba(15,182,168,0.35) 50%, rgba(255,255,255,0.85) 75%, rgba(15,182,168,0) 100%)",
            boxShadow: "0 0 40px 6px rgba(15,182,168,0.45)",
            filter: "blur(2px)",
          }}
        />
      </AnimatePresence>

      <span className="absolute bottom-3 left-3 rounded-full bg-brand-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute bottom-3 right-3 rounded-full bg-brand-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
        After
      </span>

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-brand-navy shadow-sm ring-1 ring-brand-navy/5 transition hover:bg-white"
        aria-label="Replay sweep animation"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0 1 15-6.7L21 8M21 4v4h-4M21 12a9 9 0 0 1-15 6.7L3 16M3 20v-4h4" />
        </svg>
        {revealed ? "Replay" : "Cleaning…"}
      </button>
    </PairFrame>
  );
}
