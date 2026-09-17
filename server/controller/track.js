import crypto from "crypto";
import { pool } from "../config/database.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

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

const IGNORED_PATHS = ["/health", "/favicon.ico", "/robots.txt"];

export async function trackHandler(req, res) {
  try {
    const { path, referrer } = req.body || {};

    if (!path || typeof path !== "string") {
      return res.status(400).json({ error: "path is required" });
    }

    if (IGNORED_PATHS.includes(path)) {
      return res.status(204).end();
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";
    const ua = req.headers["user-agent"] || "";

    const visitorId = crypto
      .createHash("sha256")
      .update(ip + ua + (process.env.HASH_SALT || ""))
      .digest("hex")
      .slice(0, 16);

    let device = "Desktop";
    let browser = "Other";
    let os = "Other";
    try {
      const parsed = new UAParser(ua).getResult();
      device =
        parsed.device.type === "mobile" ? "Mobile"
        : parsed.device.type === "tablet" ? "Tablet"
        : "Desktop";
      browser = parsed.browser.name || "Other";
      os = parsed.os.name || "Other";
    } catch (err) {
      console.warn("[track] UA parse failed:", err.message);
    }

    let country = null;
    let city = null;
    try {
      const geo = geoip.lookup(ip);
      country = geo?.country || null;
      city = geo?.city || null;
    } catch (err) {
      console.warn("[track] geo lookup failed:", err.message);
    }

    // Dev-only mock so localhost shows a country
    if (!country && (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127"))) {
      country = "NG";
      city = "Lagos";
    }

    const countryName = country ? (COUNTRY_NAMES[country] || country) : null;

    let referrerHost = null;
    if (referrer) {
      try {
        referrerHost = new URL(referrer).hostname.replace(/^www\./, "");
      } catch {
        referrerHost = null;
      }
    }

    let sessionId = req.cookies?.sid;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      try {
        res.cookie("sid", sessionId, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 30 * 60 * 1000,
        });
      } catch (err) {
        console.warn("[track] cookie set failed:", err.message);
      }
    }

    const { rowCount } = await pool.query(
      `SELECT 1 FROM page_views
       WHERE visitor_id = $1
         AND path = $2
         AND created_at > NOW() - INTERVAL '30 minutes'
       LIMIT 1`,
      [visitorId, path]
    );

    if (rowCount > 0) {
      return res.status(204).end();
    }

    await pool.query(
      `INSERT INTO page_views
        (path, referrer, referrer_host, country, country_name, city,
         device, browser, os, session_id, visitor_id, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        path,
        referrer || null,
        referrerHost,
        country,
        countryName,
        city,
        device,
        browser,
        os,
        sessionId,
        visitorId,
        ua,
      ]
    );

    return res.status(204).end();
  } catch (err) {
    console.error("[track] failed:", err);
    return res.status(204).end();
  }
}