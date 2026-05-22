"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface QuoteModalContextValue {
  isOpen: boolean;
  defaultService: string | null;
  open: (defaultService?: string) => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | null>(null);

  const open = useCallback((service?: string) => {
    setDefaultService(service ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setDefaultService(null);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, defaultService, open, close }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  return ctx;
}
