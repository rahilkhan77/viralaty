import React from 'react';
import Link from 'next/link';

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white px-5 sm:px-8 md:px-12 pt-16 pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/viralaty-logo-removebg-preview-1788527123870.png"
              alt="Viralaty"
              className="h-8 w-auto"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed max-w-md text-white/70">
            A done-for-you AI advertising agency. We engineer creative, deploy campaigns, and grow revenue across AI-native ad platforms and the performance channels that continue to convert.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#5E0ED7' }}
          >
            Book a Call <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Agency */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-semibold text-white/50">Agency</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="hover:opacity-70" href="/services">Services</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Ads Management</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Campaign Management</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Account Setup</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Creative &amp; Context Signals</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Product Feed</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Measurement</a></li>
            <li><a className="hover:opacity-70 text-white/70" href="/services">Europe Launch</a></li>
            <li><a className="hover:opacity-70" href="/about">About</a></li>
            <li><a className="hover:opacity-70" href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Start Here */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-semibold text-white/50">Start Here</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">What Are AI Ads?</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">Ads Manager Setup Guide</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">Context Signals Explained</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">AI Ads Cost &amp; Pricing</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">Conversion Campaigns (oCPC)</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">Conversion Tracking Setup</a></li>
            <li><a className="hover:opacity-70 text-white/90" href="/what-are-ai-ads">Choosing an AI Ads Agency</a></li>
            <li>
              <a
                className="hover:opacity-70 inline-flex items-center gap-1"
                style={{ color: '#5E0ED7' }}
                href="/guides"
              >
                All guides <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-semibold text-white/50">Resources</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="hover:opacity-70" href="/guides">Guides</a></li>
            <li><a className="hover:opacity-70" href="/free-tools">Free Tools</a></li>
            <li><a className="hover:opacity-70" href="/faq">FAQ</a></li>
            <li><a className="hover:opacity-70" href="/privacy">Privacy</a></li>
            <li><a className="hover:opacity-70" href="/terms">Terms</a></li>
            <li><a href="mailto:hello@viralaty.com" className="hover:opacity-70">hello@viralaty.com</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
        <div>&copy; 2026 Viralaty. All rights reserved.</div>
        <div className="tracking-widest uppercase">A Done For You AI Advertising Agency</div>
      </div>
    </footer>
  );
}
