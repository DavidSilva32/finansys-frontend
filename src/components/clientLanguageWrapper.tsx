"use client";

import { I18nProvider } from "@/context/I18nContext";

export function ClientLanguageWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
