import bcrypt from "bcrypt";
import { pool } from "../../config/database.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export default async function updatePassword(req, res) {
  try {
    const { current, next } = req.body;

    if (!current || !next) {
      return res.status(400).json(
        new ApiResponse(400, false, "Current and new password are required")
      );
    }

    if (next.length < 8) {
      return res.status(400).json(
        new ApiResponse(400, false, "Password must be at least 8 characters")
      );
    }

    if (current === next) {
      return res.status(400).json(
        new ApiResponse(400, false, "New password must be different from current")
      );
    }

    const { rows } = await pool.query(
      `SELECT id, password FROM users WHERE id = $1`,
      [req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(401).json(
        new ApiResponse(401, false, "Not authenticated")
      );
    }

    const user = rows[0];

    const valid = await bcrypt.compare(current, user.password);
    if (!valid) {
      return res.status(401).json(
        new ApiResponse(401, false, "Current password is incorrect")
      );
    }

    const hash = await bcrypt.hash(next, 10);

    await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [hash, req.session.userId]
    );

    return res.status(200).json(
      new ApiResponse(200, true, "Password changed successfully")
    );
  } catch (error) {
    console.error("[updatePassword] failed:", error);
    return res.status(500).json(
      new ApiResponse(500, false, "Internal server error")
    );
  }
}