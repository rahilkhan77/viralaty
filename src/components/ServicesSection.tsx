import React from 'react';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
        <circle cx="4" cy="20" r="2" />
      </svg>
    ),
    title: 'Creative Production',
    desc: 'On-brand static, video, and conversational ad creative delivered on a weekly cadence. Engineered for how buyers actually evaluate and decide in 2026.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="8" height="8" x="3" y="3" rx="2" />
        <path d="M7 11v4a2 2 0 0 0 2 2h4" />
        <rect width="8" height="8" x="13" y="13" rx="2" />
      </svg>
    ),
    title: 'Campaign Launch',
    desc: 'Full account setup and advertiser verification, context signal architecture, brand-term defence against competitor targeting, product feed campaigns for retail catalogues, pixel and Conversions API configuration, and a launch checklist your internal team can verify independently.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: 'Optimisation & Scaling',
    desc: 'Daily hands-on account management, weekly creative iteration, and the transition from click-based to conversion-optimised (oCPC) bidding once event volume supports it — scaled in a way that protects your unit economics.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </svg>
    ),
    title: 'Reporting & Intelligence',
    desc: 'Full-funnel attribution connecting spend to revenue — dynamic URL macros joined to your analytics, monthly reconciliation against your revenue system, and weekly written analysis you can share directly with stakeholders.',
  },
];

export default function ServicesSection() {
  return (
    <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 bg-[#FAFAF8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>What We Deliver</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              End-to-end AI ad campaign management.
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-1 text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#5E0ED7' }}
            href="/services"
          >
            View all services <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="p-8 bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 rounded-2xl">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: '#5E0ED715', color: '#5E0ED7' }}
              >
                {service.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-black dark:text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/55">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
