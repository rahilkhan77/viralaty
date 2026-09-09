-- Analytics events table for real-time dashboard
-- Tracks: page_view, cta_click, form_start, form_submit events

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  path TEXT,
  properties JSONB DEFAULT '{}'::jsonb,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast dashboard queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON public.analytics_events(path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone (public) can insert events (anonymous tracking)
DROP POLICY IF EXISTS "public_insert_analytics_events" ON public.analytics_events;
CREATE POLICY "public_insert_analytics_events"
  ON public.analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can read analytics data
DROP POLICY IF EXISTS "admin_read_analytics_events" ON public.analytics_events;
CREATE POLICY "admin_read_analytics_events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admins can delete old events
DROP POLICY IF EXISTS "admin_delete_analytics_events" ON public.analytics_events;
CREATE POLICY "admin_delete_analytics_events"
  ON public.analytics_events
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
