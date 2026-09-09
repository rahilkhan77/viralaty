import React from 'react';

export default function OpportunitySection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>
              The Shift
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              AI is the new purchase<br />
              advisor. The ad window is open.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
            <p>
              Hundreds of millions of buyers now open an AI chat window before they open a browser tab. They describe their problem, ask for comparisons, and act on the recommendation they receive — treating it as trusted counsel rather than a search result.
            </p>
            <p className="mt-4">
              Brands that position themselves inside that conversation now will build a compounding acquisition advantage. Viralaty is the done-for-you AI advertising agency that captures this channel for you while the auction is still early and the cost-per-click is still rational.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { value: '6 markets', label: 'US · CA · AU · NZ · BR · MX*' },
            { value: 'Free + Go', label: 'User tiers shown ads' },
            { value: '$3-5', label: 'Recommended starting CPC*' },
            { value: '$60', label: 'Default CPM max bid*' },
          ]?.map((stat) => (
            <div key={stat?.value}>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: '#5E0ED7' }}>{stat?.value}</div>
              <div className="mt-2 text-xs tracking-widest uppercase font-semibold text-black/70 dark:text-white/50">{stat?.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-black/40 dark:text-white/30">
          *Source: OpenAI Help Center, <em>Ads in ChatGPT: The Basics</em> (May 2026). Recommended starting bids — actual CPCs are determined by a relevance-weighted second-price auction. Ads Manager was first available in nine markets — the US, UK, Canada, Australia, New Zealand, Japan, Korea, Brazil and Mexico — and from September 2026 is rolling out to select countries in Europe, India, the Middle East and North Africa; feature availability rolls out market by market during the beta.
        </p>
      </div>
    </section>
  );
}
