import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";

function normalizeLocale(locale: string): string {
  return locale.toLowerCase();
}

function findLocaleMatch(candidate: string): string | undefined {
  return SUPPORTED_LOCALES.find(
    (locale) =>
      candidate === normalizeLocale(locale) ||
      candidate.startsWith(`${normalizeLocale(locale)}-`),
  );
}

function getCookieLocale(requestHeaders: Headers): string | null {
  const cookieHeader = requestHeaders.get("cookie");
  if (!cookieHeader) {
    return null;
  }

  const cookie = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("NEXT_LOCALE="));

  if (!cookie) {
    return null;
  }

  const [, value = ""] = cookie.split("=");
  return decodeURIComponent(value);
}

function getAcceptLanguageLocales(requestHeaders: Headers): string[] {
  const acceptLanguage = requestHeaders.get("accept-language");
  if (!acceptLanguage) {
    return [];
  }

  return acceptLanguage
    .split(",")
    .map((value) => value.trim().split(";")[0])
    .filter(Boolean)
    .map(normalizeLocale);
}

export function resolveRequestLocale(requestHeaders: Headers): string {
  const cookieLocale = getCookieLocale(requestHeaders);
  if (cookieLocale) {
    const match = findLocaleMatch(normalizeLocale(cookieLocale));
    if (match) {
      return match;
    }
  }

  const requestedLocales = getAcceptLanguageLocales(requestHeaders);
  for (const requested of requestedLocales) {
    const match = findLocaleMatch(requested);
    if (match) {
      return match;
    }
  }

  return DEFAULT_LOCALE;
}
