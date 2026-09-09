import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Dashboard | Viralaty Admin',
  description: 'Real-time analytics: page views, CTA clicks, form submissions, conversion funnel, and lead source breakdown.',
  robots: { index: false, follow: false },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
