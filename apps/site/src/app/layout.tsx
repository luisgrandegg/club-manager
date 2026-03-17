import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clubmanager.example.com'),
  title: {
    default: 'Club Manager — Manage your sports club effortlessly',
    template: '%s | Club Manager',
  },
  description:
    'Club Manager helps sports clubs organise members, schedules, and events in one place.',
  openGraph: {
    type: 'website',
    siteName: 'Club Manager',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
