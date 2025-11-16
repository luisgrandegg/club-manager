import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale, isLocale, Locale } from "./i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Club Manager Kids | Youth sports club hub",
  description:
    "Manage football and basketball teams for kids under 16 with scheduling, messaging, and transparent pricing.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <html lang={locale as Locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
