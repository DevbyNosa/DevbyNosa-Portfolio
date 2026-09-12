import crypto from "crypto";
import { pool } from "../config/database.js";
import {UAParser} from "ua-parser-js";
import geoip from "geoip-lite";

export async function trackHandler(req, res) {
  try {
    const { path, referrer } = req.body || {};

    // Bail early on garbage input, better than throwing mid-parse
    if (!path || typeof path !== "string") {
      return res.status(400).json({ error: "path is required" });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";
    const ua = req.headers["user-agent"] || "";

    //  Hash IP + UA so we never store either raw
    const visitorId = crypto
      .createHash("sha256")
      .update(ip + ua + (process.env.HASH_SALT || ""))
      .digest("hex")
      .slice(0, 16);

    //  Parse user agent, wrapped since malformed UAs can throw
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

    //  Geo lookup, offline, but can still throw on malformed IPs
    let country = null;
    let city = null;
    try {
      const geo = geoip.lookup(ip);
      country = geo?.country || null;
      city = geo?.city || null;
    } catch (err) {
      console.warn("[track] geo lookup failed:", err.message);
    }

    const countryName = null;   // map code → name client-side

    // Normalize referrer, URL() throws on malformed URLs
    let referrerHost = null;
    if (referrer) {
      try {
        referrerHost = new URL(referrer).hostname.replace(/^www\./, "");
      } catch {
        referrerHost = null;
      }
    }

    // reuse cookie if present, else generate
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

    // Insert the main failure point
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