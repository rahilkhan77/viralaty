'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

const values = [
  {
    title: 'Specificity over breadth',
    body: 'We do one thing: AI advertising. Not social media management, not SEO, not brand strategy. This focus means every hour we spend is making us better at the thing that matters most to our clients.',
  },
  {
    title: 'Honest about what we know',
    body: 'AI Ads is a new channel. The playbook is still being written. We tell clients what we know, what we are testing, and what we are uncertain about. We do not pretend to have answers we do not have.',
  },
  {
    title: 'Results, not activity',
    body: 'We measure ourselves on CPA, ROAS, and revenue — not on impressions, reach, or the number of reports we produce. If the numbers are not moving in the right direction, we change what we are doing.',
  },
  {
    title: 'Aligned incentives',
    body: 'We charge flat retainers, not percentage-of-spend. This means we have no financial incentive to increase your ad spend. Our only incentive is to make your campaigns perform well enough that you keep working with us.',
  },
];

const timeline = [
  {
    year: '2023',
    event: 'Founded with a single thesis: AI-native platforms will become the dominant advertising channel within five years.',
  },
  {
    year: '2024',
    event: 'Secured early access to the ChatGPT Ads Manager beta. Ran the first client campaigns on the platform.',
  },
  {
    year: '2025',
    event: 'Scaled to 60+ active brand clients across e-commerce, SaaS, and financial services. Developed the context signal methodology.',
  },
  {
    year: '2026',
    event: 'Launched Europe operations. Expanded into multi-platform AI advertising including Perplexity and other AI-native channels.',
  },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-12 pt-20 pb-20 max-w-6xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
            About Viralaty
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                We exist to help brands win the AI advertising era.
              </h1>
            </div>
            <div className="space-y-5 pt-2">
              <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed">
                Viralaty is a done-for-you AI advertising agency. We specialise exclusively in advertising on AI-native platforms — primarily ChatGPT — for performance-focused brands that want to reach buyers at the moment of decision.
              </p>
              <p className="text-base text-black/60 dark:text-white/60 leading-relaxed">
                We are not a full-service digital agency that added AI Ads to a menu of services. We built this agency specifically for this channel, because we believe it is the most significant shift in paid advertising since the launch of Google AdWords.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-5 sm:px-8 md:px-12 py-20 bg-black dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-6">Our Mission</p>
            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              "To make AI advertising accessible to every performance brand — not just the ones with the biggest budgets or the best agency relationships."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-5 sm:px-8 md:px-12 py-20 max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-10">Founder</p>
        <div className="flex flex-col sm:flex-row items-start gap-8 p-8 md:p-10 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3">
          <div className="w-16 h-16 rounded-full bg-[#5E0ED7]/10 flex items-center justify-center shrink-0">
            <span className="text-[#5E0ED7] font-bold text-2xl">R</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Rahil Khan</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Viralaty', 'Excentia AI', 'Revivelead AI', 'Votemash'].map((company) => (
                <span
                  key={company}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-[#5E0ED7]/20 bg-[#5E0ED7]/8 text-[#5E0ED7]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#5E0ED7]" />
                  Founder, {company}
                </span>
              ))}
            </div>
            <p className="text-base text-black/65 dark:text-white/65 leading-relaxed mb-4">
              Rahil Khan is the founder behind Viralaty, Excentia AI, Revivelead AI, and Votemash — a portfolio of ventures at the intersection of AI, advertising, and growth technology.
            </p>
            <a
              href="https://instagram.com/rxhilkhan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E0ED7] hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @rxhilkhan
            </a>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-5 sm:px-8 md:px-12 py-20 max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-10">What We Do</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-snug">
              We engineer AI advertising campaigns from first principles.
            </h2>
            <div className="space-y-4 text-base text-black/65 dark:text-white/65 leading-relaxed">
              <p>
                Most agencies adapt their existing playbooks to new channels. We built our methodology specifically for how AI advertising works — starting with context signals, not creative briefs.
              </p>
              <p>
                Our process covers every layer of a successful AI Ads programme: account setup and verification, context signal development, creative production, campaign structure, conversion tracking, and ongoing optimisation.
              </p>
              <p>
                We work with brands across e-commerce, SaaS, financial services, and professional services. Our clients range from DTC brands spending $5,000/month to enterprise advertisers managing seven-figure annual budgets.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Ads Management', desc: 'End-to-end campaign management on the ChatGPT Ads Manager.' },
              { label: 'Campaign Management', desc: 'Strategy, structure, and ongoing optimisation for performance campaigns.' },
              { label: 'Account Setup', desc: 'Full account verification and technical setup for new advertisers.' },
              { label: 'Creative & Context Signals', desc: 'Ad creative and context signal documents engineered for AI platforms.' },
              { label: 'Product Feed', desc: 'Product catalogue integration and feed optimisation for e-commerce brands.' },
              { label: 'Measurement', desc: 'Conversion tracking, attribution, and reporting infrastructure.' },
              { label: 'Europe Launch', desc: 'GDPR-compliant campaign setup and management for European markets.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mt-2 shrink-0" />
                <div>
                  <div className="text-sm font-semibold mb-0.5">{item.label}</div>
                  <div className="text-sm text-black/55 dark:text-white/55">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 sm:px-8 md:px-12 py-20 bg-[#F3F3F0] dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-10">How We Work</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3"
              >
                <div className="w-8 h-8 rounded-full bg-[#5E0ED7]/10 flex items-center justify-center mb-4">
                  <span className="text-[#5E0ED7] font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 sm:px-8 md:px-12 py-20 max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-10">Our Story</p>
        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-black/8 dark:bg-white/8 hidden sm:block" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-6 sm:gap-8">
                <div className="shrink-0 w-[52px] text-right">
                  <span className="text-sm font-bold text-[#5E0ED7]">{item.year}</span>
                </div>
                <div className="hidden sm:flex shrink-0 w-px items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-[#5E0ED7] border-2 border-[#FAFAF8] dark:border-[#0a0a0a] relative z-10" />
                </div>
                <p className="text-base text-black/70 dark:text-white/70 leading-relaxed pt-0.5 flex-1">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-black dark:bg-white/5 border border-white/5 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Work with us</h2>
            <p className="text-white/60 max-w-lg leading-relaxed">
              If you are serious about AI advertising and want a team that has been doing this since the beginning, we would like to talk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase border border-white/20 text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Get in Touch
            </a>
            <a
              href="https://calendly.com/tarunkapoor/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase text-white whitespace-nowrap"
              style={{ background: '#5E0ED7' }}
            >
              Book a Call <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
