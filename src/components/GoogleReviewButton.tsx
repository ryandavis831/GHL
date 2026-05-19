"use client";

import { site } from "@/lib/site";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-brand-navy ring-1 ring-brand-navy/15 shadow-soft hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(12,42,77,0.25)]",
  outline:
    "bg-transparent text-white ring-1 ring-white/30 hover:bg-white hover:text-brand-navy",
  ghost:
    "bg-brand-soft text-brand-navy ring-1 ring-brand-navy/10 hover:bg-white hover:shadow-soft",
};

export default function GoogleReviewButton({
  variant = "primary",
  className = "",
  label = "Leave Us a Google Review",
}: {
  variant?: Variant;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={site.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      <GoogleG className="h-4 w-4" />
      <span className="flex items-center gap-1">
        {label}
        <span className="ml-1 flex items-center gap-0.5 text-brand-coral">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3" />
          ))}
        </span>
      </span>
      <ExternalIcon className="h-3.5 w-3.5 opacity-70" />
    </a>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11.48 3.5a.6.6 0 0 1 1.04 0l2.36 4.78 5.28.77a.6.6 0 0 1 .33 1.02l-3.82 3.72.9 5.25a.6.6 0 0 1-.87.63L12 17.27l-4.72 2.48a.6.6 0 0 1-.87-.63l.9-5.25-3.82-3.72a.6.6 0 0 1 .33-1.02l5.28-.77 2.36-4.78Z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6M20 4 10 14M5 5h5M5 12v7h14v-5" />
    </svg>
  );
}
