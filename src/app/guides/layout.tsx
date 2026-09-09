import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Advertising Guides — ChatGPT Ads Resources | Viralaty',
  description: 'Free guides on ChatGPT advertising, AI ad campaigns, conversion tracking, context signals, and scaling with AI-native ad platforms.',
  alternates: { canonical: 'https://viralaty.com/guides' },
  openGraph: {
    title: 'AI Advertising Guides — Viralaty',
    description: 'Free guides on ChatGPT advertising, AI ad campaigns, and scaling with AI-native platforms.',
    url: 'https://viralaty.com/guides',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
