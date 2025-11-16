import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";

function normalizeLocale(locale: string): string {
  return locale.toLowerCase();
}

export function resolveRequestLocale(requestHeaders: Headers): string {
  const acceptLanguage = requestHeaders.get("accept-language");
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const requestedLocales = acceptLanguage
    .split(",")
    .map((value) => value.trim().split(";")[0])
    .filter(Boolean)
    .map(normalizeLocale);

  for (const requested of requestedLocales) {
    const match = SUPPORTED_LOCALES.find((locale) =>
      requested === normalizeLocale(locale) ||
      requested.startsWith(`${normalizeLocale(locale)}-`),
    );

    if (match) {
      return match;
    }
  }

  return DEFAULT_LOCALE;
}
