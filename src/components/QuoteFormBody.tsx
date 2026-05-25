"use client";

import { useEffect, useState } from "react";
import { CalendarCheck2, Check, CheckCircle2, ImagePlus } from "lucide-react";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

const propertyTypes = [
  "Commercial Building",
  "Office",
  "Restaurant",
  "School",
  "Gym",
  "Government Facility",
  "Residential Home",
  "Post-Construction Site",
  "Other",
];

const timingOptions = [
  "As soon as possible",
  "This week",
  "Next week",
  "Within 2–4 weeks",
  "Flexible / Not sure yet",
];

type Props = {
  /** Optional service name to pre-select (e.g. when opened from a service page). */
  prefillService?: string;
  /** Called after a successful submission. */
  onSuccess?: () => void;
  /** Compact spacing for use inside the modal. */
  compact?: boolean;
};

export default function QuoteFormBody({
  prefillService,
  onSuccess,
  compact = false,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    prefillService ? [prefillService] : [],
  );

  useEffect(() => {
    if (prefillService && !selected.includes(prefillService)) {
      setSelected((prev) => [...prev, prefillService]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillService]);

  const toggleService = (name: string) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name],
    );

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 px-2 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-greenSoft text-accent-greenDark">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-2xl font-bold text-navy-900">
          Thanks — we&apos;ve got it!
        </h3>
        <p className="max-w-sm text-slate1-600">
          A team member will reach out shortly to confirm your details and
          scheduling.
        </p>
        {onSuccess && (
          <button
            type="button"
            onClick={onSuccess}
            className="btn-outline mt-2"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Demo only — wire to GHL / API later.
        setSubmitted(true);
      }}
      className={cn("grid", compact ? "gap-3.5" : "gap-4")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-name">
            Full name
          </label>
          <input
            id="qf-name"
            name="name"
            required
            className="input"
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="label" htmlFor="qf-phone">
            Phone number
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            required
            className="input"
            placeholder="(910) 555-0123"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-email">
            Email
          </label>
          <input
            id="qf-email"
            name="email"
            type="email"
            required
            className="input"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="qf-address">
            Address / Service location
          </label>
          <input
            id="qf-address"
            name="address"
            required
            className="input"
            placeholder="123 Main St, Richlands, NC"
            autoComplete="street-address"
          />
        </div>
      </div>

      <div>
        <label className="label">
          Service(s) needed{" "}
          <span className="text-xs font-medium text-slate1-500">
            (select one or more)
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const active = selected.includes(s.name);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggleService(s.name)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2",
                  active
                    ? "border-navy-800 bg-navy-800 text-white shadow-card"
                    : "border-navy-200 bg-white text-navy-800 hover:border-navy-400 hover:bg-slate1-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition",
                    active
                      ? "border-white bg-white text-navy-800"
                      : "border-navy-300 bg-white text-transparent",
                  )}
                  aria-hidden
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-property">
            Property type
          </label>
          <select id="qf-property" name="propertyType" className="select">
            <option value="">Select property type…</option>
            {propertyTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="qf-timing">
            Preferred timing
          </label>
          <select id="qf-timing" name="timing" className="select">
            <option value="">When are you looking to start?</option>
            {timingOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="qf-message">
          Message / Project details
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={compact ? 3 : 4}
          className="textarea"
          placeholder="Square footage, frequency, special requests, deadlines…"
        />
      </div>

      <div>
        <label className="label">
          Photos{" "}
          <span className="text-xs font-medium text-slate1-500">
            (optional)
          </span>
        </label>
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-navy-200 bg-slate1-50 px-4 py-5 text-center">
          <div>
            <ImagePlus className="mx-auto h-6 w-6 text-slate1-500" />
            <p className="mt-2 text-sm font-medium text-navy-800">
              Drag &amp; drop, or click to upload
            </p>
            <p className="mt-1 text-xs text-slate1-500">
              Photos help us prepare an accurate quote
            </p>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary mt-2 w-full">
        <CalendarCheck2 className="h-4 w-4" />
        Book Cleaning Now
      </button>
    </form>
  );
}
