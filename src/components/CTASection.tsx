'use client';
import React from 'react';
import Link from 'next/link';
import { trackEvent } from '@/components/Analytics';

const ArrowUpRight = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export default function CTASection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-black dark:bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2
              className="uppercase tracking-tight font-semibold leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
            >
              Activate your<br />
              <span style={{ color: '#5E0ED7' }}>AI ad</span><br />
              channel.
            </h2>
            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/70">
              First campaign live in 7 to 14 days. The auction is still under-priced because most advertisers have not entered it yet — and that is a window, not a permanent condition. Every month you delay, the cost-per-click you inherit is higher than it needed to be.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/booking"
              onClick={() => trackEvent('cta_click', { source: 'cta_section', section: 'bottom_cta' })}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-white"
              style={{ background: '#5E0ED7' }}
            >
              Book a Call <ArrowUpRight size={18} />
            </Link>
            <div className="mt-6 max-w-[18rem] space-y-3 text-sm leading-relaxed text-white/60">
              <p className="font-semibold text-white/80">30 minutes, no slides. Here is what we cover:</p>
              <ul className="space-y-2">
                <li>1. Your offer, unit economics, and current acquisition cost.</li>
                <li>2. Whether your buyers are on ad-eligible tiers — some are not.</li>
                <li>3. A brand-term exposure check: who is already targeting your name inside AI platforms.</li>
                <li>4. A realistic number, a timeline, and a direct yes or no.</li>
              </ul>
              <p className="pt-1 text-white/45">
                We respond within one business day. About one in four enquiries gets told to wait — we would rather say it now than invoice for it later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
