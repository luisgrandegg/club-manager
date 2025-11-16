import type { NextConfig } from "next";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./lib/i18n/config";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "lh4.googleusercontent.com" },
      { protocol: "https", hostname: "lh5.googleusercontent.com" },
      { protocol: "https", hostname: "lh6.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
