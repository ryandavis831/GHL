import { reasons } from "@/lib/site";

const ICONS: Record<string, JSX.Element> = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3c-9 0-15 6-15 14 0 1.4.4 2.7 1 4 1.3-.6 2.6-1 4-1 8 0 14-6 14-15-1.3.3-2.7.5-4 .5z" />
      <path d="M6 21c2-4 5-7 9-9" />
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
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" />
    </svg>
  ),
};

export default function TrustGrid() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Why Summers Cleaning</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            Cleaning you can{" "}
            <span className="text-brand-aquaDeep">feel good about</span>
          </h2>
          <p className="mt-4 text-brand-slate text-base sm:text-lg">
            Safe, natural cleaning by a Charleston local who genuinely cares about your home.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-aqua/5 group-hover:bg-brand-aqua/10 transition" />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-aquaMist text-brand-aquaDeep">
                  <span className="h-6 w-6 block">{ICONS[r.icon]}</span>
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{r.title}</h3>
                <p className="mt-2 text-sm text-brand-slate leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
