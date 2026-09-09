'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { createClient } from '@/lib/supabase/client';
import { trackEvent } from '@/components/Analytics';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

const budgetOptions = [
  'Under $2,000/month',
  '$2,000 – $5,000/month',
  '$5,000 – $15,000/month',
  '$15,000 – $50,000/month',
  '$50,000+/month',
];

interface FormState {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Work email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.company.trim()) e.company = 'Company is required';
    if (!form.budget) e.budget = 'Please select a budget range';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });

    if (!formStarted) {
      setFormStarted(true);
      trackEvent('form_start', { source: 'contact' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
        budget: form.budget,
        message: form.message.trim(),
        status: 'new',
      });

      if (error) {
        console.error('Contact submission error:', error.message);
        setSubmitError('Something went wrong. Please try again or email us at hello@viralaty.com');
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
            type: 'contact',
            data: {
              name: form.name.trim(),
              email: form.email.trim().toLowerCase(),
              company: form.company.trim(),
              budget: form.budget,
              message: form.message.trim(),
            },
          }),
        });
      } catch (emailErr) {
        console.error('Email notification error (non-blocking):', emailErr);
      }

      trackEvent('form_submit', { source: 'contact', budget: form.budget });

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError('Something went wrong. Please try again or email us at hello@viralaty.com');
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm bg-white dark:bg-white/5 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5E0ED7]/30 ${
      errors[field]
        ? 'border-red-400 dark:border-red-500' :'border-black/10 dark:border-white/10 focus:border-[#5E0ED7]/50'
    }`;

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <section className="px-5 sm:px-8 md:px-12 pt-20 pb-16 max-w-6xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl">
            Let&apos;s talk about your AI Ads.
          </h1>
          <p className="mt-5 text-lg text-black/60 dark:text-white/60 max-w-xl leading-relaxed">
            Tell us about your brand and what you are trying to achieve. We will come back to you within one business day.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-4">Direct Contact</h2>
              <a
                href="mailto:hello@viralaty.com"
                className="text-lg font-semibold hover:text-[#5E0ED7] transition-colors duration-200 inline-flex items-center gap-2"
              >
                hello@viralaty.com <ArrowUpRight size={16} />
              </a>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-4">Book a Call</h2>
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white"
                style={{ background: '#5E0ED7' }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).va) {
                    (window as any).va('event', { name: 'book_a_call_click', properties: { source: 'contact_page' } });
                  }
                }}
              >
                Book a Call <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="pt-4 border-t border-black/8 dark:border-white/8">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 mb-4">What Happens Next</h2>
              <ol className="space-y-4">
                {[
                  'We review your message and research your brand.',
                  'You receive a personalised response within one business day.',
                  'If there is a fit, we schedule a 30-minute strategy call.',
                  'We send a proposal with scope, timeline, and investment.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#5E0ED7]/10 text-[#5E0ED7] text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-black/65 dark:text-white/65 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 rounded-3xl border border-[#5E0ED7]/20 bg-[#5E0ED7]/3 dark:bg-[#5E0ED7]/5">
                <div className="w-14 h-14 rounded-full bg-[#5E0ED7] flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">Message received.</h2>
                <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-sm">
                  Thank you, {form.name.split(' ')[0]}. We will review your message and get back to you within one business day.
                </p>
                <p className="mt-4 text-sm text-black/40 dark:text-white/40">
                  In the meantime, feel free to{' '}
                  <a href="/guides" className="text-[#5E0ED7] hover:underline">read our guides</a>{' '}
                  or{' '}
                  <a href="/booking" className="text-[#5E0ED7] hover:underline">book a call directly</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2" htmlFor="email">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2" htmlFor="company">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={inputClass('company')}
                  />
                  {errors.company && <p className="mt-1.5 text-xs text-red-500">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2" htmlFor="budget">
                    Monthly Ad Budget
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    className={`${inputClass('budget')} cursor-pointer`}
                  >
                    <option value="">Select a budget range</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.budget && <p className="mt-1.5 text-xs text-red-500">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your brand, your current advertising, and what you are trying to achieve."
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold tracking-widest uppercase text-white transition-opacity disabled:opacity-60"
                  style={{ background: '#5E0ED7' }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-black/35 dark:text-white/35">
                  By submitting this form you agree to our{' '}
                  <a href="/privacy" className="underline hover:text-[#5E0ED7]">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
