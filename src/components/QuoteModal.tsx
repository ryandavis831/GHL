"use client";

import { useEffect } from "react";
import { X, Sparkles, ShieldCheck, MapPin, Phone } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import QuoteFormBody from "@/components/QuoteFormBody";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function QuoteModal() {
  const { open, prefillService, closeModal } = useQuoteModal();

  // Esc-to-close + body scroll lock when open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open, closeModal]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] transition",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className={cn(
          "absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className={cn(
          "absolute inset-0 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6",
        )}
      >
        <div
          className={cn(
            "relative my-0 w-full max-w-2xl overflow-hidden rounded-t-2xl bg-white shadow-cardHover transition-all duration-200 ease-out sm:my-8 sm:rounded-2xl",
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 sm:translate-y-2",
          )}
        >
          {/* Header */}
          <div className="relative bg-navy-deep px-5 py-5 text-white sm:px-7 sm:py-6">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3 pr-10">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky2-500 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky2-200">
                  Free, no-obligation
                </p>
                <h2
                  id="quote-modal-title"
                  className="mt-0.5 text-xl font-bold sm:text-2xl"
                >
                  Request Your Free Cleaning Quote
                </h2>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate1-200">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-sky2-300" />
                Locally owned since {site.founded}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky2-300" />
                Eastern NC
              </span>
              <a
                href={`tel:${site.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-sky2-200 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                {site.phone}
              </a>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
            <QuoteFormBody
              prefillService={prefillService}
              onSuccess={closeModal}
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
}
