import Link from "next/link";
import { services, locations, site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-navyDeep text-white">
      <div className="container-wide py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Logo variant="white" />
          <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed">
            Locally owned by Summer. All-natural, pet-friendly residential and commercial cleaning across
            Charleston, SC and the Lowcountry. Clean Fresh Vibes guaranteed.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={`tel:${site.phoneTel}`} className="flex items-center gap-3 text-white hover:text-brand-gold transition">
              <svg className="h-4 w-4 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white hover:text-brand-gold transition break-all">
              <svg className="h-4 w-4 text-brand-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {site.email}
            </a>
            <div className="flex items-center gap-3 text-white/80">
              <svg className="h-4 w-4 text-brand-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Charleston, SC &amp; the Lowcountry
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/75 hover:text-white transition">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">Service Areas</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <Link href={`/service-areas/${loc.slug}`} className="text-white/75 hover:text-white transition">
                  {loc.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition">About Summer</Link>
            <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
