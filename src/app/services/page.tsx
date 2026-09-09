'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

interface Service {
  id: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  useCases: string[];
  deliverables: string[];
  tiers: PricingTier[];
}

const services: Service[] = [
  {
    id: 'creative',
    label: 'Creative Production',
    title: 'Ad Creative That Converts in the AI Era',
    tagline: 'Weekly creative cadence engineered for how buyers decide in 2026.',
    description:
      'Buyers no longer scroll past ads — they ask AI assistants for recommendations. Your creative must answer the question before it is asked. We produce static, video, and conversational ad formats built around the context signals that AI ad platforms use to match your brand to high-intent queries. Every asset is tested, iterated, and replaced on a weekly cadence so your account never runs stale creative.',
    useCases: [
      'DTC brands needing a constant supply of fresh ad variants',
      'B2B companies entering AI ad channels for the first time',
      'Brands with strong products but weak creative performance',
      'Accounts where creative fatigue is killing ROAS',
    ],
    deliverables: [
      '4–8 new creative assets per week',
      'Static, video, and conversational formats',
      'Context signal copywriting for each asset',
      'Weekly creative performance debrief',
      'Creative brief and brand guidelines alignment',
    ],
    tiers: [
      {
        name: 'Starter',
        price: '$1,500',
        period: '/mo',
        description: 'For brands testing AI ad creative for the first time.',
        features: ['4 static assets/week', '1 video format/week', 'Context signal copy', 'Monthly review call'],
        highlight: false,
        cta: 'Get Started',
      },
      {
        name: 'Growth',
        price: '$3,200',
        period: '/mo',
        description: 'For scaling brands that need volume and iteration speed.',
        features: ['8 static assets/week', '3 video formats/week', 'A/B creative variants', 'Weekly review call', 'Creative strategy doc'],
        highlight: true,
        cta: 'Most Popular',
      },
      {
        name: 'Scale',
        price: 'Custom',
        period: '',
        description: 'For high-volume accounts and multi-brand portfolios.',
        features: ['Unlimited creative volume', 'Dedicated creative team', 'Multi-format production', 'Daily Slack access', 'Quarterly brand audit'],
        highlight: false,
        cta: 'Talk to Us',
      },
    ],
  },
  {
    id: 'launch',
    label: 'Campaign Launch',
    title: 'Full-Stack Campaign Setup Done Right',
    tagline: 'From zero to live — with every technical layer configured correctly.',
    description:
      'Most agencies skip the infrastructure. We do not. A campaign launched on a weak technical foundation will never reach its potential, no matter how good the creative. We handle advertiser verification, context signal architecture, brand-term defence, product feed campaigns, pixel configuration, and Conversions API setup — then hand you a launch checklist your internal team can verify independently.',
    useCases: [
      'Brands launching on AI ad platforms for the first time',
      'Companies migrating from legacy ad platforms',
      'E-commerce brands with product catalogues needing feed campaigns',
      'Businesses that have been burned by poor account setup before',
    ],
    deliverables: [
      'Advertiser verification and account structure',
      'Context signal architecture document',
      'Brand-term defence campaign setup',
      'Product feed campaign configuration',
      'Pixel + Conversions API dual-tracking',
      'Independent launch verification checklist',
    ],
    tiers: [
      {
        name: 'Setup Only',
        price: '$2,800',
        period: ' one-time',
        description: 'Full technical setup with handoff to your team.',
        features: ['Account + verification setup', 'Context signal architecture', 'Pixel + CAPI configuration', 'Launch checklist', '2-week support window'],
        highlight: false,
        cta: 'Get Started',
      },
      {
        name: 'Launch + Manage',
        price: '$4,500',
        period: '/mo',
        description: 'Setup plus the first 90 days of active management.',
        features: ['Everything in Setup Only', '90-day management included', 'Weekly optimisation calls', 'Creative iteration', 'Full attribution setup'],
        highlight: true,
        cta: 'Recommended',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Multi-market or multi-brand launch programmes.',
        features: ['Multi-market setup', 'Multi-brand architecture', 'Dedicated launch team', 'Custom SLA', 'Executive reporting'],
        highlight: false,
        cta: 'Talk to Us',
      },
    ],
  },
  {
    id: 'optimisation',
    label: 'Optimisation & Scaling',
    title: 'Daily Management That Protects Your Unit Economics',
    tagline: 'Scale spend without breaking CAC — hands-on, every day.',
    description:
      'Scaling ad spend is easy. Scaling it profitably is not. We manage your account daily, iterate creative weekly, and transition from click-based to conversion-optimised (oCPC) bidding the moment your event volume supports it. Every scaling decision is made with your target CAC or ROAS as the constraint — not the platform\'s default optimisation goal.',
    useCases: [
      'Brands spending $10k+/mo that need professional daily management',
      'Accounts that have plateaued and need a fresh scaling strategy',
      'Companies transitioning from CPC to oCPC bidding',
      'Brands where internal teams lack AI ad platform expertise',
    ],
    deliverables: [
      'Daily account monitoring and bid management',
      'Weekly creative iteration and replacement',
      'oCPC transition planning and execution',
      'Budget pacing and spend protection',
      'Weekly written performance analysis',
      'Monthly strategy review and roadmap',
    ],
    tiers: [
      {
        name: 'Core',
        price: '$2,500',
        period: '/mo',
        description: 'For accounts spending $5k–$20k/mo on AI ads.',
        features: ['Daily account management', 'Weekly creative iteration', 'Bi-weekly calls', 'Monthly report', 'Slack access (business hours)'],
        highlight: false,
        cta: 'Get Started',
      },
      {
        name: 'Performance',
        price: '$5,000',
        period: '/mo',
        description: 'For accounts spending $20k–$100k/mo.',
        features: ['Everything in Core', 'oCPC transition management', 'Weekly strategy calls', 'Creative production included', 'Priority Slack access'],
        highlight: true,
        cta: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For accounts spending $100k+/mo or multi-brand.',
        features: ['Dedicated account team', 'Custom reporting cadence', 'Executive QBRs', 'Multi-brand management', '24/7 Slack access'],
        highlight: false,
        cta: 'Talk to Us',
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting & Intelligence',
    title: 'Attribution That Connects Spend to Revenue',
    tagline: 'Full-funnel visibility — from impression to invoice.',
    description:
      'Platform dashboards lie. They show you what the platform wants you to see. We build attribution that connects your ad spend to your actual revenue system — dynamic URL macros joined to your analytics, monthly reconciliation against your CRM or revenue data, and weekly written analysis you can share directly with your CFO or board. No more guessing whether your ads are working.',
    useCases: [
      'Brands where platform-reported ROAS does not match actual revenue',
      'Companies with complex attribution across multiple channels',
      'Businesses that need board-ready performance reporting',
      'Accounts where the finance team questions ad spend ROI',
    ],
    deliverables: [
      'Dynamic URL macro setup and QA',
      'Analytics platform integration and validation',
      'Monthly revenue reconciliation report',
      'Weekly written performance analysis',
      'Custom attribution model documentation',
      'Stakeholder-ready dashboard setup',
    ],
    tiers: [
      {
        name: 'Attribution Setup',
        price: '$1,800',
        period: ' one-time',
        description: 'Technical attribution infrastructure, built once.',
        features: ['URL macro configuration', 'Analytics integration', 'Attribution model setup', 'QA and validation', 'Handoff documentation'],
        highlight: false,
        cta: 'Get Started',
      },
      {
        name: 'Reporting Retainer',
        price: '$1,200',
        period: '/mo',
        description: 'Ongoing analysis and stakeholder reporting.',
        features: ['Weekly written analysis', 'Monthly revenue reconciliation', 'Stakeholder dashboard', 'Quarterly attribution audit', 'Slack access'],
        highlight: true,
        cta: 'Most Popular',
      },
      {
        name: 'Full Intelligence',
        price: 'Custom',
        period: '',
        description: 'Custom data infrastructure for complex businesses.',
        features: ['Custom data pipeline', 'Multi-channel attribution', 'Executive reporting suite', 'Data warehouse integration', 'Dedicated analyst'],
        highlight: false,
        cta: 'Talk to Us',
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0].id);
  const current = services.find((s) => s.id === activeService) ?? services[0];

  return (
    <div className="bg-[#FAFAF8] dark:bg-[#0a0a0a] min-h-screen">
      {/* Navbar */}
      <div className="bg-white dark:bg-[#111111] border-b border-black/5 dark:border-white/10">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-12 pt-16 pb-12 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>
            What We Deliver
          </div>
          <h1
            className="uppercase font-semibold tracking-tight leading-[0.93] text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Services built for<br />AI-native advertising.
          </h1>
          <p className="mt-6 text-base text-white/60 max-w-xl leading-relaxed">
            Four integrated service lines that cover every layer of a high-performance AI ad programme — from creative production to full-funnel attribution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition ${
                  activeService === s.id
                    ? 'text-white' :'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
                style={activeService === s.id ? { background: '#5E0ED7' } : {}}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail */}
      <section className="px-5 sm:px-8 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Description */}
            <div>
              <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{ color: '#5E0ED7' }}>
                {current.label}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
                {current.title}
              </h2>
              <p className="mt-3 text-sm font-semibold text-black/50 dark:text-white/40 tracking-wide">{current.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-black/70 dark:text-white/60">{current.description}</p>

              {/* Use Cases */}
              <div className="mt-8">
                <h3 className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-4">Who This Is For</h3>
                <ul className="space-y-2">
                  {current.useCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-2.5 text-sm text-black/70 dark:text-white/60">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#5E0ED715', color: '#5E0ED7' }}>
                        <CheckIcon />
                      </span>
                      {uc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="mt-8">
                <h3 className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-4">What You Get</h3>
                <ul className="space-y-2">
                  {current.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-black/70 dark:text-white/60">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#5E0ED715', color: '#5E0ED7' }}>
                        <CheckIcon />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Pricing Tiers */}
            <div className="space-y-4">
              <h3 className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-6">Pricing Tiers</h3>
              {current.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-6 border transition ${
                    tier.highlight
                      ? 'bg-black text-white border-black dark:border-white/10' :'bg-white dark:bg-[#1a1a1a] text-black dark:text-white border-black/8 dark:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-widest uppercase font-semibold opacity-50">{tier.name}</div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-semibold">{tier.price}</span>
                        {tier.period && <span className="text-sm opacity-50">{tier.period}</span>}
                      </div>
                    </div>
                    {tier.highlight && (
                      <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ background: '#5E0ED7', color: '#fff' }}>
                        {tier.cta}
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-xs leading-relaxed ${tier.highlight ? 'text-white/60' : 'text-black/50 dark:text-white/45'}`}>
                    {tier.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-xs ${tier.highlight ? 'text-white/80' : 'text-black/70 dark:text-white/60'}`}>
                        <span style={{ color: '#5E0ED7' }}><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition hover:opacity-80 ${
                      tier.highlight ? 'text-white' : ''
                    }`}
                    style={!tier.highlight ? { color: '#5E0ED7' } : {}}
                  >
                    {tier.price === 'Custom' ? 'Talk to Us' : 'Book a Call'} <ArrowUpRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-5 sm:px-8 md:px-12 py-16 bg-black dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white leading-tight">
              Not sure which service fits?
            </h2>
            <p className="mt-2 text-sm text-white/50">Book a 30-minute strategy call and we will map the right programme to your goals.</p>
          </div>
          <Link
            href="/booking"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white tracking-widest uppercase transition hover:opacity-90"
            style={{ background: '#5E0ED7' }}
          >
            Book a Strategy Call <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
