import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Book a Strategy Call — ChatGPT Ads Agency | Viralaty',
  description: "Book a free 30-minute strategy call with Viralaty. Tell us about your brand and goals — we'll come prepared with a specific plan, not a generic pitch.",
  alternates: { canonical: 'https://viralaty.com/booking' },
  openGraph: {
    title: 'Book a Strategy Call — Viralaty',
    description: 'Book a free 30-minute strategy call. First campaign live in 7–14 days.',
    url: 'https://viralaty.com/booking',
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
