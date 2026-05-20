"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import QuoteButton from "./QuoteButton";

const highlights = [
  "Raleigh homes & apartments",
  "AirBnB / STR turnovers",
  "Cary, Durham & Johnston Co.",
  "Nash County families",
  "Offices & churches",
  "Move-in / move-out",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-about-cream py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-mint/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="container-tight grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-brand-soft shadow-soft ring-1 ring-brand-navy/5">
            <Image
              src="/assets/brand/about-hardwood.png"
              alt="The Perfect Clean LLC branded hardwood floor — open living area"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 w-52 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-navy/5">
            <p className="text-xs uppercase tracking-widest text-brand-teal">Locally Owned</p>
            <p className="mt-1 text-sm font-semibold text-brand-navy">
              Based in Raleigh, NC
            </p>
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
            Locally owned and operated by Jessica
          </h2>
          <p className="mt-4 text-brand-navy/75">
            The Perfect Clean LLC is a Raleigh-based cleaning business offering residential,
            AirBnB, STR, move-in / move-out, carpet, and commercial cleaning services. Every space
            is cleaned with attention to detail, professionalism, and care.
          </p>
          <p className="mt-3 text-brand-navy/75">
            Proudly serving Raleigh, NC and surrounding areas including{" "}
            <span className="font-semibold text-brand-navy">
              Nash County, Durham, Cary, and Johnston County
            </span>
            .
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
            <QuoteButton>Get a Free Estimate</QuoteButton>
            <a href={`tel:${site.phoneTel}`} className="btn-outline">Call {site.phone}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
