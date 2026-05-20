"use client";

import { motion } from "framer-motion";
import QuoteFormBody from "./QuoteFormBody";
import GoogleReviewButton from "./GoogleReviewButton";
import { site } from "@/lib/site";

export default function QuoteForm() {
  return (
    <section id="contact" className="bg-brand-soft py-20 md:py-28">
      <div className="container-tight grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-eyebrow">Get a Free Estimate</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Tell us about your space
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Proudly serving Raleigh, NC and surrounding areas including Nash County, Durham, Cary,
            and Johnston County. Share a few details and you&rsquo;ll receive a free, no-pressure
            estimate.
          </p>

          <div className="mt-7 space-y-4">
            <a
              href={`tel:${site.phoneTel}`}
              className="card-soft flex items-center gap-4 p-4 transition hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-brand-navy/60">Call Today</span>
                <span className="block text-base font-semibold text-brand-navy">{site.phone}</span>
              </span>
            </a>

            <div className="card-soft flex items-center gap-4 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-brand-navy/60">Service Area</span>
                <span className="block text-base font-semibold text-brand-navy">
                  Raleigh, NC &middot; Nash County &middot; Durham &middot; Cary &middot; Johnston County
                </span>
              </span>
            </div>

            <div className="card-soft flex items-center gap-4 p-4">
              <GoogleReviewButton variant="ghost" className="w-full justify-center" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <QuoteFormBody variant="page" />
        </motion.div>
      </div>
    </section>
  );
}
