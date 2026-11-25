import React from 'react';

const ArrowUpRight = ({ size = 16 }: {size?: number;}) =>
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>;


export default function FounderSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-[#FAFAF8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #5E0ED7, #000)' }}>
              
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1fc66bbb3-1763299251535.png"
                alt="Rahil Khan, founder of Viralaty"
                className="absolute inset-0 w-full h-full object-cover" />
              
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Founder-Operated</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              A decade of media expertise<br />working your campaigns.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              Rahil Khan built Viralaty after a career at the sharpest edge of performance marketing — enterprise media buying across GroupM, WPP, and Ogilvy &amp; Mather, followed by $3.5M+ in measurable bottom-line impact as a senior buyer at Neil Patel Digital, and selection into Toptal&apos;s Growth Collective top-1% network. He now partners with Fortune 500 marketing teams and venture-backed startups as a fractional CMO.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/60">
              When you engage Viralaty, that is the practitioner managing your account — not a junior team member.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-1 text-sm font-semibold tracking-widest uppercase"
              style={{ color: '#5E0ED7' }}
              href="/about">
              
              Meet the founder <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>);

}