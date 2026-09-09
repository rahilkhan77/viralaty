import React from 'react';

const audiences = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#5E0ED7' }}>
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </svg>
    ),
    title: 'DTC eCommerce',
    desc: 'Skincare, wellness, apparel, and consumer goods brands ready to diversify beyond the Meta-and-Google duopoly with AI-native demand generation.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#5E0ED7' }}>
        <path d="M12 20v2" />
        <path d="M12 2v2" />
        <path d="M17 20v2" />
        <path d="M17 2v2" />
        <path d="M2 12h2" />
        <path d="M2 17h2" />
        <path d="M2 7h2" />
        <path d="M20 12h2" />
        <path d="M20 17h2" />
        <path d="M20 7h2" />
        <path d="M7 20v2" />
        <path d="M7 2v2" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
    title: 'B2B SaaS',
    desc: 'Vertical software, developer tools, and AI-first products that need qualified pipeline from decision-makers who evaluate solutions inside AI chat.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#5E0ED7' }}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
      </svg>
    ),
    title: 'High-Ticket Services',
    desc: 'Agencies, consultancies, financial advisors, and premium service operators who compete on lead quality and lifetime value rather than raw click volume.',
  },
];

export default function AudienceSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>Who We Serve</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
          Built for growth teams that<br />
          already understand paid acquisition.
        </h2>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-black/70 dark:text-white/60 leading-relaxed">
          We are most valuable to operators already running paid programs who want a specialist partner that treats AI advertising as a serious revenue channel — not a side experiment.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {audiences?.map((a) => (
            <div key={a?.title} className="p-8 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-[#111111]">
              {a?.icon}
              <h3 className="mt-5 text-xl font-semibold text-black dark:text-white">{a?.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/55">{a?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
