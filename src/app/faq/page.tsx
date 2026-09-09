'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  label: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    label: 'ChatGPT Ads — The Basics',
    items: [
      {
        q: 'What are ChatGPT Ads?',
        a: 'ChatGPT Ads are sponsored placements that appear inside ChatGPT conversations. When a user asks a question that matches your campaign\'s context signals, your ad appears as a contextually relevant recommendation. Unlike banner ads, they appear as part of the answer — which is why engagement rates are significantly higher than traditional display formats.',
      },
      {
        q: 'Are ChatGPT Ads available to all advertisers?',
        a: 'Not yet. As of 2026, ChatGPT Ads Manager access is invite-only or available through certified agency partners. Viralaty has direct access and can onboard clients without a waitlist.',
      },
      {
        q: 'How are AI Ads different from Google or Meta ads?',
        a: 'Google and Meta ads target users based on demographics, interests, and browsing behaviour. AI Ads target based on intent expressed in natural language — the actual question a user is asking right now. This makes them significantly more relevant at the moment of decision, which is why early conversion rates are strong.',
      },
      {
        q: 'What industries work best with AI Ads?',
        a: 'Any industry where buyers research before purchasing. E-commerce, SaaS, financial services, travel, health and wellness, and B2B services have all shown strong early results. Industries with complex purchase decisions — where buyers ask a lot of questions — tend to see the best performance.',
      },
    ],
  },
  {
    label: 'Pricing & Budgets',
    items: [
      {
        q: 'How much do AI Ads cost?',
        a: 'Current CPMs range from $8–$25 depending on industry and creative quality. Conversion campaigns (oCPC) are priced on a target CPA basis. Minimum daily budgets start at $20 for awareness campaigns and $50 for conversion campaigns.',
      },
      {
        q: 'What is Viralaty\'s fee structure?',
        a: 'We charge a flat monthly retainer based on scope — not a percentage of ad spend. This means our incentives are aligned with your results, not with spending more of your budget. Retainers start at $2,500/month for managed campaigns.',
      },
      {
        q: 'What is the minimum total investment to get started?',
        a: 'We recommend a minimum of $3,000/month total (agency fee + ad spend) to give the algorithm enough data to optimise and to produce meaningful results. Brands spending less than this tend to see slower learning and less reliable data.',
      },
      {
        q: 'Do you offer performance-based pricing?',
        a: 'We do not offer pure performance-based pricing (e.g. pay per lead). Our flat retainer model is designed to keep our incentives aligned with long-term performance, not short-term volume. We are happy to discuss milestone-based bonuses for clients with clear, measurable goals.',
      },
    ],
  },
  {
    label: 'Account Setup',
    items: [
      {
        q: 'How long does it take to get an account live?',
        a: 'Most accounts are live within 5–7 business days of onboarding. This includes account verification, campaign structure setup, context signal creation, creative production, and conversion tracking installation.',
      },
      {
        q: 'Do I need to have existing ad accounts?',
        a: 'No. We set up the ChatGPT Ads Manager account from scratch as part of onboarding. If you have existing Google or Meta accounts, we will review them to inform our AI Ads strategy — but they are not required.',
      },
      {
        q: 'What do I need to provide to get started?',
        a: 'We need access to your website, your brand guidelines, information about your product and target customer, and your conversion tracking setup (or access to install it). We handle everything else.',
      },
    ],
  },
  {
    label: 'Targeting',
    items: [
      {
        q: 'How does targeting work in AI Ads?',
        a: 'AI Ads targeting is intent-based. You define the types of questions and conversations your ad should appear in — not the demographics of the user. This is done through context signals: structured documents that describe your product, your audience, and the problems you solve.',
      },
      {
        q: 'Can I target specific geographies?',
        a: 'Yes. Geographic targeting is available at the country and region level. City-level targeting is available in select markets. Europe-specific campaigns require a separate account setup due to GDPR compliance requirements.',
      },
      {
        q: 'Can I exclude certain audiences or topics?',
        a: 'Yes. Brand safety controls allow you to exclude specific topic categories, competitor brand mentions, and sensitive content areas. We configure exclusions as part of every campaign setup.',
      },
    ],
  },
  {
    label: 'Conversion Tracking',
    items: [
      {
        q: 'Do I need conversion tracking to run AI Ads?',
        a: 'You can run awareness and traffic campaigns without conversion tracking. But for conversion-optimised campaigns (oCPC) — which deliver the best results — conversion tracking is mandatory. Without it, the algorithm cannot optimise for results.',
      },
      {
        q: 'What tracking options are available?',
        a: 'Three options: pixel tracking (simplest, install a JavaScript snippet), Conversions API / CAPI (server-side, more reliable), and third-party integrations for Shopify, WooCommerce, and major CRMs. We recommend CAPI for any account spending more than $5,000/month.',
      },
      {
        q: 'What if I already have Google or Meta pixels installed?',
        a: 'Existing pixels do not interfere with the OpenAI pixel. You will need to install the OpenAI pixel separately. If you are using a tag manager, we can add the OpenAI pixel through your existing container.',
      },
    ],
  },
  {
    label: 'Campaign Management',
    items: [
      {
        q: 'How often do you update campaigns?',
        a: 'We review campaign performance weekly and make optimisations based on what the data shows. Creative is refreshed on a weekly cadence. Bid strategies and budget allocations are adjusted as the algorithm learns.',
      },
      {
        q: 'How do you report on results?',
        a: 'You receive a weekly performance summary and a monthly deep-dive report. Reports include spend, impressions, clicks, conversions, CPA, ROAS, and creative performance breakdown. We also flag any anomalies or opportunities we identify.',
      },
      {
        q: 'What happens if performance drops?',
        a: 'We investigate immediately. The most common causes are creative fatigue, algorithm changes, or external factors (seasonality, competitor activity). We diagnose the root cause and implement a fix within 48 hours of identifying the issue.',
      },
    ],
  },
  {
    label: 'Results & Expectations',
    items: [
      {
        q: 'How long before I see results?',
        a: 'The first 2–4 weeks are the learning phase. During this period, the algorithm is gathering data and performance may be inconsistent. After the learning phase, results typically stabilise and improve week over week. Most clients see their best performance in months 2–3.',
      },
      {
        q: 'What results can I expect?',
        a: 'We do not publish benchmark numbers because results vary significantly by industry, product, and creative quality. What we can say: early movers in AI Ads are seeing CPAs 30–60% lower than equivalent Google or Meta campaigns. This gap will narrow as the channel matures.',
      },
      {
        q: 'Do you guarantee results?',
        a: 'No. Any agency that guarantees specific results is either lying or has not thought carefully about what they are promising. We guarantee our process, our expertise, and our commitment to your account. We do not guarantee outcomes we cannot control.',
      },
    ],
  },
];

export default function FAQPage() {
  const [visible, setVisible] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-12 pt-20 pb-16 max-w-4xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
            FAQ
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Straight answers to the questions we hear most often — about AI Ads, our process, pricing, and what to expect.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-4xl mx-auto">
        <div className="space-y-12">
          {faqData.map((category, ci) => (
            <div key={ci}>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-5 pb-3 border-b border-black/8 dark:border-white/8">
                {category.label}
              </h2>
              <div className="space-y-2">
                {category.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={key}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-[#5E0ED7]/30 bg-[#5E0ED7]/3 dark:bg-[#5E0ED7]/5'
                          : 'border-black/8 dark:border-white/8 bg-white dark:bg-white/3'
                      }`}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-semibold leading-snug">{item.q}</span>
                        <span
                          className="shrink-0 w-6 h-6 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center transition-transform duration-300"
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-black dark:bg-white/5 border border-white/5 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto leading-relaxed">
            We are happy to answer anything not covered here. Reach out directly or book a call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:hello@viralaty.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              hello@viralaty.com
            </a>
            <a
              href="https://calendly.com/tarunkapoor/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase text-white"
              style={{ background: '#5E0ED7' }}
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
