"use client";

import { useQuoteModal } from "./QuoteModalContext";

type QuoteButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function QuoteButton({
  className = "btn-primary",
  children = "Get Free Estimate",
}: QuoteButtonProps) {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
