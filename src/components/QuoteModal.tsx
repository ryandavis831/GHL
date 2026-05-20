"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuoteFormBody from "./QuoteFormBody";
import { useQuoteModal } from "./QuoteModalContext";
import { site } from "@/lib/site";

export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-navy/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={close}
          aria-modal="true"
          role="dialog"
          aria-labelledby="quote-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-soft ring-1 ring-brand-navy/5 sm:max-h-[88vh] sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-brand-navy/5 bg-white/95 px-6 pb-4 pt-6">
              <div>
                <span className="section-eyebrow">Free Estimate</span>
                <h2
                  id="quote-modal-title"
                  className="mt-2 text-xl font-bold leading-tight text-brand-navy sm:text-2xl"
                >
                  Tell us about your space
                </h2>
                <p className="mt-1 text-sm text-brand-navy/65">
                  Serving Raleigh, NC &amp; surrounding areas. Our team will follow up shortly with
                  a free, no-pressure estimate &mdash; or call{" "}
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="font-semibold text-brand-teal hover:underline"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-navy transition hover:bg-brand-navy hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <QuoteFormBody variant="modal" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
