"use client";

import { useEffect } from "react";
import { useQuoteModal } from "./QuoteModalContext";
import QuoteFormFields from "./QuoteFormFields";
import { site } from "@/lib/site";

export default function QuoteModal() {
  const { isOpen, defaultService, close } = useQuoteModal();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-navyDeep/60 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative w-full sm:max-w-2xl mx-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-soft overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-brand-aqua to-brand-aquaDeep px-6 sm:px-8 py-6 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/30 blur-2xl" />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
              Free Quote · No Pressure
            </div>
            <h2 id="quote-modal-title" className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
              Let&apos;s get you Clean Fresh Vibes.
            </h2>
            <p className="mt-1.5 text-white/85 text-sm">
              Tell Summer about your space — she&apos;ll reply with a quote, usually the same day.
            </p>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-gold transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Or call {site.phone}
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6">
          <QuoteFormFields defaultService={defaultService} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
