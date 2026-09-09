import React from 'react';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const steps = [
  {
    num: '01',
    title: 'Create your OpenAI Ads Manager account',
    desc: 'Visit ads.openai.com, complete Persona identity verification, enter your advertiser details, and connect a billing method. Fully self-serve — no waitlist, no published minimum spend, no agency certification required.',
    linkText: 'Account setup walkthrough',
    linkHref: '/guides/ads-manager-account-setup',
  },
  {
    num: '02',
    title: 'Build your campaign structure and set bids',
    desc: "Campaign, ad group, ad. Select a Reach (CPM) or Clicks (CPC) objective, then calibrate bids starting from OpenAI's $3–5 recommended CPC and $60 default CPM max inside a relevance-weighted second-price auction.",
    linkText: 'Inside the Ads Manager',
    linkHref: '/guides/chatgpt-ads-manager',
  },
  {
    num: '03',
    title: 'Craft your ad unit and configure context signals',
    desc: 'Advertiser name, favicon, headline, body copy, destination URL, image asset. Context signals tell the platform which conversations your ad belongs in — the closest equivalent to keyword targeting this channel offers.',
    linkText: 'How context signals work',
    linkHref: '/guides/context-hints-for-chatgpt-ads',
  },
  {
    num: '04',
    title: 'Set up conversion tracking before any spend',
    desc: 'Deploy the pixel and Conversions API together with a shared event ID for deduplication, attach dynamic URL macros to your analytics stack, and preserve the click reference parameter through every redirect.',
    linkText: 'Conversion tracking guide',
    linkHref: '/guides/chatgpt-ads-conversion-tracking',
  },
  {
    num: '05',
    title: 'Shift from click buying to conversion optimisation',
    desc: 'Once your event volume is sufficient, migrate from CPC to conversion-optimised (oCPC) bidding, then reconcile the ad platform against your revenue system on a monthly cadence.',
    linkText: 'Conversion-optimised campaigns',
    linkHref: '/guides/chatgpt-ads-conversion-campaigns',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>The Playbook</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              How to advertise<br />inside AI conversations.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              The self-serve platform is open to any advertiser. You can create an account, pass verification, and have a live campaign the same day — there is no invite list, no minimum spend requirement, and no certification programme to complete.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              Getting live is the straightforward part. What turns a test into a compounding channel is bidding discipline, consistent creative output, and measurement that holds up under scrutiny. Here is the full sequence, with a guide for every step.
            </p>
            <a
              href="https://calendly.com/tarunkapoor/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-white text-sm"
              style={{ background: '#5E0ED7' }}
            >
              Let us run it for you <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="md:col-span-7">
            <ol className="space-y-6">
              {steps.map((step) => (
                <li key={step.num} className="flex gap-5 border-b border-black/10 dark:border-white/10 pb-6">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ background: '#5E0ED715', color: '#5E0ED7' }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/55">{step.desc}</p>
                    <a
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: '#5E0ED7' }}
                      href={step.linkHref}
                    >
                      {step.linkText} <ArrowUpRight size={14} />
                    </a>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-black/60 dark:text-white/45">
              Also worth reading before you budget:{' '}
              <a className="font-semibold underline decoration-black/20 dark:decoration-white/20 underline-offset-4" style={{ color: '#5E0ED7' }} href="/guides/chatgpt-ads-cost">what AI ads actually cost</a>,{' '}
              <a className="font-semibold underline decoration-black/20 dark:decoration-white/20 underline-offset-4" style={{ color: '#5E0ED7' }} href="/guides/chatgpt-ads-explained">how the auction is priced</a>, and{' '}
              <a className="font-semibold underline decoration-black/20 dark:decoration-white/20 underline-offset-4" style={{ color: '#5E0ED7' }} href="/guides/chatgpt-ads-product-feed">product feed campaigns for retail catalogues</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
