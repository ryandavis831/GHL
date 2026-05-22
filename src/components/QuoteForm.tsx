"use client";

import { useState } from "react";
import { servicesNeeded, site } from "@/lib/site";
import FacebookIcon from "./FacebookIcon";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-aqua-wash py-20 sm:py-24">
      <div className="pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-brand-aqua/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />

      <div className="container-wide relative grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="section-eyebrow">Get a Free Quote</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight">
            Ready for{" "}
            <span className="text-brand-aquaDeep">Clean Fresh Vibes?</span>
          </h2>
          <p className="mt-5 text-brand-slate text-base sm:text-lg leading-relaxed">
            Tell Summer a little about your space and what you need. She&apos;ll get back to you with a free,
            no-pressure quote — usually the same day.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-navy/5 hover:ring-brand-aqua/30 transition group"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-aqua text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-aquaDeep">Call Summer</div>
                <div className="mt-1 text-lg font-bold text-brand-navy group-hover:text-brand-aquaDeep transition">
                  {site.phone}
                </div>
                <div className="text-sm text-brand-slate">Tap to call from your phone</div>
              </div>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-navy/5 hover:ring-brand-aqua/30 transition group"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-brand-navy">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Email</div>
                <div className="mt-1 text-lg font-bold text-brand-navy group-hover:text-brand-aquaDeep transition break-all">
                  {site.email}
                </div>
                <div className="text-sm text-brand-slate">Replies usually within a few hours</div>
              </div>
            </a>

            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-navy/5 hover:ring-[#1877F2]/40 transition"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2] text-white transition-transform group-hover:scale-110">
                <FacebookIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Facebook</div>
                <div className="mt-1 text-lg font-bold text-brand-navy group-hover:text-[#1877F2] transition">
                  Follow Summers Cleaning
                </div>
                <div className="text-sm text-brand-slate">Transformations, tips &amp; updates</div>
              </div>
            </a>

            <div className="rounded-2xl bg-brand-navy p-5 text-white">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="font-bold">Charleston, SC &amp; the Lowcountry</div>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Serving Charleston, Summerville, Mount Pleasant, James Island, Folly Beach, Goose Creek and
                surrounding communities.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-soft ring-1 ring-brand-navy/5">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-aquaMist text-brand-aquaDeep">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold text-brand-navy">Thank you!</h3>
                <p className="mt-2 text-brand-slate">
                  Summer will be in touch shortly. For faster service, feel free to call{" "}
                  <a href={`tel:${site.phoneTel}`} className="font-bold text-brand-aquaDeep">{site.phone}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Service Address" name="address" />
                <Field label="City" name="city" placeholder="Charleston, Summerville, etc." />
                <SelectField label="Service Needed" name="service" options={servicesNeeded} />
                <SelectField label="Residential or Commercial" name="type" options={["Residential", "Commercial"]} />
                <Field label="Preferred Cleaning Date" name="date" type="date" />
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell Summer a bit about your space, pets, and what you're hoping for."
                    className="w-full rounded-xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                    Upload Photos (optional)
                  </label>
                  <input
                    type="file"
                    name="photos"
                    multiple
                    accept="image/*"
                    className="block w-full text-sm text-brand-slate file:mr-3 file:rounded-full file:border-0 file:bg-brand-aquaMist file:px-4 file:py-2 file:text-sm file:font-bold file:text-brand-aquaDeep hover:file:bg-brand-aqua/20 cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Request My Free Quote
                  </button>
                  <p className="mt-3 text-xs text-brand-slate">
                    No spam. No pressure. Just a friendly quote from Summer.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
        {label}
        {required && <span className="text-brand-aquaDeep ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
        defaultValue=""
      >
        <option value="" disabled>
          Choose one...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
