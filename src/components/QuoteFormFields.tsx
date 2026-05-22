"use client";

import { useEffect, useState } from "react";
import { servicesNeeded } from "@/lib/site";
import MultiSelect from "./MultiSelect";

interface QuoteFormFieldsProps {
  onSubmitted?: () => void;
  defaultService?: string | null;
  compact?: boolean;
}

export default function QuoteFormFields({
  onSubmitted,
  defaultService,
  compact = false,
}: QuoteFormFieldsProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (defaultService) setSelectedServices([defaultService]);
  }, [defaultService]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitted) onSubmitted();
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-aquaMist text-brand-aquaDeep">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-extrabold text-brand-navy">Thank you!</h3>
        <p className="mt-2 text-brand-slate">
          Summer will be in touch shortly. For faster service, give her a call.
        </p>
      </div>
    );
  }

  const gridCols = compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";

  return (
    <form onSubmit={handleSubmit} className={`grid ${gridCols} gap-4`}>
      <Field label="Full Name" name="name" required />
      <Field label="Phone Number" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Service Address" name="address" />
      <Field label="City" name="city" placeholder="Charleston, Summerville, etc." />
      <SelectField label="Residential or Commercial" name="type" options={["Residential", "Commercial"]} />
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
          Services Needed <span className="font-normal normal-case text-brand-slate/70">(select all that apply)</span>
        </label>
        <MultiSelect
          name="services"
          options={servicesNeeded}
          value={selectedServices}
          onChange={setSelectedServices}
          placeholder="Choose one or more services..."
        />
      </div>
      <Field label="Preferred Cleaning Date" name="date" type="date" />
      <Field label="How did you hear about us?" name="referral" placeholder="Google, Facebook, friend..." />
      <div className={compact ? "" : "sm:col-span-2"}>
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
      <div className={compact ? "" : "sm:col-span-2"}>
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
      <div className={`${compact ? "" : "sm:col-span-2"} mt-1`}>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Request My Free Quote
        </button>
        <p className="mt-3 text-xs text-brand-slate">
          No spam. No pressure. Just a friendly quote from Summer.
        </p>
      </div>
    </form>
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
