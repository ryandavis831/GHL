"use client";

import { motion } from "framer-motion";
import { reasons } from "@/lib/site";

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-navy py-20 text-white md:py-28">
      <div className="container-tight">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="section-eyebrow !bg-white/10 !text-brand-mint">Why Choose Us</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Local, reliable, and obsessed with the details
            </h2>
          </div>
          <p className="text-white/75 md:max-w-md md:justify-self-end">
            We&apos;re a small, hands-on team — so when you book us, you get consistent quality
            from people who care about your space as much as you do.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/[0.09]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
