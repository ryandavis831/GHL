"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/lib/site";
import QuoteButton from "./QuoteButton";

const badges = [
  { label: "5.0 Google Rating", icon: "star" },
  { label: `${site.reviewCount} Five-Star Reviews`, icon: "review" },
  { label: "Free Estimates", icon: "check" },
  { label: "Supplies Included", icon: "spray" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-mint/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />

      <div className="container-tight relative grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Serving {site.serviceArea}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-navy sm:text-5xl md:text-[3.4rem]">
            Professional Cleaning <span className="text-brand-teal">That Makes Your Space Sparkle</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-navy/70">
            Residential, AirBnB, STR, and commercial cleaning services with flexible scheduling,
            free estimates, and detail-focused results.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuoteButton />
            <a href={`tel:${site.phoneTel}`} className="btn-outline">
              <PhoneIcon className="h-4 w-4" />
              Call {site.phone}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((b) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="card-soft flex items-center gap-2 px-3 py-3 text-xs font-semibold text-brand-navy/80"
              >
                <BadgeIcon name={b.icon} />
                <span>{b.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-brand-navy/5">
            <Image
              src="/assets/gallery/kitchen-warm-island.png"
              alt="Warm wood kitchen with island and freshly cleaned hardwood floor"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-navy/30 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -left-4 bottom-6 w-44 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-navy/5"
          >
            <div className="flex items-center gap-1 text-brand-coral">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-1 text-xs text-brand-navy/70">
              Rated <span className="font-semibold text-brand-navy">5.0</span> on Google
            </p>
            <p className="mt-1 text-[11px] text-brand-navy/60">{site.reviewCount} verified reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="absolute -right-3 top-8 hidden w-48 rounded-2xl bg-brand-navy p-4 text-white shadow-soft sm:block"
          >
            <p className="text-xs uppercase tracking-widest text-brand-mint">Free Estimate</p>
            <p className="mt-1 text-sm leading-snug">Tell us the space, we&apos;ll quote it.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.48 3.5a.6.6 0 0 1 1.04 0l2.36 4.78 5.28.77a.6.6 0 0 1 .33 1.02l-3.82 3.72.9 5.25a.6.6 0 0 1-.87.63L12 17.27l-4.72 2.48a.6.6 0 0 1-.87-.63l.9-5.25-3.82-3.72a.6.6 0 0 1 .33-1.02l5.28-.77 2.36-4.78Z" />
    </svg>
  );
}

function BadgeIcon({ name }: { name: string }) {
  const cls = "h-4 w-4 text-brand-teal";
  switch (name) {
    case "star":
      return <StarIcon className="h-4 w-4 text-brand-coral" />;
    case "review":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
        </svg>
      );
    case "spray":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v4H9zM7 9h10v12H7zM5 5h2M5 8h2M5 11h2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
        </svg>
      );
  }
}
