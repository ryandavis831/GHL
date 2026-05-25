import Link from "next/link";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { areas, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate1-200">
      <div className="container-wide grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky2-500 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold text-white">
                Carolina Commercial
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky2-300">
                Cleaning Services Inc
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate1-300">
            Family-rooted, locally-owned cleaning company serving Eastern North
            Carolina since {site.founded}. {site.primaryTagline}
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-sky2-400" />
              <span>
                {site.address.city}, {site.address.region}{" "}
                {site.address.postalCode}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-sky2-400" />
              <a href={`tel:${site.phoneRaw}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-sky2-400" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.url} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Service Areas
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={a.url} className="hover:text-white">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                All Services
              </Link>
            </li>
            <li>
              <Link href="/service-areas" className="hover:text-white">
                Service Areas
              </Link>
            </li>
            <li>
              <Link href="/clients" className="hover:text-white">
                Clients
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact / Book Cleaning
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate1-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-center">
            Locally owned & operated • Richlands, NC • &quot;
            {site.primaryTagline}&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
