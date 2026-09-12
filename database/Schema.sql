-- Page views — the single source of truth
CREATE TABLE page_views (
  id              BIGSERIAL PRIMARY KEY,
  path            TEXT NOT NULL,
  referrer        TEXT,
  referrer_host   TEXT,
  country         CHAR(2),
  country_name    TEXT,
  city            TEXT,
  device          TEXT,        -- 'Desktop' | 'Mobile' | 'Tablet'
  browser         TEXT,        -- 'Chrome' | 'Safari' | ...
  os              TEXT,
  session_id      TEXT NOT NULL,
  visitor_id      TEXT NOT NULL,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pv_created    ON page_views (created_at DESC);
CREATE INDEX idx_pv_path       ON page_views (path);
CREATE INDEX idx_pv_country    ON page_views (country);
CREATE INDEX idx_pv_visitor    ON page_views (visitor_id);
CREATE INDEX idx_pv_session    ON page_views (session_id);
CREATE INDEX idx_pv_referrer   ON page_views (referrer_host);