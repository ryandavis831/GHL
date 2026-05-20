"use client";

import { motion } from "framer-motion";
import { reviews, site } from "@/lib/site";
import GoogleReviewButton from "./GoogleReviewButton";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11.48 3.5a.6.6 0 0 1 1.04 0l2.36 4.78 5.28.77a.6.6 0 0 1 .33 1.02l-3.82 3.72.9 5.25a.6.6 0 0 1-.87.63L12 17.27l-4.72 2.48a.6.6 0 0 1-.87-.63l.9-5.25-3.82-3.72a.6.6 0 0 1 .33-1.02l5.28-.77 2.36-4.78Z" />
    </svg>
  );
}

function GoogleMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22 12.2c0-.8-.07-1.6-.2-2.3H12v4.4h5.6c-.24 1.3-.96 2.4-2.06 3.2v2.6h3.34C20.86 18.2 22 15.5 22 12.2Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.66-2.4l-3.34-2.6c-.93.6-2.12 1-3.32 1-2.55 0-4.7-1.7-5.48-4H3.13v2.5A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC04" d="M6.52 14C6.32 13.4 6.2 12.7 6.2 12s.12-1.4.32-2V7.5H3.13a10 10 0 0 0 0 9L6.52 14Z" />
      <path fill="#EA4335" d="M12 6c1.46 0 2.78.5 3.82 1.5l2.86-2.86A10 10 0 0 0 3.13 7.5l3.4 2.5C7.3 7.7 9.45 6 12 6Z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-brand-soft py-16 md:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Reviews</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Trusted by homeowners, renters, and businesses across the Raleigh area
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-card ring-1 ring-brand-navy/5">
            <span className="text-sm font-semibold text-brand-navy">
              Rated {site.rating.toFixed(1)} on Google
            </span>
            <span className="flex items-center gap-0.5 text-[#FBBC04]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="text-xs text-brand-navy/60">· {reviews.length} reviews</span>
          </div>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:balance]">
          {reviews.map((r, i) => (
            <motion.figure
              key={`${r.name}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
              className="card-soft mb-4 flex flex-col p-4 transition hover:-translate-y-0.5 hover:shadow-soft sm:p-5 [break-inside:avoid]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 text-[#FBBC04]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-navy/65 ring-1 ring-brand-navy/5">
                  <GoogleMark className="h-3 w-3" />
                  Google
                </span>
              </div>

              {r.text ? (
                <blockquote className="mt-2.5 text-[14px] leading-[1.55] text-brand-navy/85">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
              ) : (
                <p className="mt-2.5 text-[13px] italic leading-snug text-brand-navy/55">
                  Rated 5 stars on Google.
                </p>
              )}

              <figcaption className="mt-3 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/15 text-[11px] font-bold text-brand-teal">
                  {initials(r.name) || "G"}
                </span>
                <span className="text-[13px] font-semibold text-brand-navy">{r.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 text-center"
        >
          <p className="text-sm text-brand-navy/70">
            Loved your experience with The Perfect Clean LLC?
          </p>
          <GoogleReviewButton />
        </motion.div>
      </div>
    </section>
  );
}
