import Link from "next/link";
import { locations } from "@/lib/site";
import QuoteCTA from "./QuoteCTA";

export default function ServiceAreaSection() {
  return (
    <section id="service-areas" className="bg-aqua-wash py-20 sm:py-24">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow-gold">Service Area</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            Proudly serving the{" "}
            <span className="text-brand-aquaDeep">Lowcountry</span>
          </h2>
          <p className="mt-4 text-brand-slate text-base sm:text-lg">
            Homes, Airbnbs, and small businesses across Charleston, Summerville, Goose Creek, Mount Pleasant,
            Folly Beach, Kiawah, Isle of Palms, and every Lowcountry community in between.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 sm:p-10 shadow-card ring-1 ring-brand-navy/5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/service-areas/${loc.slug}`}
                className="group flex items-center gap-2 rounded-xl bg-brand-aquaMist/60 hover:bg-brand-aquaMist px-3 py-2.5 text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/5 hover:ring-brand-aqua/40 hover:shadow-card transition"
              >
                <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-aqua group-hover:bg-brand-gold transition" />
                <span className="truncate">{loc.displayName}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <QuoteCTA className="btn-primary">Schedule My Cleaning</QuoteCTA>
            <Link href="/service-areas" className="btn-outline">
              View All Service Areas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
