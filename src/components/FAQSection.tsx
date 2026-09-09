'use client';
import React, { useState } from 'react';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const faqs = [
  {
    q: 'What is an AI advertising agency?',
    a: "An AI advertising agency is a done-for-you partner that plans, builds, launches, and optimises ad campaigns inside AI-powered platforms on your behalf — covering strategy, creative production, account setup, daily optimisation, and reporting. Viralaty is a specialist AI advertising agency for DTC, SaaS, and high-ticket service brands.",
  },
  {
    q: 'Why hire an AI advertising agency instead of running campaigns in-house?',
    a: 'AI ad platforms are fast-moving channels with their own auction mechanics, creative formats, and relevance-matching systems. A specialist agency brings live-campaign experience, a consistent creative pipeline, and revenue measurement so you capture the under-priced early auction without burning budget on a learning curve. Viralaty runs the channel end-to-end on a fixed monthly retainer.',
  },
  {
    q: 'How do I run ads on AI platforms?',
    a: 'Five steps. Create an account and complete identity verification; add billing and advertiser details; build a campaign on a Reach (CPM) or Clicks (CPC) objective; write the ad unit — advertiser name, favicon, headline, copy, landing page URL, image asset — and configure context signals so the platform matches you to the right conversations; then install conversion tracking before you spend a dollar, so revenue is attributable from the first impression. Setup itself takes an afternoon. The difficulty is everything after it: bidding, creative velocity, and measurement. Viralaty handles all five steps for you.',
  },
  {
    q: 'What is OpenAI Ads Manager and how do I sign up?',
    a: "OpenAI Ads Manager — currently in beta — is OpenAI's self-serve advertising platform at ads.openai.com. It is where you create an ad account, structure campaigns and ad groups, set CPC or CPM bids, upload creative, manage product feeds, and read performance reports. Sign-up is self-serve: log in with an OpenAI account, complete identity verification and advertiser details, then add a billing method. There is no invite list and no agency certification programme.",
  },
  {
    q: 'What is the minimum spend for AI advertising?',
    a: 'OpenAI publishes no minimum spend for self-serve Ads Manager — you set a daily or lifetime budget and a max bid. Practically, Viralaty recommends at least $10,000 a month in media so the auction returns a readable signal. Below roughly $3,000 a month you will collect impressions but never enough conversions to optimise against.',
  },
  {
    q: 'How much does an AI advertising agency cost?',
    a: 'Management fees in 2026 cluster into three bands: roughly $1,500–$3,000 a month for small-business packages, $3,000–$10,000 a month for specialist and mid-market management, and custom pricing above that for enterprise multi-channel programs. That is the management fee only — media spend is separate. Viralaty charges a fixed monthly retainer from $5,000 with no percentage of ad spend, and recommends a minimum $10,000 monthly media budget so the channel produces a readable signal.',
  },
  {
    q: 'What is the difference between AI advertising and GEO?',
    a: 'An AI advertising agency buys paid placements in the auction — it operates an ad account, sets bids, ships creative, and is accountable for cost per acquisition. A GEO (generative engine optimization) agency works the organic side, influencing whether and how AI platforms cite your brand in their answers. Both matter and the strongest programs run them together, but they are separate budgets, separate skills, and separate measurement.',
  },
  {
    q: 'Do AI ads influence the answers the platform gives?',
    a: "No. Per OpenAI, the ad system runs separately from the model that generates responses — advertisers cannot buy influence over the platform's reasoning, ranking, or recommendations. Ads are clearly labelled as sponsored and visually separated from the answer. If your goal is to change what AI platforms say organically, that is generative engine optimisation (GEO) — a different discipline, a different budget, and not what an ad buy delivers.",
  },
  {
    q: 'Is a competitor targeting my brand name inside AI platforms?',
    a: 'Possibly, and most brands have never checked. AI ads match on conversation context, so a prompt that names your brand is exactly the high-intent moment a rival will target. There is no brand-exclusion setting that protects you by default, which makes brand defence an active campaign rather than a safeguard you can assume. We audit brand-term exposure on every engagement before a dollar of prospecting budget moves.',
  },
  {
    q: 'How do AI ad CPMs compare with Meta, Google, and LinkedIn?',
    a: "AI platforms price above social and closer to search. The default CPM max bid is $60 and the recommended starting CPC is $3–5, against roughly $15–20 CPM on Meta, $20–40 CPM on Google Search, and around $33 CPM on LinkedIn. Read on its own that comparison is misleading: an AI ad impression lands mid-decision, inside a conversation where the buyer has already described their problem. The benchmark that matters is cost per acquisition, not cost per thousand impressions.",
  },
  {
    q: 'Is AI advertising worth it?',
    a: 'For some businesses, not yet. AI advertising is worth it when you have proven paid demand elsewhere, margin that tolerates a $3–5 CPC, at least $10,000 a month in media, and conversion tracking already working. It is not worth it if you want cheap clicks or cannot yet attribute revenue. We would rather say that on the call than after the invoice.',
  },
  {
    q: 'What does Viralaty actually do?',
    a: 'We are a done-for-you agency that builds, launches, and scales advertising campaigns inside AI platforms and across the performance channels your buyers still use. We handle strategy, context signal architecture, creative production, account setup, conversion tracking, oCPC bidding, product feed campaigns, daily optimisation, and reporting.',
  },
  {
    q: 'How do you measure AI advertising performance?',
    a: 'We run the pixel and the Conversions API together with a shared event ID for deduplication, preserve the click reference parameter through redirects, add dynamic URL macros so ad-level data joins to your own analytics, and reconcile the ad platform against your revenue system every month rather than quoting one number as truth.',
  },
  {
    q: 'Do I keep ownership of my ad account?',
    a: 'Yes, always. You own the ad account, the pixel, and the data sources; we operate them through permissioned team access. On a channel this new, accumulated conversion history is an expensive asset to rebuild, and it should never be hostage to a renewal conversation.',
  },
  {
    q: 'Which industries do you run AI advertising for?',
    a: 'DTC and eCommerce (skincare, wellness, apparel, consumer electronics — including product feed campaigns), B2B SaaS and developer tools, and high-ticket professional services such as consultancies, financial services, and home services. The common thread is a working paid acquisition program and at least $10,000 a month in media budget.',
  },
  {
    q: 'How quickly can my first campaign go live?',
    a: 'Most engagements ship the first round of creative and a live test campaign within 7 to 14 days of kickoff. We move on a weekly release cadence after that.',
  },
  {
    q: 'Who is this best for?',
    a: 'Direct-to-consumer brands, B2B SaaS, and high-ticket service businesses spending at least $10,000 per month on paid acquisition and ready to add an AI-native channel to their mix.',
  },
  {
    q: 'What does an AI ad unit look like?',
    a: 'An AI ad is a sponsored placement that appears below relevant AI conversations. The unit includes an advertiser name, favicon, headline, body copy, landing page, and image asset. The platform selects which ad to show based on conversation context and intent, priced through a relevance-weighted second-price auction.',
  },
  {
    q: 'Who sees AI ads?',
    a: 'OpenAI shows ads to logged-in adult users on the Free and Go tiers. Paid plans stay ad-free — Plus, Pro, and every Business plan, including Team, Enterprise, and Edu. Users predicted to be under 18 are excluded, and users can opt into an ad-free experience through their account settings.',
  },
  {
    q: 'Which countries can run AI advertising?',
    a: "OpenAI's Ads Manager was first available in nine markets: the United States, United Kingdom, Canada, Australia, New Zealand, Japan, Korea, Brazil, and Mexico. From September 2026 OpenAI began rolling out to select countries in Europe, India, the Middle East, and North Africa — country by country rather than region-wide. Check the availability table in Ads Manager for your specific market before committing budget.",
  },
  {
    q: 'Can a small business advertise on AI platforms?',
    a: 'Yes. Self-serve Ads Manager publishes no minimum spend, so any business can launch the same day it verifies. Whether it should is a different question: at a $3–5 recommended starting CPC, a small budget buys too few clicks to reach statistical confidence for months. Below roughly $3,000 a month, run it yourself as a learning exercise rather than paying an agency retainer that outweighs the media.',
  },
  {
    q: 'Can I run AI ads through a DSP instead of buying direct?',
    a: 'You can — several demand-side platforms now resell AI ad inventory inside a wider programmatic buy. Buying direct gives you the full native feature set: context signals, product feed campaigns, conversion-optimised bidding, dynamic URL macros, the pixel and the Conversions API — plus first sight of beta features. We buy direct, and we will tell you when a DSP is the better fit for your media mix.',
  },
  {
    q: 'What are your contract terms — can I cancel?',
    a: "Month-to-month after an initial 90-day term, with 30 days' notice. The 90 days is not a lock-in tactic; it is the minimum honest window to instrument tracking, ship three or four creative rounds, and gather enough conversion volume to move from CPC to conversion-optimised bidding. You keep the ad account, the pixel, the creative, and the conversion history whether you renew or not.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-[#FAFAF8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Left sidebar */}
          <div className="md:col-span-5">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Frequently Asked</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              Straight answers before we talk.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70 dark:text-white/60">
              Every answer below comes from live accounts on the current platform — not from last quarter&apos;s launch coverage. If your question is not here, bring it to the call.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-1 text-sm font-semibold tracking-widest uppercase"
              style={{ color: '#5E0ED7' }}
              href="/faq"
            >
              Full FAQ <ArrowUpRight size={16} />
            </a>

            <div className="mt-10 p-6 bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-2xl">
              <p className="text-sm leading-relaxed text-black/70 dark:text-white/60">
                Still comparing agencies? Our selection guide covers the eight warning signs, the right questions to ask, and what a credible answer actually sounds like.
              </p>
              <a
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#5E0ED7' }}
                href="/guides/how-to-choose-chatgpt-ads-agency"
              >
                How to choose an AI advertising agency <ArrowUpRight size={14} />
              </a>
              <a
                href="https://calendly.com/tarunkapoor/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold tracking-widest uppercase text-white text-xs"
                style={{ background: '#5E0ED7' }}
              >
                Schedule a call <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="md:col-span-7 space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/10 dark:border-white/10">
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <h3 className="text-base font-semibold text-black dark:text-white leading-snug">{faq.q}</h3>
                  <span
                    className="shrink-0 mt-0.5 transition-transform duration-200"
                    style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)', color: '#5E0ED7' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-5">
                    <p className="text-sm leading-relaxed text-black/70 dark:text-white/60">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
