'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { trackEvent } from '@/components/Analytics';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  service: string;
  message: string;
}

const budgetOptions = [
  'Under $5,000/mo',
  '$5,000 – $20,000/mo',
  '$20,000 – $100,000/mo',
  '$100,000+/mo',
  'Not sure yet',
];

const serviceOptions = [
  'Creative Production',
  'Campaign Launch',
  'Optimisation & Scaling',
  'Reporting & Intelligence',
  'Full-Service Management',
  'Not sure — need guidance',
];

export default function BookingPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    budget: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (!form.budget) newErrors.budget = 'Please select a budget range';
    if (!form.service) newErrors.service = 'Please select a service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Track form start
    trackEvent('form_start', { source: 'booking' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('booking_leads').insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
        website: form.website.trim() || null,
        budget: form.budget,
        service: form.service,
        message: form.message.trim() || null,
        status: 'new',
      });

      if (error) {
        console.error('Booking submission error:', error.message);
        setSubmitError('Something went wrong. Please try again or email us directly at hello@viralaty.com');
        setLoading(false);
        return;
      }

      // Send email notification (fire-and-forget — don't block success state)
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        await fetch(`${supabaseUrl}/functions/v1/send-lead-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'booking',
            data: {
              name: form.name.trim(),
              email: form.email.trim().toLowerCase(),
              company: form.company.trim(),
              website: form.website.trim() || null,
              budget: form.budget,
              service: form.service,
              message: form.message.trim() || null,
            },
          }),
        });
      } catch (emailErr) {
        console.error('Email notification error (non-blocking):', emailErr);
      }

      // Track successful submission
      trackEvent('form_submit', { source: 'booking', budget: form.budget, service: form.service });

      setLoading(false);
      router.push(`/booking/confirmation?name=${encodeURIComponent(form.name.trim())}`);
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError('Something went wrong. Please try again or email us directly at hello@viralaty.com');
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder-black/30 dark:placeholder-white/25 outline-none transition focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200' :'border-black/10 dark:border-white/10 focus:ring-[#5E0ED7]/20 focus:border-[#5E0ED7]/40'
    }`;

  return (
    <div className="bg-[#FAFAF8] dark:bg-[#0a0a0a] min-h-screen">
      <div className="bg-white dark:bg-[#111111] border-b border-black/5 dark:border-white/10">
        <Navbar />
      </div>

      <section className="px-5 sm:px-8 md:px-12 pt-14 pb-10 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#5E0ED7' }}>
            Get Started
          </div>
          <h1
            className="uppercase font-semibold tracking-tight leading-[0.93] text-white"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Book a strategy call.
          </h1>
          <p className="mt-4 text-sm text-white/60 max-w-lg leading-relaxed">
            Tell us about your brand and goals. We will review your details before the call and come prepared with a specific plan — not a generic pitch.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white uppercase tracking-tight">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {[
                  { step: '01', title: 'Submit your details', desc: 'Fill in the form with your brand, budget, and goals. Takes under 3 minutes.' },
                  { step: '02', title: 'We review your account', desc: 'Our team reviews your submission and researches your brand before the call.' },
                  { step: '03', title: 'Strategy call (30 min)', desc: 'A focused call where we map the right programme to your specific situation.' },
                  { step: '04', title: 'Custom proposal', desc: 'We send a tailored proposal within 24 hours of the call.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: '#5E0ED7' }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-black dark:text-white">{item.title}</div>
                      <div className="mt-0.5 text-xs text-black/50 dark:text-white/40 leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 bg-black dark:bg-[#1a1a1a] rounded-2xl text-white border border-transparent dark:border-white/10">
              <div className="text-xs tracking-widest uppercase font-semibold text-white/40 mb-5">Why brands choose us</div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '60+', label: 'Brands managed' },
                  { value: '$210M+', label: 'Client revenue driven' },
                  { value: '3.7×', label: 'Average ROAS' },
                  { value: '–34%', label: 'Average CAC reduction' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-black/40 dark:text-white/30 leading-relaxed">
              No commitment required. No sales pressure. If we are not the right fit, we will tell you and point you in the right direction.
            </div>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-white dark:bg-[#111111] rounded-2xl border border-black/8 dark:border-white/10 p-10 text-center flex flex-col items-center">
                <div style={{ color: '#5E0ED7' }}>
                  <CheckCircle />
                </div>
                <h2 className="mt-5 text-2xl font-semibold uppercase tracking-tight text-black dark:text-white">
                  Inquiry received.
                </h2>
                <p className="mt-3 text-sm text-black/60 dark:text-white/50 max-w-sm leading-relaxed">
                  Thanks, <strong>{form.name.split(' ')[0]}</strong>. We have received your details and will review your brand before reaching out within 1 business day to schedule your strategy call.
                </p>
                <div className="mt-6 p-4 bg-[#FAFAF8] dark:bg-[#1a1a1a] rounded-xl text-left w-full max-w-sm">
                  <div className="text-xs tracking-widest uppercase font-semibold text-black/40 dark:text-white/35 mb-3">Your submission</div>
                  {[
                    { label: 'Name', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Company', value: form.company },
                    { label: 'Budget', value: form.budget },
                    { label: 'Service', value: form.service },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs py-1.5 border-b border-black/5 dark:border-white/10 last:border-0">
                      <span className="text-black/40 dark:text-white/35">{row.label}</span>
                      <span className="text-black dark:text-white font-medium text-right max-w-[60%]">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <Link
                    href="/"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/10 dark:border-white/15 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/services"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white transition hover:opacity-90"
                    style={{ background: '#5E0ED7' }}
                  >
                    View Services <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white dark:bg-[#111111] rounded-2xl border border-black/8 dark:border-white/10 p-8 md:p-10 space-y-5"
              >
                <h2 className="text-lg font-semibold uppercase tracking-tight text-black dark:text-white">Your details</h2>

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="email">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="company">
                      Company *
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass('company')}
                    />
                    {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="website">
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      autoComplete="url"
                      placeholder="https://yoursite.com"
                      value={form.website}
                      onChange={handleChange}
                      className={inputClass('website')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="budget">
                    Monthly Ad Budget *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={inputClass('budget')}
                  >
                    <option value="">Select a range…</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="service">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass('service')}
                  >
                    <option value="">Select a service…</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5" htmlFor="message">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your current situation, goals, or challenges…"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass('message')} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-white tracking-widest uppercase transition hover:opacity-90 disabled:opacity-60"
                  style={{ background: '#5E0ED7' }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Inquiry <ArrowUpRight size={15} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-black/30 dark:text-white/25">
                  No spam. No commitment. We will respond within 1 business day.{' '}
                  <a href="/privacy" className="underline hover:text-[#5E0ED7]">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
