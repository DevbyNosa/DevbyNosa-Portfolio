import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const statsSql = fs.readFileSync(
  path.join(__dirname, "..", "sql", "stats.sql"),
  "utf8"
);

const COUNTRY_NAMES = {
  NG: "Nigeria",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  IN: "India",
  ZA: "South Africa",
  GH: "Ghana",
  KE: "Kenya",
  AU: "Australia",
  BR: "Brazil",
  NL: "Netherlands",
  ES: "Spain",
  IT: "Italy",
};

function countryName(code) {
  return COUNTRY_NAMES[code] || code;
}

export async function getStats(req, res) {
  try {
    const days = Number(req.query.days) || 30;
    const { rows } = await pool.query(statsSql, [days]);
    const stats = Object.fromEntries(rows.map((r) => [r.section, r.data]));

    const { totalViews, uniqueVisitors, sessions, prevViews } = stats.summary;

    stats.summary.change =
      prevViews > 0
        ? `${totalViews >= prevViews ? "+" : ""}${(
            ((totalViews - prevViews) / prevViews) *
            100
          ).toFixed(1)}%`
        : "+0.0%";

    stats.countries = stats.countries.map((c) => ({
      ...c,
      name: countryName(c.code),
      percentage:
        totalViews > 0 ? Math.round((c.views / totalViews) * 100) : 0,
    }));

    stats.pages = stats.pages.map((p) => ({
      ...p,
      percentage:
        totalViews > 0 ? Math.round((p.views / totalViews) * 100) : 0,
    }));

    stats.referrers = stats.referrers.map((r) => ({
      source: r.source,
      visits: r.visits,
      percentage:
        totalViews > 0 ? Math.round((r.visits / totalViews) * 100) : 0,
    }));

    stats.devices = stats.devices.map((d) => ({
      label: d.label,
      value: totalViews > 0 ? Math.round((d.value / totalViews) * 100) : 0,
    }));

    stats.browsers = stats.browsers.map((b) => ({
      name: b.name,
      percentage:
        totalViews > 0 ? Math.round((b.percentage / totalViews) * 100) : 0,
    }));

    res.json(stats);
  } catch (err) {
    console.error("[/api/admin/stats]", err);
    res.status(500).json({ error: "Failed to load stats" });
  }
}