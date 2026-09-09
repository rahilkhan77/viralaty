import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Viralaty — ChatGPT Ads Agency',
  description: 'Get in touch with Viralaty. Tell us about your brand and AI advertising goals. We respond within one business day.',
  alternates: { canonical: 'https://viralaty.com/contact' },
  openGraph: {
    title: 'Contact Viralaty — ChatGPT Ads Agency',
    description: 'Get in touch with Viralaty. We respond within one business day.',
    url: 'https://viralaty.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
