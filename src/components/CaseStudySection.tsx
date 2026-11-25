import React from 'react';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export default function CaseStudySection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Proven Results</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              What an AI ad channel<br />delivers inside 90 days.
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-1 text-sm font-semibold tracking-widest uppercase shrink-0"
            style={{ color: '#5E0ED7' }}
            href="/case-studies"
          >
            All case studies <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-12 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="grid md:grid-cols-12">
            {/* Left: Case Study Content */}
            <div className="md:col-span-7 p-8 md:p-12 bg-white dark:bg-[#111111]">
              <div className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#5E0ED7' }}>DTC Wellness Brand</div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-black dark:text-white leading-tight">
                Breaking single-channel dependency with AI-native acquisition
              </h3>
              <div className="mt-8 space-y-6">
                <div>
                  <div className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35">Starting point</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/60">
                    A fast-growing wellness brand was generating 89% of new-customer revenue through a single paid channel. Acquisition costs had climbed 41% over eighteen months and the team needed a second compounding source of demand.
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35">What we executed</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/60">
                    We stood up an AI ad channel in parallel within 10 days. Developed a creative system anchored to high-intent buyer questions, deployed server-side conversion tracking, and gradually shifted 20% of the existing budget into the new channel as performance data validated the move.
                  </p>
                </div>
              </div>
              <blockquote className="mt-8 border-l-2 pl-5" style={{ borderColor: '#5E0ED7' }}>
                <p className="text-base md:text-lg leading-relaxed text-black dark:text-white/85 italic">
                  &ldquo;We kept treating AI ads as a test for months and got nowhere. Viralaty ran it like a real acquisition channel from the first week.&rdquo;
                </p>
                <footer className="mt-3 text-xs tracking-widest uppercase font-semibold text-black/50 dark:text-white/40">
                  VP of Growth — DTC wellness brand
                </footer>
              </blockquote>
            </div>

            {/* Right: Stats */}
            <div className="md:col-span-5 bg-black dark:bg-[#1a1a1a] text-white p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-8">
                {[
                  { value: '-34%', label: 'Blended CAC, 90 days' },
                  { value: '3.7x', label: 'ROAS on AI ad channel' },
                  { value: '+26%', label: 'New customer growth MoM' },
                ].map((stat) => (
                  <div key={stat.value}>
                    <div className="text-4xl md:text-5xl font-semibold leading-none" style={{ color: '#5E0ED7' }}>{stat.value}</div>
                    <div className="mt-2 text-xs tracking-widest uppercase font-semibold text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-white text-sm"
                  style={{ background: '#5E0ED7' }}
                >
                  Schedule a call <ArrowUpRight size={18} />
                </a>
                <p className="mt-4 text-xs leading-relaxed text-white/50">
                  30 minutes. We will apply the same 90-day framework to your margins and give you a straight answer on whether AI ads will clear your targets. Response within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-black/40 dark:text-white/30">
          Figures are from a Viralaty engagement, measured against the client&apos;s pre-engagement baseline stated above. Results vary with offer, margin, and category — see{' '}
          <a className="underline underline-offset-2" href="/case-studies">all case studies</a>{' '}for the full set.
        </p>
      </div>
    </section>
  );
}
