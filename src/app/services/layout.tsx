import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'ChatGPT Ads Services — Campaign Setup, Management & Optimisation | Viralaty',
  description: "Explore Viralaty's full suite of ChatGPT Ads services: campaign setup, ads management, creative & context signals, product feed, measurement, and Europe launch.",
  alternates: { canonical: 'https://viralaty.com/services' },
  openGraph: {
    title: 'ChatGPT Ads Services — Viralaty',
    description: 'Done-for-you ChatGPT Ads services: setup, management, optimisation, and measurement.',
    url: 'https://viralaty.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
