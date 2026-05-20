"use client";

import Image from "next/image";
import { navLinks, services, site } from "@/lib/site";
import GoogleReviewButton from "./GoogleReviewButton";

export default function Footer() {
  return (
    <footer className="bg-brand-navy pt-16 pb-28 text-white md:pb-12">
      <div className="container-tight">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white p-3">
              <Image
                src="/assets/logo/logo.png"
                alt={`${site.name} logo`}
                width={140}
                height={64}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Locally owned and operated. Professional residential, AirBnB, STR, and commercial
              cleaning proudly serving <span className="font-semibold text-white">Raleigh, NC</span> and
              surrounding areas including Nash County, Durham, Cary, and Johnston County.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={`tel:${site.phoneTel}`} className="btn-primary">Call Today · {site.phone}</a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get Free Estimate
              </a>
            </div>
            <div className="mt-5">
              <GoogleReviewButton variant="outline" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-mint">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {services.slice(0, 8).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="transition hover:text-white">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-mint">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-mint">Service Area</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href={`tel:${site.phoneTel}`} className="transition hover:text-white">{site.phone}</a>
              </li>
              <li>Raleigh, NC <span className="text-white/40">(primary)</span></li>
              <li>Nash County · Durham · Cary · Johnston County</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
