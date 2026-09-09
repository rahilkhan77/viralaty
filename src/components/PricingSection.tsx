'use client';
import React, { useState } from 'react';
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

interface Plan {
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'STARTER',
    price: '$499',
    priceNote: '/month',
    tagline: 'Launch your first AI ad campaign with full setup and management.',
    features: [
      'Campaign setup',
      'Campaign management',
      'Basic optimization',
      'Monthly report',
    ],
    highlighted: false,
  },
  {
    name: 'GROWTH',
    price: '$999',
    priceNote: '/month',
    tagline: 'Scale across multiple campaigns with weekly optimization and creative testing.',
    features: [
      'Everything in Starter',
      'Multiple campaigns',
      'Creative + copy testing',
      'Conversion tracking',
      'Weekly optimization & reporting',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'SCALE',
    price: '$1,999+',
    priceNote: '/month',
    tagline: 'High-budget accounts with a dedicated strategist and custom reporting.',
    features: [
      'Everything in Growth',
      'High-budget accounts',
      'Advanced optimization',
      'Dedicated strategist',
      'Custom reporting',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleCTAClick = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', { name: 'pricing_cta_click', properties: { plan: planName } });
    }
  };

  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-[#FAFAF8] dark:bg-[#111111] overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-18">
          <div className="md:col-span-6">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>
              Pricing
            </div>
            <h2
              className="font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              Flat retainer.<br />
              <span style={{ color: '#5E0ED7' }}>No percentage</span><br />
              of spend.
            </h2>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <p className="text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              Our fee is fixed — not tied to your media budget. That means our incentive is always campaign performance, not inflating your spend.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/50 dark:text-white/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              Ad spend is separate and paid directly by the client.
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'text-white shadow-2xl shadow-purple-900/30'
                  : 'bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-black dark:text-white'
              } ${hovered === i && !plan.highlighted ? 'border-black/20 dark:border-white/20 -translate-y-1' : ''}`}
              style={
                plan.highlighted
                  ? { background: 'linear-gradient(145deg, #5E0ED7 0%, #3d0a8f 60%, #2a0660 100%)' }
                  : {}
              }
            >
              {/* Recommended badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white text-[#5E0ED7] shadow-md shadow-purple-900/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7 sm:p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div className={`text-xs tracking-widest uppercase font-semibold mb-5 ${plan.highlighted ? 'text-white/60' : 'text-black/40 dark:text-white/40'}`}>
                  {plan.name}
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className={`font-semibold leading-none tracking-tight ${plan.highlighted ? 'text-white' : 'text-black dark:text-white'}`}
                    style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-white/60' : 'text-black/50 dark:text-white/50'}`}>
                    {plan.priceNote}
                  </span>
                </div>

                {/* Tagline */}
                <p className={`text-sm leading-relaxed mb-7 ${plan.highlighted ? 'text-white/70' : 'text-black/60 dark:text-white/55'}`}>
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div className={`border-t mb-7 ${plan.highlighted ? 'border-white/15' : 'border-black/10 dark:border-white/10'}`} />

                {/* Features */}
                <ul className="space-y-3.5 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.highlighted
                            ? 'bg-white/15 text-white' :'bg-black/5 dark:bg-white/10 text-black dark:text-white'
                        }`}
                      >
                        <CheckIcon />
                      </span>
                      <span className={`text-sm leading-snug ${plan.highlighted ? 'text-white/85' : 'text-black/75 dark:text-white/70'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/booking"
                  onClick={() => handleCTAClick(plan.name)}
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-white text-[#5E0ED7] hover:bg-white/90'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80'
                  }`}
                >
                  Book a Call <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed max-w-xl">
            All plans are month-to-month after an initial 90-day term with 30 days&apos; notice. You retain full ownership of your ad account, pixel, and data at all times.
          </p>
          <Link
            href="/booking"
            onClick={() => handleCTAClick('not_sure')}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#5E0ED7' }}
          >
            Not sure which plan? Talk to us <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
