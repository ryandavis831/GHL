"use client";

import { useState } from "react";
import { CalendarCheck2, CheckCircle2, ImagePlus } from "lucide-react";
import { services } from "@/lib/site";

const propertyTypes = [
  "Office / Commercial",
  "Restaurant",
  "Retail Store",
  "Government Building",
  "School",
  "Gym",
  "Hangar / Military Building",
  "Post-Construction Site",
  "Single-Family Home",
  "Apartment / Condo",
  "Vacation Rental",
];

export default function QuoteForm({ idHash }: { idHash?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name],
    );
  };

  return (
    <section id={idHash ?? "book"} className="section bg-white">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="eyebrow">Book Cleaning Now</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Request your free quote
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-600 sm:text-lg">
            Tell us about your space and what you need. We&apos;ll respond
            quickly with pricing, scheduling, and a custom scope of work.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-navy-800">
            {[
              "Free, no-obligation estimates",
              "Locally owned & operated since 2006",
              "Insured, supervised, background-checked crews",
              "Commercial, residential, and post-construction",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent-green" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="card flex flex-col items-center gap-3 p-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-greenSoft text-accent-greenDark">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h3 className="text-2xl font-bold text-navy-900">
                Thanks — we&apos;ve got it!
              </h3>
              <p className="text-slate1-600">
                A team member will reach out shortly to confirm your details
                and scheduling.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Demo only — wire to GHL / API later.
                setSubmitted(true);
              }}
              className="card grid gap-4 p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="input"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="input"
                    placeholder="(910) 555-0123"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="address">
                    Address / Service Location
                  </label>
                  <input
                    id="address"
                    name="address"
                    required
                    className="input"
                    placeholder="123 Main St, Richlands, NC"
                  />
                </div>
              </div>

              <div>
                <label className="label">Service(s) needed</label>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const active = selected.includes(s.name);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => toggleService(s.name)}
                        className={
                          "rounded-full border px-4 py-2 text-xs font-semibold transition " +
                          (active
                            ? "border-navy-700 bg-navy-800 text-white"
                            : "border-navy-200 bg-white text-navy-800 hover:border-navy-400")
                        }
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="propertyType">
                    Property type
                  </label>
                  <select id="propertyType" name="propertyType" className="select">
                    <option value="">Select property type…</option>
                    {propertyTypes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="date">
                    Preferred cleaning date
                  </label>
                  <input id="date" name="date" type="date" className="input" />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="message">
                  Message / Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="textarea"
                  placeholder="Square footage, frequency, special requests, deadlines…"
                />
              </div>

              <div>
                <label className="label">Photos (optional)</label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-navy-200 bg-slate1-50 px-4 py-6 text-center">
                  <div>
                    <ImagePlus className="mx-auto h-6 w-6 text-slate1-500" />
                    <p className="mt-2 text-sm font-medium text-navy-800">
                      Drag &amp; drop, or click to upload
                    </p>
                    <p className="mt-1 text-xs text-slate1-500">
                      Photos help us prepare an accurate quote (placeholder)
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary mt-2 w-full sm:w-auto">
                <CalendarCheck2 className="h-4 w-4" />
                Book Cleaning Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
