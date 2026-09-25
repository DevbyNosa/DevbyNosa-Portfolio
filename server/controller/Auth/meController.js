import { pool } from "../../config/database.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export default async function me(req, res) {
  try {
   
    const { rows } = await pool.query(
      `SELECT id, email, name FROM users WHERE id = $1`,
      [req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(401).json(
        new ApiResponse(401, false, "Not authenticated")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, true, "Authenticated", { user: rows[0] })
    );
  } catch (error) {
    console.error("[me] failed:", error);
    return res.status(500).json(
      new ApiResponse(500, false, "Internal server error")
    );
  }
}