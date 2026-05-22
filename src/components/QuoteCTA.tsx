"use client";

import { ReactNode } from "react";
import { useQuoteModal } from "./QuoteModalContext";

interface QuoteCTAProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  defaultService?: string;
}

export default function QuoteCTA({
  children,
  className = "btn-primary",
  ariaLabel,
  defaultService,
}: QuoteCTAProps) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={() => open(defaultService)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
