'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  budget: string;
  service?: string;
  message?: string;
  status: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  status: string;
  created_at: string;
}

type Tab = 'bookings' | 'contacts';
type StatusFilter = 'all' | 'new' | 'reviewed' | 'converted';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [tab, setTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selected, setSelected] = useState<Lead | ContactSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        await checkAdminStatus(session.user.id);
      }
      setAuthLoading(false);
    });
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    setIsAdmin(!!data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) {
        setLoginError(error.message);
        setLoginLoading(false);
        return;
      }
      if (data.user) {
        setUser(data.user);
        await checkAdminStatus(data.user.id);
      }
      setLoginLoading(false);
    } catch (err: any) {
      setLoginError('Login failed. Please try again.');
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, tab, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'bookings') {
        let query = supabase
          .from('booking_leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (statusFilter !== 'all') query = query.eq('status', statusFilter);
        const { data, error } = await query;
        if (error) { setError(error.message); } else { setBookings(data || []); }
      } else {
        let query = supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (statusFilter !== 'all') query = query.eq('status', statusFilter);
        const { data, error } = await query;
        if (error) { setError(error.message); } else { setContacts(data || []); }
      }
    } catch (err: any) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const table = tab === 'bookings' ? 'booking_leads' : 'contact_submissions';
    const { error } = await supabase.from(table).update({ status }).eq('id', id);
    if (!error) {
      fetchData();
      if (selected && (selected as any).id === id) {
        setSelected({ ...selected, status } as any);
      }
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase()) ||
    b.company.toLowerCase().includes(search.toLowerCase())
  );

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      reviewed: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      converted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#5E0ED7] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#5E0ED7' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-widest uppercase text-sm">Viralaty Admin</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Sign in</h1>
            <p className="mt-2 text-sm text-white/50">Access the admin dashboard</p>
          </div>

          {user && !isAdmin && (
            <div className="mb-4 p-3 rounded-xl bg-red-900/20 border border-red-800 text-sm text-red-400 text-center">
              This account does not have admin access.
              <button onClick={handleLogout} className="block mx-auto mt-2 text-xs underline text-white/50 hover:text-white">Sign out</button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-900/20 border border-red-800 text-sm text-red-400">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-1.5" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@viralaty.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 outline-none focus:ring-2 focus:ring-[#5E0ED7]/40 focus:border-[#5E0ED7]/40 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-1.5" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 outline-none focus:ring-2 focus:ring-[#5E0ED7]/40 focus:border-[#5E0ED7]/40 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white tracking-widest uppercase transition disabled:opacity-60"
              style={{ background: '#5E0ED7' }}
            >
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentItems = tab === 'bookings' ? filteredBookings : filteredContacts;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="text-white/50 hover:text-white transition text-sm">← Viralaty</a>
          <span className="text-white/20">/</span>
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#5E0ED7' }}>Admin</span>
          <span className="text-white/20">/</span>
          <a href="/admin/analytics" className="text-sm text-white/50 hover:text-white transition tracking-widest uppercase font-semibold">Analytics</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/40 hidden sm:block">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold tracking-widest uppercase text-white/50 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="px-5 sm:px-8 py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length },
            { label: 'New Bookings', value: bookings.filter(b => b.status === 'new').length },
            { label: 'Total Contacts', value: contacts.length },
            { label: 'New Contacts', value: contacts.filter(c => c.status === 'new').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111111] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs + Search + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {(['bookings', 'contacts'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSelected(null); setSearch(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition ${
                  tab === t
                    ? 'text-white' :'text-white/40 hover:text-white/70 border border-white/10'
                }`}
                style={tab === t ? { background: '#5E0ED7' } : {}}
              >
                {t === 'bookings' ? 'Booking Leads' : 'Contact Messages'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <input
              type="text"
              placeholder="Search name, email, company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm outline-none focus:ring-1 focus:ring-[#5E0ED7]/40 w-full sm:w-64"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 rounded-lg border border-white/10 bg-[#111111] text-white text-sm outline-none focus:ring-1 focus:ring-[#5E0ED7]/40"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/20 border border-red-800 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin w-6 h-6 border-2 border-[#5E0ED7] border-t-transparent rounded-full" />
              </div>
            ) : currentItems.length === 0 ? (
              <div className="text-center py-16 text-white/30 text-sm">No submissions found.</div>
            ) : (
              currentItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    selected?.id === item.id
                      ? 'border-[#5E0ED7]/50 bg-[#5E0ED7]/10'
                      : 'border-white/10 bg-[#111111] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-white truncate">{item.name}</div>
                      <div className="text-xs text-white/40 truncate">{item.email}</div>
                      <div className="text-xs text-white/30 mt-0.5">{item.company}</div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] text-white/30">{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="text-sm text-[#5E0ED7] hover:underline">{selected.email}</a>
                  </div>
                  <span className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${statusBadge(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Company', value: selected.company },
                    { label: 'Budget', value: selected.budget },
                    ...(tab === 'bookings' ? [
                      { label: 'Service', value: (selected as Lead).service || '—' },
                      { label: 'Website', value: (selected as Lead).website || '—' },
                    ] : []),
                    { label: 'Submitted', value: formatDate(selected.created_at) },
                  ].map((row) => (
                    <div key={row.label} className="bg-white/5 rounded-xl p-3">
                      <div className="text-[10px] tracking-widest uppercase text-white/35 mb-1">{row.label}</div>
                      <div className="text-sm text-white font-medium break-all">{row.value}</div>
                    </div>
                  ))}
                </div>

                {(selected as any).message && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">Message</div>
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{(selected as any).message}</p>
                  </div>
                )}

                <div>
                  <div className="text-[10px] tracking-widest uppercase text-white/35 mb-2">Update Status</div>
                  <div className="flex gap-2 flex-wrap">
                    {(['new', 'reviewed', 'converted'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition ${
                          selected.status === s
                            ? 'text-white' :'border border-white/10 text-white/50 hover:text-white hover:border-white/20'
                        }`}
                        style={selected.status === s ? { background: '#5E0ED7' } : {}}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Viralaty Enquiry`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase text-white border border-white/10 hover:border-white/20 transition"
                  >
                    Reply by Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <p className="text-white/30 text-sm">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
