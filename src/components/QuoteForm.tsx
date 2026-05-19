"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { frequencies, propertyTypes, servicesNeeded, site } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  service: string;
  frequency: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  service: "",
  frequency: "",
  message: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-brand-soft py-20 md:py-28">
      <div className="container-tight grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-eyebrow">Get a Free Estimate</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
            Tell us about your space — we&apos;ll send you a quote
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Share a few quick details and we&apos;ll follow up with a free, no-pressure estimate.
          </p>

          <div className="mt-7 space-y-4">
            <a
              href={`tel:${site.phoneTel}`}
              className="card-soft flex items-center gap-4 p-4 transition hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-brand-navy/60">Prefer to call?</span>
                <span className="block text-base font-semibold text-brand-navy">{site.phone}</span>
              </span>
            </a>

            <div className="card-soft flex items-center gap-4 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-brand-navy/60">Service Area</span>
                <span className="block text-base font-semibold text-brand-navy">{site.serviceArea}</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="card-soft p-6 md:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <h3 className="mt-4 text-xl font-semibold text-brand-navy">Thanks — we got it.</h3>
              <p className="mt-2 max-w-sm text-sm text-brand-navy/70">
                We&apos;ll reach out shortly with your free estimate. For anything urgent, give us a
                call at {site.phone}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(initial);
                  setSubmitted(false);
                }}
                className="mt-5 text-sm font-semibold text-brand-teal hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    className="input"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    className="input"
                    placeholder="(252) 000-0000"
                  />
                </Field>
                <Field label="Email" required className="sm:col-span-2">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    className="input"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Property Type">
                  <select
                    value={form.propertyType}
                    onChange={(e) => onChange("propertyType", e.target.value)}
                    className="input"
                  >
                    <option value="">Select…</option>
                    {propertyTypes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Service Needed">
                  <select
                    value={form.service}
                    onChange={(e) => onChange("service", e.target.value)}
                    className="input"
                  >
                    <option value="">Select…</option>
                    {servicesNeeded.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Cleaning Frequency" className="sm:col-span-2">
                  <select
                    value={form.frequency}
                    onChange={(e) => onChange("frequency", e.target.value)}
                    className="input"
                  >
                    <option value="">Select…</option>
                    {frequencies.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    value={form.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    rows={4}
                    className="input resize-none"
                    placeholder="Square footage, number of rooms, special requests…"
                  />
                </Field>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full text-base">
                Request Free Estimate
              </button>
              <p className="mt-3 text-center text-xs text-brand-navy/60">
                Prefer to call?{" "}
                <a href={`tel:${site.phoneTel}`} className="font-semibold text-brand-teal hover:underline">
                  {site.phone}
                </a>
              </p>
            </>
          )}
        </motion.form>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          background: white;
          border: 1px solid rgba(12, 42, 77, 0.12);
          padding: 0.7rem 0.9rem;
          font-size: 0.92rem;
          color: #0c2a4d;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input::placeholder) {
          color: rgba(12, 42, 77, 0.4);
        }
        :global(.input:focus) {
          outline: none;
          border-color: #0fb6a8;
          box-shadow: 0 0 0 4px rgba(15, 182, 168, 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-navy/70">
        {label}
        {required && <span className="ml-1 text-brand-coral">*</span>}
      </span>
      {children}
    </label>
  );
}
