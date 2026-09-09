import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service — Viralaty',
  description: "Viralaty's terms of service. Read our terms before using our services.",
  alternates: { canonical: 'https://viralaty.com/terms' },
  robots: { index: true, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
