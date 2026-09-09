'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Funnel } from 'recharts';

interface AnalyticsEvent {
  id: string;
  event_name: string;
  path: string | null;
  properties: Record<string, any>;
  session_id: string | null;
  created_at: string;
}

type TimeRange = '24h' | '7d' | '30d';

const BRAND = '#5E0ED7';
const COLORS = ['#5E0ED7', '#7C3AED', '#A855F7', '#C084FC', '#E879F9', '#F0ABFC'];

function getStartDate(range: TimeRange): Date {
  const now = new Date();
  if (range === '24h') return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  if (range === '7d') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
}

function formatHour(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const supabase = createClient();

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();
        setIsAdmin(!!data);
      }
      setAuthLoading(false);
    });
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.replace('/admin');
    }
  }, [authLoading, user, isAdmin]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const startDate = getStartDate(timeRange);
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });
    if (!error && data) {
      setEvents(data);
      setLastRefresh(new Date());
    }
    setLoading(false);
  }, [timeRange]);

  useEffect(() => {
    if (isAdmin) {
      fetchEvents();
    }
  }, [isAdmin, fetchEvents]);

  // Real-time subscription
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel('analytics_realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'analytics_events',
      }, (payload) => {
        const newEvent = payload.new as AnalyticsEvent;
        const startDate = getStartDate(timeRange);
        if (new Date(newEvent.created_at) >= startDate) {
          setEvents((prev) => [...prev, newEvent]);
          setLastRefresh(new Date());
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, timeRange]);

  // ── Derived metrics ──────────────────────────────────────────────────────

  const pageViews = events.filter(e => e.event_name === 'page_view');
  const ctaClicks = events.filter(e => e.event_name === 'cta_click' || e.event_name.includes('cta') || e.event_name.includes('book'));
  const formStarts = events.filter(e => e.event_name === 'form_start');
  const formSubmits = events.filter(e => e.event_name === 'form_submit' || e.event_name.includes('submit'));
  const uniqueSessions = new Set(events.map(e => e.session_id).filter(Boolean)).size;

  // Page views over time
  const pvByTime = (() => {
    const buckets: Record<string, number> = {};
    pageViews.forEach(e => {
      const key = timeRange === '24h'
        ? formatHour(e.created_at)
        : formatDay(e.created_at);
      buckets[key] = (buckets[key] || 0) + 1;
    });
    return Object.entries(buckets).map(([time, views]) => ({ time, views }));
  })();

  // Top pages
  const topPages = (() => {
    const counts: Record<string, number> = {};
    pageViews.forEach(e => {
      const p = e.path || '/';
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([page, views]) => ({ page, views }));
  })();

  // Lead source breakdown (from properties.source or path)
  const leadSources = (() => {
    const counts: Record<string, number> = {};
    events.forEach(e => {
      const src = e.properties?.source || e.properties?.plan || e.properties?.section || 'Direct';
      counts[src] = (counts[src] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }));
  })();

  // Conversion funnel
  const funnelData = [
    { name: 'Page Views', value: pageViews.length, fill: '#5E0ED7' },
    { name: 'CTA Clicks', value: ctaClicks.length, fill: '#7C3AED' },
    { name: 'Form Starts', value: formStarts.length, fill: '#A855F7' },
    { name: 'Submissions', value: formSubmits.length, fill: '#C084FC' },
  ];

  const conversionRate = pageViews.length > 0
    ? ((formSubmits.length / pageViews.length) * 100).toFixed(1)
    : '0.0';

  const ctaConversion = pageViews.length > 0
    ? ((ctaClicks.length / pageViews.length) * 100).toFixed(1)
    : '0.0';

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#5E0ED7] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const statCards = [
    { label: 'Page Views', value: pageViews.length, sub: `${uniqueSessions} sessions` },
    { label: 'CTA Clicks', value: ctaClicks.length, sub: `${ctaConversion}% CTR` },
    { label: 'Form Submissions', value: formSubmits.length, sub: `${conversionRate}% conv. rate` },
    { label: 'Unique Sessions', value: uniqueSessions, sub: `${events.length} total events` },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-white/50 hover:text-white transition text-sm">← Admin</a>
          <span className="text-white/20">/</span>
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: BRAND }}>Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/30 hidden sm:block">
            Live · Updated {lastRefresh.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <div className="flex gap-1">
            {(['24h', '7d', '30d'] as TimeRange[]).map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition ${
                  timeRange === r ? 'text-white' : 'text-white/40 hover:text-white/70 border border-white/10'
                }`}
                style={timeRange === r ? { background: BRAND } : {}}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="text-xs font-semibold tracking-widest uppercase text-white/50 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 disabled:opacity-40"
          >
            {loading ? '…' : 'Refresh'}
          </button>
        </div>
      </header>

      <div className="px-5 sm:px-8 py-8 max-w-7xl mx-auto space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div key={s.label} className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-bold text-white">{loading ? '—' : s.value.toLocaleString()}</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/40 mt-1">{s.label}</div>
              <div className="text-xs text-white/25 mt-1">{loading ? '' : s.sub}</div>
            </div>
          ))}
        </div>

        {/* Page Views Over Time */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">Page Views Over Time</h2>
          {pvByTime.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-white/20 text-sm">No data yet — events will appear here in real time</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={pvByTime} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Line type="monotone" dataKey="views" stroke={BRAND} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: BRAND }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">Conversion Funnel</h2>
            <div className="space-y-3">
              {funnelData.map((step, i) => {
                const pct = funnelData[0].value > 0
                  ? Math.round((step.value / funnelData[0].value) * 100)
                  : 0;
                return (
                  <div key={step.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-white/60 tracking-widest uppercase">{step.name}</span>
                      <span className="text-sm font-bold text-white">{loading ? '—' : step.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: COLORS[i] }}
                      />
                    </div>
                    <div className="text-[10px] text-white/25 mt-1">{pct}% of page views</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Source Breakdown */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">Lead Source Breakdown</h2>
            {leadSources.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-white/20 text-sm">No source data yet</div>
            ) : (
              <div className="flex gap-6 items-center">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie
                      data={leadSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {leadSources.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {leadSources.map((src, idx) => {
                    const total = leadSources.reduce((s, x) => s + x.value, 0);
                    const pct = total > 0 ? Math.round((src.value / total) * 100) : 0;
                    return (
                      <div key={src.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[idx % COLORS.length] }} />
                        <span className="text-xs text-white/60 truncate flex-1">{src.name}</span>
                        <span className="text-xs font-semibold text-white">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">Top Pages</h2>
          {topPages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-white/20 text-sm">No page view data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topPages} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="page" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="views" fill={BRAND} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Events Feed */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">Live Event Feed</h2>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-5 h-5 border-2 border-[#5E0ED7] border-t-transparent rounded-full" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-white/20 text-sm">No events in this period</div>
            ) : (
              [...events].reverse().slice(0, 50).map(e => (
                <div key={e.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: BRAND }} />
                  <span className="text-xs font-semibold text-white/80 w-36 shrink-0 truncate">{e.event_name}</span>
                  <span className="text-xs text-white/40 flex-1 truncate">{e.path || '—'}</span>
                  <span className="text-[10px] text-white/25 shrink-0">
                    {new Date(e.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
