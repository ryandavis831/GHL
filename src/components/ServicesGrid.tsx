import Link from "next/link";
import { services } from "@/lib/site";

const ICONS: Record<string, JSX.Element> = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="9" y1="7" x2="9" y2="7.01" />
      <line x1="15" y1="7" x2="15" y2="7.01" />
      <line x1="9" y1="11" x2="9" y2="11.01" />
      <line x1="15" y1="11" x2="15" y2="11.01" />
      <line x1="9" y1="15" x2="9" y2="15.01" />
      <line x1="15" y1="15" x2="15" y2="15.01" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5C7.5 8 5 11.5 5 14.5a7 7 0 0 0 14 0c0-3-2.5-6.5-7-12z" />
    </svg>
  ),
  utensils: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M14 2c-1.5 2-2 4-2 6 0 3 2 5 2 5v9" />
    </svg>
  ),
  paw: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="6" cy="9" rx="1.8" ry="2.4" />
      <ellipse cx="10" cy="6.5" rx="1.8" ry="2.4" />
      <ellipse cx="14" cy="6.5" rx="1.8" ry="2.4" />
      <ellipse cx="18" cy="9" rx="1.8" ry="2.4" />
      <path d="M12 11.5c-3 0-5.4 2.2-5.4 4.6 0 1.7 1.3 2.9 3 2.9 1 0 1.7-.4 2.4-.4s1.4.4 2.4.4c1.7 0 3-1.2 3-2.9 0-2.4-2.4-4.6-5.4-4.6z" />
    </svg>
  ),
};

export default function ServicesGrid() {
  return (
    <section id="services" className="relative bg-aqua-wash py-20 sm:py-24">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="section-eyebrow">Our Services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
              Cleaning services for every space
            </h2>
            <p className="mt-3 max-w-2xl text-brand-slate text-base sm:text-lg">
              From recurring home cleans to commercial turnovers, every service is done with all-natural,
              pet-safe products that deliver Clean Fresh Vibes.
            </p>
          </div>
          <Link href="/contact" className="btn-gold hidden sm:inline-flex">
            Refresh My Home
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/20 transition" />
              <div className="relative flex flex-col h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-aqua text-white shadow-glow">
                  <span className="h-6 w-6 block">{ICONS[s.icon]}</span>
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-slate leading-relaxed flex-1">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-aquaDeep group-hover:gap-3 transition-all">
                  Learn More
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
