import Image from "next/image";
import Link from "next/link";
import QuoteCTA from "./QuoteCTA";

export default function MeetSummer() {
  return (
    <section id="about" className="relative bg-cream-wash py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* Soft decorative accents */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand-aqua/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Image — ~55% of the layout on desktop */}
        <div className="lg:col-span-7 relative order-2 lg:order-1">
          <div className="relative">
            {/* Glow halo */}
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-aqua/25 via-white/10 to-brand-gold/25 blur-2xl" />

            <div className="relative aspect-[3/2] w-full rounded-[2rem] overflow-hidden shadow-soft ring-1 ring-brand-navy/10 bg-brand-aquaMist">
              <Image
                src="/assets/brand/about-branded.png"
                alt="Bright Lowcountry living space — Summers Cleaning all-natural service"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Floating signature card overlapping the image */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:max-w-xs rounded-2xl bg-white px-5 py-4 shadow-soft ring-1 ring-brand-navy/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-aqua text-white font-display font-extrabold text-xl shadow-glow">
                  S
                </span>
                <div>
                  <div className="font-extrabold text-brand-navy leading-tight">Summer</div>
                  <div className="text-xs text-brand-slate">Owner &amp; Operator · Charleston, SC</div>
                </div>
                <div className="ml-auto hidden sm:flex flex-col items-end">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} className="h-3.5 w-3.5 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-[10px] font-semibold text-brand-slate mt-0.5">5.0 on Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy — ~45% of the layout on desktop */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <span className="section-eyebrow-gold">Meet the Owner</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.1]">
            Hi, I&apos;m <span className="text-brand-aquaDeep">Summer</span>.
          </h2>
          <div className="mt-5 space-y-4 text-brand-slate text-base sm:text-lg leading-relaxed">
            <p>
              I&apos;m the owner of <strong className="text-brand-navy">Summers Cleaning LLC</strong>. I
              started this business to help Charleston-area homes and businesses feel cleaner, fresher, and
              more comfortable without relying on harsh cleaning products.
            </p>
            <p>
              Every job is personal to me. Whether it&apos;s a routine home cleaning, a move-in/move-out
              clean, or a commercial space, I take pride in showing up with{" "}
              <strong className="text-brand-navy">care, consistency, and attention to detail</strong>.
            </p>
            <p>
              Summers Cleaning is locally owned and focused on{" "}
              <strong className="text-brand-aquaDeep">all-natural, pet-friendly cleaning solutions</strong>{" "}
              that are safe for families, pets, and everyday spaces.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2">
            {[
              { label: "Locally Owned" },
              { label: "All-Natural" },
              { label: "Pet-Friendly" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white px-3 py-2.5 text-xs sm:text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/5 shadow-card text-center"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-aqua align-middle" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteCTA className="btn-primary">Schedule My Cleaning</QuoteCTA>
            <Link href="/about" className="btn-outline">
              Learn More About Summer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
