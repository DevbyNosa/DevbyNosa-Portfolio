import { pool } from "../config/database.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const defaults = {
  hero: {
    eyebrow: "HELLO, I'M IGBINOSA NOSAKHARE JUDGES.",
    title: "I build websites\n& web applications.",
    description: "Full-stack developer based in Nigeria, turning ideas into useful digital products with clean code and thoughtful interfaces.",
    primaryCta: "See my work",
    secondaryCta: "Let's work together",
    caption: "Full-stack developer\n& professional bug creator.",
  },
  about: {
    eyebrow: "02 — A LITTLE ABOUT ME",
    title: "I enjoy building the",
    accent: "complicated stuff.",
    body: "Give me a database, an API, authentication, payments and a problem to solve and I'm happy. I'm interested in building products that are actually useful - not just websites that look nice.",
    link: "More about me",
  },
  experience: {
    eyebrow: "03 — WORK EXPERIENCE",
    title: "What I've been working on.",
    description: "Building real-world web applications, learning through projects, and turning ideas into working products.",
  },
  contact: {
    eyebrow: "06 — LET'S TALK",
    title: "Let's build something good.",
    description: "Have a project in mind, an idea you want to bring to life, or just want to talk about building something?",
    email: "judgesnigbinosa@gmail.com",
  },
};

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS homepage_content (
      section VARCHAR(80) PRIMARY KEY,
      content JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function getContent(req, res) {
  try {
    await ensureTable();
    const { rows } = await pool.query("SELECT section, content FROM homepage_content");
    const content = { ...defaults };
    for (const row of rows) content[row.section] = { ...defaults[row.section], ...row.content };
    return res.status(200).json(new ApiResponse(200, true, "Homepage content fetched", { content }));
  } catch (error) {
    console.error("[content] fetch failed:", error);
    return res.status(500).json(new ApiResponse(500, false, "Error fetching homepage content"));
  }
}

export async function updateContent(req, res) {
  try {
    const { section, content } = req.body;
    if (!section || !defaults[section] || !content || typeof content !== "object" || Array.isArray(content)) {
      return res.status(400).json(new ApiResponse(400, false, "A valid homepage section and content are required"));
    }

    await ensureTable();
    const merged = { ...defaults[section], ...content };
    const { rows } = await pool.query(
      `INSERT INTO homepage_content (section, content, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING section, content, updated_at`,
      [section, JSON.stringify(merged)]
    );

    return res.status(200).json(new ApiResponse(200, true, "Homepage section updated", { section: rows[0] }));
  } catch (error) {
    console.error("[content] update failed:", error);
    return res.status(500).json(new ApiResponse(500, false, "Error updating homepage content"));
  }
}
