"use client";

import { useQuoteModal } from "@/components/QuoteModalContext";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghostLight";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghostLight: "btn-ghost-light",
};

export default function QuoteButton({
  children,
  variant = "primary",
  className,
  prefillService,
  type = "button",
  ariaLabel,
  onBeforeOpen,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  prefillService?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  /** Run before the modal opens (e.g. close a mobile drawer). */
  onBeforeOpen?: () => void;
}) {
  const { openModal } = useQuoteModal();
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={() => {
        onBeforeOpen?.();
        openModal({ prefillService });
      }}
      className={cn(variantClass[variant], className)}
    >
      {children}
    </button>
  );
}
