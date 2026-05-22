import Image from "next/image";
import Link from "next/link";
import QuoteCTA from "./QuoteCTA";

const TARGETS = [
  { title: "Offices", desc: "Bright, healthy workspaces your team will love showing up to." },
  { title: "Airbnb Properties", desc: "Five-star turnovers that keep your reviews glowing." },
  { title: "Vacation Rentals", desc: "Fast, reliable refreshes between guest stays in the Lowcountry." },
  { title: "Rental Turnovers", desc: "Move-out cleans that protect deposits and impress landlords." },
  { title: "Small Businesses", desc: "Boutiques, studios, and storefronts kept fresh and welcoming." },
  { title: "Move-Out Cleanings", desc: "Final walkthroughs that leave the space spotless for the next owner." },
];

export default function CommercialSection() {
  return (
    <section className="bg-aqua-wash py-20 sm:py-24">
      <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-aqua/30 to-brand-gold/20 blur-2xl" />
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-soft ring-1 ring-white/60">
              <Image
                src="/assets/brand/hero-kitchen.png"
                alt="Bright commercial kitchen cleaned by Summers Cleaning Charleston SC"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <span className="section-eyebrow">Commercial Cleaning</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight">
            Cleaning that{" "}
            <span className="text-brand-aquaDeep">grows your business</span>
          </h2>
          <p className="mt-4 text-brand-slate text-base sm:text-lg">
            From boutique offices to Airbnb properties across Charleston and the Lowcountry, Summers Cleaning
            keeps your space presentation-ready with all-natural products that smell as fresh as they look.
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {TARGETS.map((t) => (
              <div
                key={t.title}
                className="rounded-xl bg-white p-4 ring-1 ring-brand-navy/5 shadow-card"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-aquaMist text-brand-aquaDeep shrink-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-brand-navy">{t.title}</div>
                    <p className="mt-0.5 text-sm text-brand-slate leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteCTA className="btn-primary">Book a Cleaning</QuoteCTA>
            <Link href="/services/commercial-cleaning" className="btn-outline">
              Commercial Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
