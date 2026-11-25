import React from 'react';

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#5E0ED7' }} aria-hidden="true">
    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
  </svg>
);

const testimonials = [
  {
    quote: 'Rahil Khan is an exceptional professional. If you want to invest in digital advertising, you can trust his judgment completely.',
    name: 'Jessica Torres',
    role: 'CRM & Sales Ops Specialist, EVEO',
    relation: 'Reported to Rahil Khan',
  },
  {
    quote: "I rarely encounter talent that stands out the way Rahil Khan does. His ability to manage complex, multi-channel programs simultaneously was unlike anything I had seen.",
    name: 'Arnav Girdhar',
    role: 'Digital Head, Miduty · ex-GroupM',
    relation: 'Same team',
  },
  {
    quote: 'Rahil Khan was invaluable. His command of paid social best practices helped us sharpen our entire acquisition approach.',
    name: 'Raksha Gupta',
    role: 'Group Head, Publicis Global Delivery · ex-Sprinklr',
    relation: 'Worked together',
  },
  {
    quote: 'Rahil Khan brings unmatched domain expertise and genuine professionalism to every engagement. I recommend him without reservation.',
    name: 'Sarvam Bansal',
    role: 'Founder & MD, Olevea',
    relation: 'Same team',
  },
  {
    quote: 'When Rahil Khan commits to a goal, he pursues it relentlessly until it is done — no excuses, no shortcuts.',
    name: 'Roy Opata Olende',
    role: 'UXR & Research Ops Leader · Zapier, The Browser Company',
    relation: 'Same team',
  },
  {
    quote: 'Rahil Khan is genuinely exceptional at performance marketing. He managed major accounts single-handedly and consistently delivered insights that moved the needle.',
    name: 'Gargi Bannerjee',
    role: 'Digital Marketing Lead · ex-WPP, IPG',
    relation: 'Same team',
  },
];

const credentials = [
  'Google Premier Partner 2024',
  'Meta Marketing Partner',
  'TikTok for Business — Strategic Agency 2023',
  'Amazon Ads Advanced Partner',
  'Shopify Partner',
  'Apple Search Ads Partner',
];

export default function TrackRecordSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#A88AFF' }}>Our History</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95]">
          The performance history<br />behind every engagement.
        </h2>
        <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-white/70">
          AI advertising is a young channel — no one has a decade of isolated results on it, and running it in isolation would be the wrong approach anyway. The numbers below come from{' '}
          <a href="https://www.conversion.is/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-white">Conversion.is</a>, our sister agency operated by the same founder: full-funnel paid programs where AI ads run alongside Meta, Google, and TikTok, with budget flowing to whichever channel is protecting margin.
        </p>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-white/15 pt-10">
          {[
            { value: '$210M+', label: 'Revenue generated for clients' },
            { value: '+263%', label: 'Average ROAS improvement' },
            { value: '220+', label: 'Brands partnered with' },
            { value: 'Since 2018', label: 'Running paid acquisition' },
          ]?.map((stat) => (
            <div key={stat?.value}>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: '#A88AFF' }}>{stat?.value}</div>
              <div className="mt-2 text-xs tracking-widest uppercase font-semibold text-white/60">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="mt-12">
          <div className="text-xs tracking-widest uppercase font-semibold text-white/50">Platform partner credentials</div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {credentials?.map((c) => (
              <li key={c} className="px-3 py-1.5 rounded-full border border-white/20 text-xs font-medium text-white/80">{c}</li>
            ))}
          </ul>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <figure key={t?.name} className="p-7 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col">
              <QuoteIcon />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                &ldquo;{t?.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="text-sm font-semibold text-white">{t?.name}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/55">{t?.role}</div>
                <div className="mt-1 text-[11px] tracking-widest uppercase text-white/35">{t?.relation}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-white/40 max-w-3xl">
          Recommendations for Rahil Khan from clients and colleagues across his career, and client results from Conversion.is — Viralaty&apos;s sister agency, founded and operated by the same practitioner. Those engagements are full-funnel paid programs in which AI ads run alongside Meta, Google, and TikTok, so the figures reflect the complete program rather than any single channel in isolation.
        </p>
      </div>
    </section>
  );
}
