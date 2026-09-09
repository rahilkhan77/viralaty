import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Free AI Advertising Tools — ChatGPT Ads Resources | Viralaty',
  description: 'Free tools for AI advertisers: budget calculators, context signal generators, campaign planners, and more from Viralaty.',
  alternates: { canonical: 'https://viralaty.com/free-tools' },
  openGraph: {
    title: 'Free AI Advertising Tools — Viralaty',
    description: 'Free tools for AI advertisers: budget calculators, context signal generators, and more.',
    url: 'https://viralaty.com/free-tools',
  },
};

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
