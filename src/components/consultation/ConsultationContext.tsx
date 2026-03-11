"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface ConsultationContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("consultation") === "true") {
      setIsOpen(true);
    }
  }, []);

  return (
    <ConsultationContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}
