'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const steps = [
  {
    id: '01',
    status: 'done',
    title: 'Inquiry submitted',
    desc: 'Your details are in. We have everything we need to get started.',
    timing: 'Just now',
  },
  {
    id: '02',
    status: 'active',
    title: 'Brand review',
    desc: 'Our team researches your brand, ad accounts, and competitive landscape before the call.',
    timing: 'Within 4 hours',
  },
  {
    id: '03',
    status: 'upcoming',
    title: 'Scheduling your call',
    desc: 'We will reach out within 1 business day to lock in a 30-minute strategy session.',
    timing: 'Within 1 business day',
  },
  {
    id: '04',
    status: 'upcoming',
    title: 'Strategy call (30 min)',
    desc: 'A focused session where we map the right programme to your specific situation and goals.',
    timing: 'Day 2–3',
  },
  {
    id: '05',
    status: 'upcoming',
    title: 'Custom proposal delivered',
    desc: 'A tailored proposal with pricing, scope, and projected outcomes — within 24 hours of the call.',
    timing: 'Day 3–4',
  },
];

const exploreCards = [
  {
    tag: 'Pricing',
    title: 'See what each programme costs',
    desc: 'Transparent pricing tiers from launch campaigns to full-service management. No surprises.',
    href: '/services#pricing',
    cta: 'View Pricing',
  },
  {
    tag: 'Guides',
    title: 'Learn how AI advertising works',
    desc: 'Our free guides cover everything from context signals to campaign setup — written for performance marketers.',
    href: '/guides',
    cta: 'Read the Guides',
  },
  {
    tag: 'Services',
    title: 'Explore what we actually do',
    desc: 'From creative production to reporting and intelligence — see the full scope of what Viralaty delivers.',
    href: '/services',
    cta: 'View Services',
  },
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const firstName = name ? name.split(' ')[0] : '';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="bg-[#FAFAF8] dark:bg-[#0a0a0a] min-h-screen"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <div className="bg-white dark:bg-[#111111] border-b border-black/5 dark:border-white/10">
        <Navbar />
      </div>

      {/* Hero confirmation banner */}
      <section className="px-5 sm:px-8 md:px-12 pt-14 pb-12 bg-black text-white relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(94,14,215,0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#5E0ED7' }}
            >
              <CheckIcon size={16} />
            </span>
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#5E0ED7' }}>
              Booking Confirmed
            </span>
          </div>
          <h1
            className="uppercase font-semibold tracking-tight leading-[0.93] text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
          >
            {firstName ? `You're in, ${firstName}.` : "You're in."}
          </h1>
          <p className="mt-4 text-sm text-white/55 max-w-lg leading-relaxed">
            We have received your inquiry and will review your brand before reaching out. Expect to hear from us within 1 business day.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Next steps timeline */}
          <div className="md:col-span-2">
            <div className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-6">
              What happens next
            </div>
            <div className="relative">
              {/* Vertical connector line */}
              <div
                className="absolute left-[17px] top-8 bottom-8 w-px"
                style={{ background: 'linear-gradient(to bottom, #5E0ED7 20%, rgba(94,14,215,0.12) 100%)' }}
                aria-hidden="true"
              />
              <ol className="space-y-0">
                {steps.map((step, i) => (
                  <li key={step.id} className="flex gap-4 relative pb-7 last:pb-0">
                    {/* Step indicator */}
                    <div className="flex-shrink-0 relative z-10">
                      {step.status === 'done' ? (
                        <span
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ background: '#5E0ED7' }}
                        >
                          <CheckIcon size={14} />
                        </span>
                      ) : step.status === 'active' ? (
                        <span
                          className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                          style={{ borderColor: '#5E0ED7', background: 'rgba(94,14,215,0.08)' }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full animate-pulse"
                            style={{ background: '#5E0ED7' }}
                          />
                        </span>
                      ) : (
                        <span className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/15 bg-white dark:bg-[#1a1a1a]">
                          <span className="text-[10px] font-semibold text-black/30 dark:text-white/30">{step.id}</span>
                        </span>
                      )}
                    </div>
                    <div className="pt-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-semibold ${
                            step.status === 'upcoming' ?'text-black/40 dark:text-white/35' :'text-black dark:text-white'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide ${
                            step.status === 'done'
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                              : step.status === 'active' ?'text-white' :'bg-black/5 dark:bg-white/8 text-black/35 dark:text-white/30'
                          }`}
                          style={step.status === 'active' ? { background: '#5E0ED7' } : {}}
                        >
                          {step.timing}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-xs leading-relaxed ${
                          step.status === 'upcoming' ?'text-black/30 dark:text-white/25' :'text-black/50 dark:text-white/40'
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Reassurance note */}
            <div className="mt-8 p-5 rounded-2xl bg-black dark:bg-[#1a1a1a] text-white border border-transparent dark:border-white/10">
              <div className="text-xs tracking-widest uppercase font-semibold text-white/35 mb-3">A note from the team</div>
              <p className="text-xs text-white/55 leading-relaxed">
                We review every submission personally. If we are not the right fit for your situation, we will tell you honestly and point you in the right direction — no pressure, no pitch.
              </p>
            </div>
          </div>

          {/* Explore cards */}
          <div className="md:col-span-3 space-y-5">
            <div className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-2">
              While you wait
            </div>

            {exploreCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block bg-white dark:bg-[#111111] rounded-2xl border border-black/8 dark:border-white/10 p-7 hover:border-[#5E0ED7]/30 dark:hover:border-[#5E0ED7]/30 transition-all duration-200 hover:shadow-lg hover:shadow-[#5E0ED7]/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className="inline-block text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full mb-3"
                      style={{ background: 'rgba(94,14,215,0.08)', color: '#5E0ED7' }}
                    >
                      {card.tag}
                    </span>
                    <h3 className="text-base font-semibold text-black dark:text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-black/50 dark:text-white/40 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-black/40 dark:text-white/40 group-hover:border-[#5E0ED7]/40 group-hover:text-[#5E0ED7] transition-all duration-200 mt-1"
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <div
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 group-hover:opacity-80"
                  style={{ color: '#5E0ED7' }}
                >
                  {card.cta} <ArrowUpRight size={11} />
                </div>
              </Link>
            ))}

            {/* Back to home */}
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-black/35 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <React.Suspense fallback={
      <div className="bg-[#FAFAF8] dark:bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#5E0ED7] border-t-transparent animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </React.Suspense>
  );
}
