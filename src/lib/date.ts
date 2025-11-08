export function formatLocalizedDate(dateString: string, locale: string) {
  try {
    return new Date(dateString).toLocaleDateString(locale, { timeZone: "UTC" });
  } catch {
    return dateString;
  }
}