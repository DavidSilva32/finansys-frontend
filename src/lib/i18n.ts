"use client";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

export type Locale = "en" | "pt";

export function detectLocale(): Locale {
  if (typeof navigator !== "undefined") {
    const lang = navigator.language || navigator.languages[0];
    if (lang.startsWith("pt")) return "pt";
  }
  return "en";
}

export function getTranslations(locale: Locale) {
  return locale === "pt" ? pt : en;
}
