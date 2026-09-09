import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'What Are AI Ads? — ChatGPT Advertising Guide | Viralaty',
  description: 'Learn everything about AI ads and ChatGPT advertising: setup guides, context signals, oCPC campaigns, conversion tracking, and how to choose an AI ads agency.',
  alternates: { canonical: 'https://viralaty.com/what-are-ai-ads' },
  openGraph: {
    title: 'What Are AI Ads? — Viralaty',
    description: 'Complete guide to ChatGPT advertising: setup, context signals, conversion tracking, and more.',
    url: 'https://viralaty.com/what-are-ai-ads',
  },
};

export default function WhatAreAIAdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
