WITH bounds AS (
  SELECT
    NOW() - ($1 || ' days')::interval AS since,
    NOW() - (($1::int * 2) || ' days')::interval AS prev_since
),
current AS (
  SELECT * FROM page_views, bounds WHERE created_at >= bounds.since
)
SELECT 'summary' AS section, json_build_object(
  'totalViews',     (SELECT COUNT(*) FROM current),
  'uniqueVisitors', (SELECT COUNT(DISTINCT visitor_id) FROM current),
  'sessions',       (SELECT COUNT(DISTINCT session_id) FROM current),
  'countries',      (SELECT COUNT(DISTINCT country) FROM current),
  'prevViews',      (SELECT COUNT(*) FROM page_views, bounds
                     WHERE created_at >= bounds.prev_since
                       AND created_at <  bounds.since)
) AS data

UNION ALL

SELECT 'countries', COALESCE(json_agg(t), '[]'::json) FROM (
  SELECT country AS code, COUNT(*)::int AS views
  FROM current WHERE country IS NOT NULL
  GROUP BY country ORDER BY views DESC LIMIT 6
) t

UNION ALL

SELECT 'pages', COALESCE(json_agg(t), '[]'::json) FROM (
  SELECT path AS page, COUNT(*)::int AS views
  FROM current GROUP BY path ORDER BY views DESC LIMIT 5
) t

UNION ALL

SELECT 'referrers', COALESCE(json_agg(t), '[]'::json) FROM (
  SELECT referrer_host AS source, COUNT(*)::int AS visits
  FROM current WHERE referrer_host IS NOT NULL
  GROUP BY referrer_host ORDER BY visits DESC LIMIT 5
) t

UNION ALL

SELECT 'devices', COALESCE(json_agg(t), '[]'::json) FROM (
  SELECT device AS label, COUNT(*)::int AS value
  FROM current WHERE device IS NOT NULL
  GROUP BY device ORDER BY value DESC
) t

UNION ALL

SELECT 'browsers', COALESCE(json_agg(t), '[]'::json) FROM (
  SELECT browser AS name, COUNT(*)::int AS percentage
  FROM current WHERE browser IS NOT NULL
  GROUP BY browser ORDER BY percentage DESC
) t

UNION ALL

SELECT 'chart', COALESCE(json_agg(t ORDER BY t.date), '[]'::json) FROM (
  SELECT DATE(created_at) AS date, COUNT(*)::int AS views
  FROM current GROUP BY DATE(created_at)
) t;