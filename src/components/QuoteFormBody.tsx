"use client";

import { useRef, useState } from "react";
import { frequencies, servicesNeeded, site } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  services: string[];
  frequency: string;
  message: string;
  image: File | null;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  services: [],
  frequency: "",
  message: "",
  image: null,
};

export default function QuoteFormBody({
  variant = "page",
  onSubmitted,
}: {
  variant?: "page" | "modal";
  onSubmitted?: () => void;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <h3 className="mt-4 text-xl font-semibold text-brand-navy">Thanks — we got it.</h3>
        <p className="mt-2 max-w-sm text-sm text-brand-navy/70">
          We&apos;ll reach out shortly with your free estimate. For anything urgent, give us a call
          at {site.phone}.
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
    );
  }

  return (
    <form onSubmit={onSubmit} className={variant === "modal" ? "" : "card-soft p-6 md:p-8"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="qf-input"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="qf-input"
            placeholder="(252) 000-0000"
          />
        </Field>
        <Field label="Email" required className="sm:col-span-2">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="qf-input"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Street Address" className="sm:col-span-2">
          <input
            type="text"
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="qf-input"
            placeholder="123 Main St, Raleigh NC"
          />
        </Field>

        <Field label="Services Needed" className="sm:col-span-2">
          <ServicesMultiSelect
            options={servicesNeeded}
            selected={form.services}
            onToggle={toggleService}
          />
        </Field>

        <Field label="Cleaning Frequency" className="sm:col-span-2">
          <select
            value={form.frequency}
            onChange={(e) => onChange("frequency", e.target.value)}
            className="qf-input"
          >
            <option value="">Select…</option>
            {frequencies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" className="sm:col-span-2">
          <textarea
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            rows={4}
            className="qf-input resize-none"
            placeholder="Square footage, number of rooms, special requests…"
          />
        </Field>

        <Field label="Upload Image (optional)" className="sm:col-span-2">
          <UploadImageField value={form.image} onChange={(file) => onChange("image", file)} />
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

      <style jsx>{`
        :global(.qf-input) {
          width: 100%;
          border-radius: 0.75rem;
          background: white;
          border: 1px solid rgba(12, 42, 77, 0.12);
          padding: 0.7rem 0.9rem;
          font-size: 0.92rem;
          color: #0c2a4d;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.qf-input::placeholder) {
          color: rgba(12, 42, 77, 0.4);
        }
        :global(.qf-input:focus) {
          outline: none;
          border-color: #0fb6a8;
          box-shadow: 0 0 0 4px rgba(15, 182, 168, 0.15);
        }
      `}</style>
    </form>
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

function ServicesMultiSelect({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="qf-input flex items-center justify-between text-left"
      >
        <span className="flex-1 truncate text-sm">
          {selected.length === 0 ? (
            <span className="text-brand-navy/40">Select one or more…</span>
          ) : (
            <span className="text-brand-navy">
              {selected.length} selected: {selected.slice(0, 2).join(", ")}
              {selected.length > 2 ? `, +${selected.length - 2} more` : ""}
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-brand-navy/60 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-brand-navy/10 bg-white p-1.5 shadow-soft">
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                type="button"
                key={opt}
                onClick={() => onToggle(opt)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                  isSelected ? "bg-brand-teal/10 text-brand-navy" : "text-brand-navy/85 hover:bg-brand-soft"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    isSelected
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-brand-navy/25 bg-white"
                  }`}
                  aria-hidden
                >
                  {isSelected && (
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-brand-teal/10 px-2.5 py-1 text-xs font-medium text-brand-navy"
            >
              {s}
              <button
                type="button"
                onClick={() => onToggle(s)}
                aria-label={`Remove ${s}`}
                className="text-brand-navy/60 hover:text-brand-navy"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function UploadImageField({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-brand-navy/15 bg-brand-soft/60 px-4 py-3.5 text-left transition hover:border-brand-teal/60 hover:bg-brand-soft"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16V8a2 2 0 0 1 2-2h4l2-2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-brand-navy">
            {value ? value.name : "Add a photo of the space"}
          </span>
          <span className="block truncate text-xs text-brand-navy/60">
            {value ? "Tap to change" : "JPG, PNG up to ~10MB"}
          </span>
        </span>
      </button>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-2 text-xs font-semibold text-brand-coral hover:underline"
        >
          Remove image
        </button>
      )}
    </div>
  );
}
