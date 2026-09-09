'use client';
import React, { useState } from 'react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full text-white" style={{ background: '#5E0ED7' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-2.5 flex items-center gap-3 text-sm">
        <span className="hidden sm:inline shrink-0 px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold tracking-widest uppercase">
          New
        </span>
        <p className="flex-1 leading-snug">
          <span className="hidden md:inline">Try Measure.co — enabling brands to take control of their AI Search Visibility. </span>
          <span className="md:hidden">Try Measure.co — take control of your AI Search Visibility. </span>
          <a
            href="https://www.measure.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 underline underline-offset-2 font-semibold"
          >
            Visit Measure.co
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 rounded hover:bg-white/15 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
