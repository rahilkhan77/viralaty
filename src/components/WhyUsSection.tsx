import React from 'react';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const differentiators = [
  {
    title: 'Flat monthly retainer, never a percentage of spend',
    desc: 'Our fee is tied to the quality of our work, not the size of your media budget — so when a campaign underperforms, the advice you receive is not quietly influenced by our own revenue.',
  },
  {
    title: 'You retain full ownership of accounts, pixels, and data',
    desc: 'We operate through permissioned access. Switching partners should never mean losing your conversion history or rebuilding attribution from scratch.',
  },
  {
    title: 'Current platform, live accounts',
    desc: 'Conversion-optimised bidding, product feed campaigns, dynamic URL macros, advanced matching — we run what is available today, not what launched eighteen months ago.',
  },
  {
    title: 'Written analysis, not a dashboard screenshot',
    desc: 'A dashboard shows you what happened. Every week you receive what we tested, what it cost, what we learned, and what we are doing next.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Why Viralaty</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              A dedicated channel<br />partner, not a vendor.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              Most agencies selling AI advertising in 2026 are repositioned paid search shops, and many are packaging organic AI visibility work under an advertising label. Four things separate a genuine operator from a repositioner — and every one is verifiable before you sign anything.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-1 text-sm font-semibold tracking-widest uppercase"
              style={{ color: '#5E0ED7' }}
              href="/guides/how-to-choose-chatgpt-ads-agency"
            >
              Read the agency selection guide <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="md:col-span-7 space-y-6">
            {differentiators.map((d) => (
              <div key={d.title} className="border-b border-black/10 dark:border-white/10 pb-6">
                <h3 className="text-lg font-semibold text-black dark:text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/55">{d.desc}</p>
              </div>
            ))}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-white text-sm"
              style={{ background: '#5E0ED7' }}
            >
              Schedule a strategy call <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
