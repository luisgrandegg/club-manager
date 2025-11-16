
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Translations<T> = Record<Locale, T>

export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "es";
