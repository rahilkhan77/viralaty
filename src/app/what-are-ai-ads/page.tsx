'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

const sections = [
  {
    id: 'what-are-ai-ads',
    label: 'What Are AI Ads?',
    title: 'What Are AI Ads?',
    content: [
      'AI Ads are a new category of paid advertising that runs inside AI-native platforms — most notably ChatGPT, which began rolling out its Ads Manager to select advertisers in 2025. Unlike traditional display or search ads, AI Ads appear as contextually relevant responses within AI conversations.',
      'When a user asks ChatGPT a question — "What\'s the best CRM for a 10-person team?" or "Which running shoes should I buy?" — AI Ads surface as sponsored answers that match the intent of the query. The ad is not a banner. It is a recommendation embedded in the answer.',
      'This fundamentally changes how advertising works. The signal is intent expressed in natural language, not a keyword typed into a search bar. The creative is a context-matched message, not a visual banner. The conversion happens because the AI recommended your product at the exact moment the buyer was deciding.',
      'Viralaty specialises exclusively in this channel. We engineer the creative, the context signals, and the campaign structure that makes AI Ads work for performance-focused brands.',
    ],
    highlight: 'AI Ads are the first new ad format in a decade that buyers actually engage with — because they appear as answers, not interruptions.',
  },
  {
    id: 'ads-manager-setup',
    label: 'Ads Manager Setup Guide',
    title: 'ChatGPT Ads Manager Setup Guide',
    content: [
      'The ChatGPT Ads Manager is OpenAI\'s self-serve advertising platform. Access is currently invite-only or available through certified agency partners. Once inside, the setup process differs significantly from Meta or Google.',
      'Step 1 — Account Verification: Your business must pass OpenAI\'s advertiser eligibility review. This includes domain verification, business category approval, and payment method setup.',
      'Step 2 — Campaign Objective: Choose between Awareness, Traffic, or Conversion objectives. Conversion campaigns (oCPC) require a verified conversion event and a minimum daily budget of $50.',
      'Step 3 — Audience Targeting: AI Ads targeting is intent-based, not demographic. You define the types of queries your ad should respond to, not the age or location of the user.',
      'Step 4 — Creative & Context Signals: Upload your ad creative alongside context signal documents — structured text files that tell the AI what your product does, who it is for, and what problems it solves.',
      'Step 5 — Conversion Tracking: Install the OpenAI pixel or use server-side event tracking via the Conversions API. Without tracking, the algorithm cannot optimise for results.',
      'Viralaty manages this entire setup process for clients. Most accounts are live within 5–7 business days of onboarding.',
    ],
    highlight: 'The biggest mistake brands make is launching without context signals. Without them, the AI has no way to match your ad to the right conversation.',
  },
  {
    id: 'context-signals',
    label: 'Context Signals Explained',
    title: 'Context Signals Explained',
    content: [
      'Context signals are the most important and least understood element of AI advertising. They are structured documents — uploaded alongside your creative — that tell the AI platform what your product is, who it serves, and what problems it solves.',
      'Think of context signals as the brief you give to a very intelligent sales assistant. The more precise and specific your brief, the better the assistant can recommend your product in the right conversation.',
      'A strong context signal document includes: your product category and subcategory, the specific problems your product solves, the language your ideal customer uses when describing those problems, your competitive differentiators, and the outcomes your customers achieve.',
      'Weak context signals lead to broad, irrelevant ad placements. Strong context signals lead to your ad appearing in exactly the conversations where buyers are deciding between you and your competitors.',
      'At Viralaty, writing context signals is a core service. We interview your team, analyse your customer reviews, and build context signal documents that are updated monthly as we learn what is working.',
    ],
    highlight: 'Context signals are to AI Ads what keywords are to Google Search — except they are written in natural language and require strategic thinking, not just keyword research.',
  },
  {
    id: 'cost-pricing',
    label: 'AI Ads Cost & Pricing',
    title: 'AI Ads Cost & Pricing',
    content: [
      'AI Ads pricing is based on a CPM (cost per thousand impressions) or CPC (cost per click) model, depending on your campaign objective. Current market rates in 2026 are significantly lower than equivalent placements on Google or Meta, because the channel is still early.',
      'Typical CPMs range from $8–$25 depending on industry, audience intent, and creative quality. Conversion-optimised campaigns (oCPC) are priced on a target CPA basis — you set the cost per acquisition you want, and the algorithm optimises toward it.',
      'Minimum budgets: Awareness campaigns start at $20/day. Traffic campaigns start at $30/day. Conversion campaigns require a minimum of $50/day to give the algorithm enough data to optimise.',
      'Agency fees vary. Viralaty charges a flat monthly retainer based on scope — not a percentage of ad spend. This means our incentives are aligned with your results, not with spending more of your budget.',
      'Total monthly investment for a managed AI Ads programme typically ranges from $3,000–$15,000 per month including ad spend and agency fees, depending on the scope of creative production and campaign management.',
    ],
    highlight: 'Early movers in AI Ads are seeing CPAs 30–60% lower than equivalent Google or Meta campaigns. This gap will narrow as the channel matures.',
  },
  {
    id: 'conversion-campaigns',
    label: 'Conversion Campaigns (oCPC)',
    title: 'Conversion Campaigns (oCPC)',
    content: [
      'oCPC stands for Optimised Cost Per Click — ChatGPT\'s conversion-focused campaign type. Unlike standard CPC campaigns that simply drive clicks, oCPC campaigns use machine learning to predict which users are most likely to convert and bid more aggressively for those impressions.',
      'To run oCPC campaigns, you need: a verified conversion event (purchase, lead form submission, or sign-up), a minimum of 50 conversion events in the past 30 days for the algorithm to learn from, and a daily budget of at least $50.',
      'The algorithm optimises in real time. In the first 7–14 days, the campaign is in a learning phase — performance may be inconsistent. After the learning phase, the algorithm stabilises and CPAs typically improve week over week.',
      'oCPC campaigns are the highest-value campaign type for performance advertisers. They require more setup, more data, and more patience — but they deliver the lowest CPAs and the most scalable results.',
      'Viralaty runs oCPC campaigns for all clients with sufficient conversion volume. For newer accounts, we start with traffic campaigns to build the data foundation before switching to oCPC.',
    ],
    highlight: 'oCPC is not a set-and-forget campaign type. It requires weekly creative refreshes, bid strategy adjustments, and conversion event monitoring to maintain performance.',
  },
  {
    id: 'conversion-tracking',
    label: 'Conversion Tracking Setup',
    title: 'Conversion Tracking Setup',
    content: [
      'Conversion tracking is non-negotiable for AI Ads. Without it, you are flying blind — you cannot optimise, you cannot prove ROI, and you cannot scale.',
      'Option 1 — Pixel Tracking: Install the OpenAI pixel on your website. Add the base pixel to every page and the conversion event pixel to your thank-you or confirmation page. This is the simplest setup and works for most e-commerce and lead generation use cases.',
      'Option 2 — Conversions API (CAPI): Server-side event tracking that sends conversion data directly from your server to OpenAI. More reliable than pixel tracking because it is not affected by ad blockers or browser privacy restrictions. Recommended for high-volume advertisers.',
      'Option 3 — Third-Party Integration: If you use Shopify, WooCommerce, or a major CRM, there are native integrations that simplify conversion tracking setup.',
      'Common mistakes: tracking the wrong event (page view instead of purchase), duplicate event firing, and not deduplicating between pixel and CAPI. Viralaty audits conversion tracking as part of every account setup.',
    ],
    highlight: 'Server-side tracking via CAPI consistently outperforms pixel-only tracking. If you are spending more than $5,000/month on AI Ads, CAPI is worth the implementation effort.',
  },
  {
    id: 'choosing-agency',
    label: 'Choosing an AI Ads Agency',
    title: 'How to Choose an AI Ads Agency',
    content: [
      'AI Ads is a new channel. Most agencies claiming expertise have run a handful of test campaigns. Before hiring any agency to manage your AI Ads, ask these questions.',
      'Question 1 — Do you have direct access to the ChatGPT Ads Manager? Many agencies are still on waitlists. If they do not have active access, they cannot run your campaigns.',
      'Question 2 — Can you show me context signal documents you have written for other clients? Context signals are the core skill in AI advertising. If an agency cannot show you examples, they do not understand the channel.',
      'Question 3 — How do you measure success? The answer should include specific metrics: CPA, ROAS, conversion rate, and cost per qualified lead — not vanity metrics like impressions or reach.',
      'Question 4 — What is your creative production process? AI Ads require weekly creative refreshes. If an agency produces creative monthly, they will not keep up with the algorithm.',
      'Question 5 — What is your fee structure? Percentage-of-spend models create an incentive to spend more, not to perform better. Flat retainers align agency incentives with client results.',
      'Viralaty was built specifically for this channel. We have direct Ads Manager access, a proven context signal methodology, and a flat-fee structure that keeps our incentives aligned with yours.',
    ],
    highlight: 'The right agency will be honest about what they do not know. AI Ads is evolving fast — anyone claiming to have all the answers is not paying close enough attention.',
  },
];

export default function WhatAreAiAdsPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const active = sections.find((s) => s.id === activeSection) ?? sections[0];

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
            Education Hub
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
            What Are AI Ads?
          </h1>
          <p className="mt-5 text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Everything you need to understand the new category of advertising running inside AI platforms — how it works, what it costs, and how to get results.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Nav */}
          <aside className="lg:w-64 shrink-0">
            <nav className="sticky top-8 flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-[#5E0ED7] text-white'
                      : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article key={active.id} className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{active.title}</h2>

              {/* Highlight */}
              <div className="mb-8 p-5 rounded-2xl border-l-4 border-[#5E0ED7] bg-[#5E0ED7]/5 dark:bg-[#5E0ED7]/10">
                <p className="text-sm font-medium leading-relaxed text-[#5E0ED7]">{active.highlight}</p>
              </div>

              {/* Body */}
              <div className="space-y-5">
                {active.content.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-black/75 dark:text-white/75">
                    {para}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-black dark:bg-white/5 border border-white/5">
                <p className="text-white dark:text-white text-lg font-semibold mb-4">
                  Ready to run AI Ads for your brand?
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase text-white"
                  style={{ background: '#5E0ED7' }}
                >
                  Book a Strategy Call <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          </main>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
