"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import QuoteButton from "./QuoteButton";

const highlights = [
  "Homes & apartments",
  "AirBnB / STR turnovers",
  "Offices & churches",
  "Move-in / move-out",
  "Carpet cleaning",
  "Decluttering & organizing",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-tight grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-brand-soft shadow-soft ring-1 ring-brand-navy/5">
            <Image
              src="/assets/gallery/hardwood-2.png"
              alt="Open living area with freshly cleaned hardwood floor"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 w-44 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-navy/5">
            <p className="text-xs uppercase tracking-widest text-brand-teal">Service Area</p>
            <p className="mt-1 text-sm font-semibold text-brand-navy">{site.serviceArea}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-eyebrow">About Us</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Local cleaning you can count on
          </h2>
          <p className="mt-4 text-brand-navy/75">
            The Perfect Clean LLC provides professional cleaning services for homes, AirBnBs,
            short-term rentals, offices, and commercial spaces. Whether you need a one-time deep
            clean, recurring service, move-out cleaning, carpet cleaning, or help decluttering and
            organizing, our team brings the supplies and leaves your space feeling fresh.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-brand-navy/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <QuoteButton>Request Free Estimate</QuoteButton>
            <a href={`tel:${site.phoneTel}`} className="btn-outline">Call {site.phone}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
