import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Intake & analysis',
    desc: 'We map your offer, unit economics, target audience, and existing channel mix, then review your creative assets and conversion funnel end to end.',
  },
  {
    num: '02',
    title: 'Blueprint & creative build',
    desc: 'You receive a 90-day growth plan, a buyer intent map, and the first batch of AI-native ad creative — delivered within two weeks of kickoff.',
  },
  {
    num: '03',
    title: 'Deploy & instrument',
    desc: 'We configure accounts, wire conversion tracking, and push the first live campaigns. No spend moves until revenue attribution is confirmed and tested.',
  },
  {
    num: '04',
    title: 'Optimise & compound',
    desc: 'Fresh creative every week, hands-on account management daily, and a full strategy review each month. Budget scales only when cost-per-acquisition holds.',
  },
];

export default function ProcessSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-black dark:bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Our Process</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-white">
          Four phases from onboarding<br />to a self-reinforcing channel.
        </h2>
        <div className="mt-14 grid md:grid-cols-4 gap-8 md:gap-6">
          {steps?.map((step) => (
            <div key={step?.num} className="border-t border-white/20 pt-6">
              <div className="text-sm font-semibold tracking-widest" style={{ color: '#5E0ED7' }}>{step?.num}</div>
              <h3 className="mt-3 text-xl font-semibold">{step?.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{step?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
