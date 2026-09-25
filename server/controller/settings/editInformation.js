import { pool } from "../../config/database.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export default async function updateMe(req, res) {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json(
        new ApiResponse(400, false, "Name and email are required")
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        new ApiResponse(400, false, "Please enter a valid email address")
      );
    }

    // Check if email is taken by another user
    const taken = await pool.query(
      `SELECT 1 FROM users WHERE email = $1 AND id <> $2`,
      [email.toLowerCase().trim(), req.session.userId]
    );

    if (taken.rows.length > 0) {
      return res.status(409).json(
        new ApiResponse(409, false, "Email is already in use")
      );
    }

    const { rows } = await pool.query(
      `UPDATE users
       SET name = $1, email = $2
       WHERE id = $3
       RETURNING id, name, email`,
      [name.trim(), email.toLowerCase().trim(), req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json(
        new ApiResponse(404, false, "User not found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, true, "Profile updated", { user: rows[0] })
    );
  } catch (error) {
    console.error("[updateMe] failed:", error);
    return res.status(500).json(
      new ApiResponse(500, false, "Internal server error")
    );
  }
}