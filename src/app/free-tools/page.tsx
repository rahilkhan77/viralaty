'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

interface Tool {
  id: string;
  category: string;
  name: string;
  description: string;
  what: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    id: 'context-signal-builder',
    category: 'Creative',
    name: 'Context Signal Builder',
    description: 'Generate a structured context signal document for your AI Ads campaign.',
    what: 'Answer 8 questions about your product and we will output a formatted context signal document ready to upload to the ChatGPT Ads Manager.',
    comingSoon: true,
  },
  {
    id: 'cpa-calculator',
    category: 'Budgeting',
    name: 'AI Ads CPA Calculator',
    description: 'Estimate your target CPA and required budget for an oCPC campaign.',
    what: 'Input your average order value, target ROAS, and conversion rate to calculate the CPA target and minimum daily budget for your campaign.',
    comingSoon: true,
  },
  {
    id: 'creative-brief',
    category: 'Creative',
    name: 'AI Ad Creative Brief Generator',
    description: 'Build a complete creative brief for your AI Ads campaign in under 5 minutes.',
    what: 'Structured prompts that help you define your audience, message, format, and context signals before briefing your creative team.',
    comingSoon: true,
  },
  {
    id: 'budget-planner',
    category: 'Budgeting',
    name: 'Monthly Budget Planner',
    description: 'Plan your AI Ads budget across campaign types and objectives.',
    what: 'Allocate budget across Awareness, Traffic, and Conversion campaigns based on your funnel stage and growth goals.',
    comingSoon: true,
  },
  {
    id: 'conversion-audit',
    category: 'Tracking',
    name: 'Conversion Tracking Audit Checklist',
    description: 'A 12-point checklist to verify your conversion tracking is set up correctly.',
    what: 'Download the checklist and work through each item to confirm your pixel, CAPI, and event tracking are firing correctly before you spend a dollar.',
    comingSoon: false,
  },
  {
    id: 'agency-scorecard',
    category: 'Agency',
    name: 'AI Ads Agency Scorecard',
    description: 'Score any AI Ads agency against 15 criteria before you sign a contract.',
    what: 'A structured evaluation framework covering access, expertise, creative process, reporting, and fee structure — so you can compare agencies objectively.',
    comingSoon: false,
  },
];

const categoryColors: Record<string, string> = {
  Creative: '#5E0ED7',
  Budgeting: '#d97706',
  Tracking: '#7c3aed',
  Agency: '#be185d',
};

export default function FreeToolsPage() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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
            Free Tools
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
            Tools for AI Advertisers.<br />
            <span style={{ color: '#5E0ED7' }}>No Signup Required.</span>
          </h1>
          <p className="mt-5 text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Practical calculators, checklists, and generators built for brands running or planning AI Ads campaigns. Free to use, no email required.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <div
              key={tool.id}
              className="group relative flex flex-col p-6 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3 hover:border-[#5E0ED7]/40 hover:shadow-lg hover:shadow-[#5E0ED7]/5 transition-all duration-300 cursor-pointer"
              style={{
                transitionDelay: `${i * 50}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}
              onClick={() => setActiveId(activeId === tool.id ? null : tool.id)}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase text-white"
                  style={{ background: categoryColors[tool.category] ?? '#5E0ED7' }}
                >
                  {tool.category}
                </div>
                {tool.comingSoon && (
                  <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40">
                    Coming Soon
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-[#5E0ED7] transition-colors duration-200">
                {tool.name}
              </h3>
              <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed flex-1">{tool.description}</p>

              {/* Expanded detail */}
              {activeId === tool.id && (
                <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/8">
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{tool.what}</p>
                  {!tool.comingSoon ? (
                    <a
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E0ED7] hover:opacity-70 transition-opacity"
                    >
                      Request access <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <a
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black/40 dark:text-white/40"
                    >
                      Notify me when live
                    </a>
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-black/35 dark:text-white/35">
                  {activeId === tool.id ? 'Click to collapse' : 'Click to learn more'}
                </span>
                <span
                  className="text-[#5E0ED7] transition-transform duration-200"
                  style={{ transform: activeId === tool.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Request a tool */}
        <div className="mt-12 p-8 md:p-10 rounded-3xl bg-black dark:bg-white/5 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Missing a tool you need?</h2>
            <p className="text-white/60 leading-relaxed max-w-lg">
              Tell us what would help you most. We build tools based on what practitioners actually need — not what looks good on a landing page.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase text-white whitespace-nowrap"
            style={{ background: '#5E0ED7' }}
          >
            Request a Tool <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
