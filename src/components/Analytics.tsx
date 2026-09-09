'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

declare global {
  interface Window {
    va?: (event: string, data?: any) => void;
  }
}

// Generate or retrieve a session ID (no PII, just a random ID per tab session)
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const key = '_va_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

async function persistEvent(name: string, properties?: Record<string, any>) {
  try {
    const supabase = createClient();
    await supabase.from('analytics_events').insert({
      event_name: name,
      path: typeof window !== 'undefined' ? window.location.pathname : null,
      properties: properties || {},
      session_id: getSessionId(),
    });
  } catch {
    // Silently fail — analytics must never break the app
  }
}

export function trackEvent(name: string, properties?: Record<string, any>) {
  // Vercel Analytics (if available)
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { name, ...(properties ? { properties } : {}) });
  }
  // Persist to Supabase
  persistEvent(name, properties);
}

export default function Analytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    trackEvent('page_view', { path: pathname });
  }, [pathname]);

  return null;
}
