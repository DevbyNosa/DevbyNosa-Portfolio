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

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(15),
  password VARCHAR(255),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description Text,
  image VARCHAR(255),
 
  github VARCHAR(255),
  domain VARCHAR(255),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage_content (
  section VARCHAR(80) PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE projects ADD COLUMN stack TYPE TEXT USING array_to_string(stack, ', ');

ALTER TABLE projects 
ADD COLUMN  project_status VARCHAR(255) DEFAULT 'draft'
ALTER TABLE projects ADD COLUMN image_id TEXT;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  body TEXT,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blogs (
  id            BIGSERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  excerpt       TEXT NOT NULL,
  content       TEXT NOT NULL,
  tags          TEXT[] DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'draft',
  read_time     TEXT,
  cover         TEXT,
  cover_id      TEXT,
  views         INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blogs_created ON blogs (created_at DESC);
CREATE INDEX idx_blogs_status  ON blogs (status);

ALTER TABLE messages ADD COLUMN is_starred BOOLEAN DEFAULT false



CREATE INDEX idx_pv_created    ON page_views (created_at DESC);
CREATE INDEX idx_pv_path       ON page_views (path);
CREATE INDEX idx_pv_country    ON page_views (country);
CREATE INDEX idx_pv_visitor    ON page_views (visitor_id);
CREATE INDEX idx_pv_session    ON page_views (session_id);
CREATE INDEX idx_pv_referrer   ON page_views (referrer_host);