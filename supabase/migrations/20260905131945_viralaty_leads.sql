-- Viralaty leads and contact submissions
-- Tables: booking_leads, contact_submissions, admin_users

-- 1. booking_leads table
CREATE TABLE IF NOT EXISTS public.booking_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  budget TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. admin_users table (for admin dashboard access)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_booking_leads_email ON public.booking_leads(email);
CREATE INDEX IF NOT EXISTS idx_booking_leads_created_at ON public.booking_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_leads_status ON public.booking_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Triggers
DROP TRIGGER IF EXISTS booking_leads_updated_at ON public.booking_leads;
CREATE TRIGGER booking_leads_updated_at
  BEFORE UPDATE ON public.booking_leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS contact_submissions_updated_at ON public.contact_submissions;
CREATE TRIGGER contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.booking_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin check function (uses auth metadata to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
  SELECT 1 FROM public.admin_users
  WHERE id = auth.uid()
)
$$;

-- RLS Policies: booking_leads
-- Anyone can insert (public form submission)
DROP POLICY IF EXISTS "public_insert_booking_leads" ON public.booking_leads;
CREATE POLICY "public_insert_booking_leads"
  ON public.booking_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can read/update/delete
DROP POLICY IF EXISTS "admin_manage_booking_leads" ON public.booking_leads;
CREATE POLICY "admin_manage_booking_leads"
  ON public.booking_leads
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- RLS Policies: contact_submissions
DROP POLICY IF EXISTS "public_insert_contact_submissions" ON public.contact_submissions;
CREATE POLICY "public_insert_contact_submissions"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_manage_contact_submissions" ON public.contact_submissions;
CREATE POLICY "admin_manage_contact_submissions"
  ON public.contact_submissions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- RLS Policies: admin_users
DROP POLICY IF EXISTS "admin_users_manage_own" ON public.admin_users;
CREATE POLICY "admin_users_manage_own"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());
