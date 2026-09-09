'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <section className="px-5 sm:px-8 md:px-12 pt-20 pb-8 max-w-3xl mx-auto">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7]" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-black/40 dark:text-white/40">Last updated: September 2026</p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-3xl mx-auto">
        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none space-y-10">

          <div>
            <h2 className="text-xl font-bold mb-3">1. Who We Are</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Viralaty ("we", "us", "our") is an AI advertising agency. Our website is located at viralaty.com. For questions about this Privacy Policy, contact us at{' '}
              <a href="mailto:hello@viralaty.com" className="text-[#5E0ED7] hover:underline">hello@viralaty.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mb-3">We collect information you provide directly to us, including:</p>
            <ul className="space-y-2 text-black/70 dark:text-white/70">
              {['Name and contact information (email address, company name)', 'Information submitted through our contact form', 'Communications you send to us by email or other means', 'Information provided during onboarding as a client']?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mt-3">
              We also collect certain information automatically when you visit our website, including your IP address, browser type, pages visited, and time spent on pages. This information is collected through cookies and similar tracking technologies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 text-black/70 dark:text-white/70">
              {['Respond to your enquiries and provide our services', 'Send you information about our services that you have requested', 'Improve our website and services', 'Comply with legal obligations', 'Protect against fraud and abuse']?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Legal Basis for Processing (EEA/UK)</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              If you are located in the European Economic Area or the United Kingdom, we process your personal data on the following legal bases: (a) your consent, where you have provided it; (b) performance of a contract, where processing is necessary to provide our services; (c) legitimate interests, where we have a legitimate business reason to process your data that is not overridden by your rights; and (d) compliance with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We use cookies and similar tracking technologies to analyse website traffic and improve your experience. You can control cookies through your browser settings. Disabling cookies may affect the functionality of our website. We use analytics cookies (to understand how visitors use our site) and functional cookies (to remember your preferences).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">6. Data Sharing</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We do not sell your personal data. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business (such as email service providers and analytics platforms), subject to confidentiality agreements. We may also disclose your information where required by law or to protect our legal rights.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">7. Data Retention</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Contact form submissions are retained for up to 24 months. Client data is retained for the duration of the engagement and for up to 7 years thereafter for legal and accounting purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">8. Your Rights</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mb-3">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2 text-black/70 dark:text-white/70">
              {['Right to access the personal data we hold about you', 'Right to rectification of inaccurate data', 'Right to erasure ("right to be forgotten")', 'Right to restriction of processing', 'Right to data portability', 'Right to object to processing', 'Right to withdraw consent at any time']?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@viralaty.com" className="text-[#5E0ED7] hover:underline">hello@viralaty.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">9. International Transfers</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that differ from those in your country. Where we transfer personal data outside the EEA or UK, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">10. Security</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">11. Changes to This Policy</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">12. Contact Us</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
              <a href="mailto:hello@viralaty.com" className="text-[#5E0ED7] hover:underline">hello@viralaty.com</a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
