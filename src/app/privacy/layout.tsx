import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Viralaty',
  description: "Viralaty's privacy policy. How we collect, use, and protect your personal data.",
  alternates: { canonical: 'https://viralaty.com/privacy' },
  robots: { index: true, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
