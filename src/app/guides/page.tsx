'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

interface Guide {
  slug: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  featured?: boolean;
}

const guides: Guide[] = [
  {
    slug: 'what-are-ai-ads',
    category: 'Fundamentals',
    title: 'What Are AI Ads?',
    description: 'The complete introduction to advertising inside AI platforms — how it works, why it is different, and why it matters for performance advertisers right now.',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'what-are-ai-ads#ads-manager-setup',
    category: 'Setup',
    title: 'Ads Manager Setup Guide',
    description: 'Step-by-step walkthrough of the ChatGPT Ads Manager — from account verification to your first live campaign.',
    readTime: '10 min read',
    featured: true,
  },
  {
    slug: 'what-are-ai-ads#context-signals',
    category: 'Strategy',
    title: 'Context Signals Explained',
    description: 'The most important and least understood element of AI advertising. Learn how to write context signals that match your ad to the right conversations.',
    readTime: '7 min read',
    featured: true,
  },
  {
    slug: 'what-are-ai-ads#cost-pricing',
    category: 'Budgeting',
    title: 'AI Ads Cost & Pricing',
    description: 'Current CPMs, CPC rates, minimum budgets, and how to think about total investment for a managed AI Ads programme.',
    readTime: '6 min read',
  },
  {
    slug: 'what-are-ai-ads#conversion-campaigns',
    category: 'Campaigns',
    title: 'Conversion Campaigns (oCPC)',
    description: 'How oCPC campaigns work, what they require, and how to move from traffic campaigns to conversion-optimised campaigns.',
    readTime: '9 min read',
  },
  {
    slug: 'what-are-ai-ads#conversion-tracking',
    category: 'Tracking',
    title: 'Conversion Tracking Setup',
    description: 'Pixel vs. CAPI vs. third-party integrations — how to set up conversion tracking correctly and avoid the most common mistakes.',
    readTime: '8 min read',
  },
  {
    slug: 'what-are-ai-ads#choosing-agency',
    category: 'Agency',
    title: 'Choosing an AI Ads Agency',
    description: 'Five questions to ask before hiring any agency to manage your AI Ads — and the answers that separate real expertise from marketing claims.',
    readTime: '5 min read',
  },
];

const categoryColors: Record<string, string> = {
  Fundamentals: '#5E0ED7',
  Setup: '#0891b2',
  Strategy: '#059669',
  Budgeting: '#d97706',
  Campaigns: '#dc2626',
  Tracking: '#7c3aed',
  Agency: '#be185d',
};

export default function GuidesPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const featured = guides.filter((g) => g.featured);
  const rest = guides.filter((g) => !g.featured);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-12 pt-20 pb-16 max-w-6xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
            AI Advertising Guides
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
            Learn AI Advertising.<br />
            <span style={{ color: '#5E0ED7' }}>From First Principles.</span>
          </h1>
          <p className="mt-5 text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Practical guides written by practitioners — not content marketers. Everything you need to understand, set up, and scale AI Ads for your brand.
          </p>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 max-w-6xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-6">Start Here</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/${guide.slug}`}
              className="group block p-6 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3 hover:border-[#5E0ED7]/40 hover:shadow-lg hover:shadow-[#5E0ED7]/5 transition-all duration-300"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4 text-white"
                style={{ background: categoryColors[guide.category] ?? '#5E0ED7' }}
              >
                {guide.category}
              </div>
              <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-[#5E0ED7] transition-colors duration-200">
                {guide.title}
              </h3>
              <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-5">{guide.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/40">{guide.readTime}</span>
                <span className="text-[#5E0ED7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Guides */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-6">All Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/${guide.slug}`}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3 hover:border-[#5E0ED7]/40 transition-all duration-300"
            >
              <div
                className="w-2 h-2 rounded-full mt-2 shrink-0"
                style={{ background: categoryColors[guide.category] ?? '#5E0ED7' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1">
                  {guide.category}
                </div>
                <h3 className="text-base font-bold leading-snug mb-1.5 group-hover:text-[#5E0ED7] transition-colors duration-200">
                  {guide.title}
                </h3>
                <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed">{guide.description}</p>
                <span className="text-xs text-black/35 dark:text-white/35 mt-2 block">{guide.readTime}</span>
              </div>
              <span className="text-[#5E0ED7] shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-black dark:bg-white/5 border border-white/5 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want us to run AI Ads for you?</h2>
            <p className="text-white/60 max-w-lg leading-relaxed">
              Skip the learning curve. Viralaty handles strategy, creative, setup, and optimisation — so you can focus on your business.
            </p>
          </div>
          <a
            href="https://calendly.com/tarunkapoor/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white whitespace-nowrap"
            style={{ background: '#5E0ED7' }}
          >
            Book a Call <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
