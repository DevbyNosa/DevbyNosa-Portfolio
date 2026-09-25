CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_host TEXT,
  country CHAR(2),
  country_name TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(255) NOT NULL DEFAULT 'admin',
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  image_id TEXT,
  stack TEXT NOT NULL DEFAULT '',
  project_status VARCHAR(255) NOT NULL DEFAULT 'draft',
  github VARCHAR(255),
  domain VARCHAR(255),
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage_content (
  section VARCHAR(80) PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  body TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_starred BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blogs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  read_time TEXT,
  cover TEXT,
  cover_id TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pv_created ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pv_path ON page_views (path);
CREATE INDEX IF NOT EXISTS idx_pv_country ON page_views (country);
CREATE INDEX IF NOT EXISTS idx_pv_visitor ON page_views (visitor_id);
CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_pv_referrer ON page_views (referrer_host);
CREATE INDEX IF NOT EXISTS idx_blogs_created ON blogs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs (status);