"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { detectLocale, getTranslations, Locale } from "@/lib/i18n";

type I18nContextType = {
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const detected = detectLocale();
    setTranslations(getTranslations(detected));
  }, []);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
  };

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
