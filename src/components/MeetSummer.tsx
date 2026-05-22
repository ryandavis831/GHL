import Image from "next/image";
import Link from "next/link";
import QuoteCTA from "./QuoteCTA";

export default function MeetSummer() {
  return (
    <section id="about" className="relative bg-cream-wash py-20 sm:py-24">
      <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-gold/30 via-brand-aqua/20 to-transparent blur-xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-soft ring-1 ring-brand-navy/10">
              <Image
                src="/assets/brand/living-room.png"
                alt="Welcoming, freshly cleaned Charleston living room by Summers Cleaning"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white px-5 py-4 shadow-soft ring-1 ring-brand-navy/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-aqua text-white font-display font-bold text-lg">
                  S
                </span>
                <div>
                  <div className="font-bold text-brand-navy">Summer</div>
                  <div className="text-xs text-brand-slate">Owner &amp; Operator · Charleston, SC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <span className="section-eyebrow-gold">Meet the Owner</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight">
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

          <div className="mt-7 grid sm:grid-cols-3 gap-3">
            {[
              { label: "Locally Owned" },
              { label: "All-Natural Products" },
              { label: "Pet-Friendly Service" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/5 shadow-card"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-aqua" />
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
