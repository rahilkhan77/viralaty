import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'FAQ — ChatGPT Ads & AI Advertising Questions | Viralaty',
  description: 'Answers to the most common questions about ChatGPT Ads, AI advertising pricing, campaign setup, conversion tracking, and working with Viralaty.',
  alternates: { canonical: 'https://viralaty.com/faq' },
  openGraph: {
    title: 'FAQ — ChatGPT Ads & AI Advertising | Viralaty',
    description: 'Common questions about ChatGPT Ads, pricing, setup, and working with Viralaty.',
    url: 'https://viralaty.com/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
