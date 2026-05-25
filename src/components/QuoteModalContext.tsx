"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Ctx = {
  open: boolean;
  prefillService?: string;
  openModal: (opts?: { prefillService?: string }) => void;
  closeModal: () => void;
};

const QuoteModalContext = createContext<Ctx | null>(null);

export function QuoteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>();

  const openModal = useCallback((opts?: { prefillService?: string }) => {
    setPrefillService(opts?.prefillService);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, prefillService, openModal, closeModal }),
    [open, prefillService, openModal, closeModal],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used inside <QuoteModalProvider>");
  }
  return ctx;
}
