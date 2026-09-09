import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Viralaty — ChatGPT Ads Agency',
  description: 'Viralaty is a specialist ChatGPT Ads agency founded by a 12-year media veteran. We help DTC, SaaS, and high-ticket brands scale with AI-native advertising.',
  alternates: { canonical: 'https://viralaty.com/about' },
  openGraph: {
    title: 'About Viralaty — ChatGPT Ads Agency',
    description: 'Specialist ChatGPT Ads agency. 12-year media veteran. DTC, SaaS, and high-ticket brands.',
    url: 'https://viralaty.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
