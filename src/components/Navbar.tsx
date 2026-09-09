'use client';
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'What Are AI Ads?', href: '/what-are-ai-ads' },
  { label: 'Guides', href: '/guides' },
  { label: 'Free Tools', href: '/free-tools' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleBookCallClick = () => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', { name: 'book_a_call_click', properties: { source: 'navbar' } });
    }
  };

  return (
    <nav className="relative z-30 flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
      {/* Logo */}
      <a aria-label="Viralaty home" className="flex items-center gap-2" href="/">
        <img
          src="/assets/images/viralaty-logo-removebg-preview-1788527123870.png"
          alt="Viralaty"
          className="h-8 w-auto"
          style={{ filter: theme === 'dark' ? 'invert(0)' : 'invert(1)' }}
        />
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {navLinks?.map((item) => (
          <a
            key={item?.href}
            className="text-[12px] lg:text-[13px] font-semibold tracking-widest uppercase whitespace-nowrap transition hover:opacity-70 opacity-90 text-black dark:text-white"
            href={item?.href}
          >
            {item?.label}
          </a>
        ))}
      </div>

      {/* CTA + Theme Toggle + Hamburger */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <Link
          href="/booking"
          onClick={handleBookCallClick}
          className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-white"
          style={{ background: '#5E0ED7' }}
        >
          Book a Call
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-9 h-9 rounded-full bg-black dark:bg-white flex flex-col items-center justify-center gap-1 md:hidden"
        >
          <span className="w-4 h-0.5 bg-white dark:bg-black" />
          <span className="w-4 h-0.5 bg-white dark:bg-black" />
          <span className="w-4 h-0.5 bg-white dark:bg-black" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#111111] border-t border-black/5 dark:border-white/10 shadow-lg z-50 px-5 py-6 flex flex-col gap-4 md:hidden">
          {navLinks?.map((item) => (
            <a
              key={item?.href}
              className="text-sm font-semibold tracking-widest uppercase text-black dark:text-white hover:opacity-70"
              href={item?.href}
              onClick={() => setMenuOpen(false)}
            >
              {item?.label}
            </a>
          ))}
          <Link
            href="/booking"
            onClick={() => { setMenuOpen(false); handleBookCallClick(); }}
            className="inline-flex items-center justify-center gap-1 px-4 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white mt-2"
            style={{ background: '#5E0ED7' }}
          >
            Book a Call →
          </Link>
        </div>
      )}
    </nav>
  );
}
