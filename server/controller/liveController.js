import { pool } from "../config/database.js";

export async function getLive(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT
        COALESCE(city || ', ', '') || COALESCE(country_name, country, 'Unknown') AS location,
        path AS page,
        device,
        created_at
      FROM page_views
      ORDER BY created_at DESC
      LIMIT 20
    `);
    res.json(rows);
  } catch (err) {
    console.error("[/api/admin/live]", err);
    res.status(500).json({ error: "Failed to load live visitors" });
  }
}