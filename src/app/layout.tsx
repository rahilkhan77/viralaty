import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import Analytics from '@/components/Analytics';
import StructuredData from '@/components/StructuredData';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://viralaty.com'),
  title: {
    default: 'Viralaty — ChatGPT Ads Agency | Done-For-You AI Ad Management',
    template: '%s | Viralaty',
  },
  description: 'Viralaty is a done-for-you ChatGPT Ads agency. We build, launch, and scale AI ad campaigns for DTC, SaaS, and high-ticket brands. First campaign live in 7–14 days.',
  keywords: ['ChatGPT Ads', 'AI advertising agency', 'OpenAI Ads Manager', 'ChatGPT advertising', 'AI ads management', 'done-for-you ads', 'Viralaty'],
  authors: [{ name: 'Viralaty' }],
  creator: 'Viralaty',
  publisher: 'Viralaty',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://viralaty.com',
    siteName: 'Viralaty',
    title: 'Viralaty — ChatGPT Ads Agency | Done-For-You AI Ad Management',
    description: 'Done-for-you ChatGPT Ads agency. We engineer, deploy, and scale AI ad campaigns for DTC, SaaS, and high-ticket brands.',
    images: [
      {
        url: '/assets/images/viralaty-logo-1788526949274.png',
        width: 1200,
        height: 630,
        alt: 'Viralaty — ChatGPT Ads Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viralaty — ChatGPT Ads Agency',
    description: 'Done-for-you ChatGPT Ads agency. First campaign live in 7–14 days.',
    images: ['/assets/images/viralaty-logo-1788526949274.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://viralaty.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </AuthProvider>
        <StructuredData />
</body>
    </html>
  );
}
