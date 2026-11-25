import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden font-inter text-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark mode overlay */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none bg-black/60" />
      {/* Mobile gradient overlay */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.85) 100%)' }}
      />
      {/* Mobile dark mode gradient overlay */}
      <div
        className="md:hidden hidden dark:block absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.88) 100%)' }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Spacer for navbar */}
        <div className="h-[72px] md:h-[80px]" />

        {/* Mobile Layout */}
        <div className="md:hidden flex-1 flex flex-col px-5 pb-8">
          <div className="flex-1 flex flex-col justify-center pt-4">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#5E0ED7' }} />
              <span className="text-[10px] tracking-widest uppercase font-semibold text-white whitespace-nowrap">Done For You · AI Ad Campaigns</span>
            </div>
            <div className="mt-6">
              <h1
                className="uppercase text-black dark:text-white text-left"
                style={{ fontSize: 'clamp(2.75rem, 14vw, 4.5rem)', lineHeight: '0.92', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                <span className="block">ChatGPT</span>
                <span className="block">ADS</span>
                <span className="block">Agency</span>
              </h1>
            </div>
            <p className="mt-5 text-base font-medium leading-relaxed text-black/80 dark:text-white/80 max-w-[20rem]">
              A done-for-you AI advertising agency. We engineer, deploy, and grow campaigns inside the highest-intent conversation channel buyers use today.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-semibold tracking-widest uppercase text-white text-sm shadow-lg shadow-black/10 active:scale-[0.98] transition"
                style={{ background: '#5E0ED7' }}
              >
                Book a Call →
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
              <a
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-black/70 dark:text-white/60"
                href="/services"
              >
                View our services
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[10px] tracking-widest uppercase font-semibold text-black/70 dark:text-white/60">
              <div className="flex" aria-hidden="true">
                {[1,2,3,4,5]?.map((i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#5E0ED7" stroke="none" aria-hidden="true">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                ))}
              </div>
              <span className="whitespace-nowrap">Operated by 12-yr media expert</span>
              <span className="w-1 h-1 rounded-full bg-black/40 dark:bg-white/30" />
              <span>Rahil Khan</span>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="mt-10 pt-6 border-t border-black/15 dark:border-white/15 grid grid-cols-3 gap-3">
            {[
              { plus: true, value: '400', label: 'CAMPAIGNS\nDEPLOYED' },
              { plus: true, value: '60', label: 'BRANDS\nGROWN' },
              { plus: true, value: '15M', label: 'REVENUE\nDRIVEN' },
            ]?.map((stat) => (
              <div key={stat?.value}>
                <div className="flex items-start leading-none">
                  <span style={{ color: '#5E0ED7', fontSize: '0.55em' }} className="font-semibold mt-1">+</span>
                  <span className="text-2xl font-semibold text-black dark:text-white">{stat?.value}</span>
                </div>
                <div className="mt-1 text-[9px] font-semibold tracking-widest uppercase text-black/70 dark:text-white/55 leading-tight" style={{ whiteSpace: 'pre-line' }}>{stat?.label}</div>
              </div>
            ))}
            <p className="col-span-3 mt-1 text-[8px] tracking-widest uppercase font-semibold text-black/50 dark:text-white/35">
              Founder&apos;s 12-year career totals · all paid channels
            </p>
          </div>

          <div className="mt-6 flex justify-center text-black/40 dark:text-white/30" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-1 md:flex-col">
          <div className="flex-1 flex items-center justify-end px-8 md:px-12 py-8 md:py-0">
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-8 md:gap-10">
                {[
                  { value: '400', label: 'CAMPAIGNS\nDEPLOYED' },
                  { value: '60', label: 'BRANDS\nGROWN' },
                  { value: '15M', label: 'REVENUE\nDRIVEN' },
                ]?.map((stat) => (
                  <div key={stat?.value} className="text-right">
                    <div
                      className="flex items-start justify-end leading-none"
                      style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 600 }}
                    >
                      <span style={{ color: '#5E0ED7', fontSize: '0.5em' }}>+</span>
                      <span className="text-black dark:text-white">{stat?.value}</span>
                    </div>
                    <div className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black dark:text-white/80 whitespace-pre-line leading-tight mt-1">
                      {stat?.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] tracking-widest uppercase font-semibold text-black/50 dark:text-white/35">
                Founder&apos;s 12-year career totals · all paid channels
              </p>
            </div>
          </div>

          <div className="px-8 md:px-12 pb-8 md:pb-12 flex flex-col gap-12">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs md:text-sm font-semibold tracking-widest uppercase max-w-xs leading-tight text-black dark:text-white/80">
                Done For You<br />AI Ad Campaigns<br />That Compound
              </p>
              <Link
                href="/booking"
                className="text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap flex items-center gap-1"
                style={{ color: '#5E0ED7', fontWeight: 600 }}
              >
                Book a Call →
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>

            <div className="flex items-end justify-between gap-4">
              <p className="w-[180px] md:w-[280px] shrink-0 text-xs md:text-sm font-semibold tracking-widest uppercase text-right leading-snug text-black dark:text-white/80">
                AI-Powered Ad Systems Engineered to Turn Buyer Intent Into Measurable Revenue Growth
              </p>
              <div
                className="uppercase text-black dark:text-white text-right"
                style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', lineHeight: '0.88', fontWeight: 600 }}
              >
                <span className="block">ChatGPT</span>
                <span className="block">ADS</span>
                <span className="block">Agency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
