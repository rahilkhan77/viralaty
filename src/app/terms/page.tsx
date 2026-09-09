'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-black/40 dark:text-white/40">Last updated: September 2026</p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-24 max-w-3xl mx-auto">
        <div className="space-y-10">

          <div>
            <h2 className="text-xl font-bold mb-3">1. Agreement to Terms</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              By accessing or using the Viralaty website (viralaty.com) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, and clients.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. Services</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Viralaty provides AI advertising management services, including but not limited to campaign setup, creative production, context signal development, conversion tracking, and ongoing campaign optimisation. The specific scope of services for each client is defined in a separate Service Agreement or Statement of Work. These Terms of Service govern your general use of our website and any services not covered by a separate agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. Use of Website</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed mb-3">You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="space-y-2 text-black/70 dark:text-white/70">
              {[
                'Use the website in any way that violates applicable laws or regulations',
                'Transmit any unsolicited or unauthorised advertising or promotional material',
                'Attempt to gain unauthorised access to any part of the website or its related systems',
                'Use the website to transmit any harmful, offensive, or disruptive content',
                'Reproduce, duplicate, or resell any part of our website without express written permission',
              ]?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Intellectual Property</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              All content on this website — including text, graphics, logos, images, and software — is the property of Viralaty or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without our express written permission. Creative assets and context signal documents produced for clients remain the property of the client upon full payment of fees.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Our website and services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not guarantee specific advertising results. Advertising performance depends on many factors outside our control, including platform algorithm changes, market conditions, and the quality of your product or service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              To the fullest extent permitted by law, Viralaty shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, including but not limited to loss of profits, loss of data, or loss of goodwill. Our total liability for any claim arising from our services shall not exceed the fees paid by you in the three months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">7. Confidentiality</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Any confidential information shared with us in the course of enquiries or service delivery will be treated with strict confidentiality. We will not disclose your confidential information to third parties without your consent, except as required by law. Clients may be asked to sign a separate Non-Disclosure Agreement for sensitive engagements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">8. Third-Party Links</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">9. Governing Law</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction. For clients in the European Union, mandatory consumer protection provisions of your country of residence will apply.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">10. Changes to Terms</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">11. Contact</h2>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:hello@viralaty.com" className="text-[#5E0ED7] hover:underline">hello@viralaty.com</a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
