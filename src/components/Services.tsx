"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-teal/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-mint/15 blur-3xl" />
      <div className="container-tight relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Our Services</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Cleaning that fits every space and schedule
          </h2>
          <p className="mt-3 text-brand-navy/70">
            From quick turnovers to full deep cleans, we handle homes, AirBnBs, offices, and
            commercial spaces with the same detail-focused care.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="card-soft group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-teal/10 transition group-hover:bg-brand-teal/15" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <ServiceIcon name={s.icon} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const p = { className: "h-6 w-6", strokeWidth: 1.8, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" } as const;
  switch (name) {
    case "home":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m3 11 9-8 9 8M5 10v10h14V10" />
        </svg>
      );
    case "key":
      return (
        <svg {...p}>
          <circle cx="8" cy="15" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 13l9-9 2 2-2 2-2-2-2 2" />
        </svg>
      );
    case "building":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M4 21h16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
        </svg>
      );
    case "broom":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14 4 6 6-7 7-6-6 7-7zM4 20l5-5M8 16l-4 4" />
        </svg>
      );
    case "box":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18l-2 13H5L3 7zM3 7l2-4h14l2 4M9 12h6" />
        </svg>
      );
    case "rug":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5zM5 9h14M5 15h14M8 5v14M16 5v14" />
        </svg>
      );
    case "fridge":
      return (
        <svg {...p}>
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 10h12M9 6v2M9 13v2" />
        </svg>
      );
    case "stack":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 8 8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
        </svg>
      );
    case "window":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
        </svg>
      );
    default:
      return null;
  }
}
