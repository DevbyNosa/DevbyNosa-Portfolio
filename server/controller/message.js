// controllers/message.controller.js
import { pool } from "../config/database.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─────────────────────────────────────────────
// Controller handlers (read req, send res)
// ─────────────────────────────────────────────

export async function sendMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Name, email and message are required"));
    }

    const { rows } = await pool.query(
      `INSERT INTO messages (name, email, body)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    return res.status(201).json(
      new ApiResponse(201, true, "Message sent successfully!", {
        message: mapRow(rows[0]),
      })
    );
  } catch (error) {
    console.error("[messages] send failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error sending message"));
  }
}

export async function getMessages(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM messages ORDER BY created_at DESC`
    );
    return res
      .status(200)
      .json(new ApiResponse(200, true, "Messages fetched", {
        messages: rows.map(mapRow),
      }));
  } catch (error) {
    console.error("[messages] fetch failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error fetching messages"));
  }
}

export async function toggleRead(req, res) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE messages SET is_read = NOT is_read WHERE id = $1`,
      [req.params.id]
    );
    if (rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Message not found"));
    }
    return res.status(204).end();
  } catch (error) {
    console.error("[messages] toggle read failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error updating message"));
  }
}

export async function toggleStar(req, res) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE messages SET is_starred = NOT is_starred WHERE id = $1`,
      [req.params.id]
    );
    if (rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Message not found"));
    }
    return res.status(204).end();
  } catch (error) {
    console.error("[messages] toggle star failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error updating message"));
  }
}

export async function toggleArchive(req, res) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE messages SET is_archived = NOT is_archived WHERE id = $1`,
      [req.params.id]
    );
    if (rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Message not found"));
    }
    return res.status(204).end();
  } catch (error) {
    console.error("[messages] toggle archive failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error updating message"));
  }
}

export async function deleteMessage(req, res) {
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM messages WHERE id = $1`,
      [req.params.id]
    );
    if (rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Message not found"));
    }
    return res.status(204).end();
  } catch (error) {
    console.error("[messages] delete failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error deleting message"));
  }
}

// ─────────────────────────────────────────────
// Row → API shape
// ─────────────────────────────────────────────

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject || "",
    body: row.body,                  
    isRead: row.is_read,
    isStarred: row.is_starred,
    isArchived: row.is_archived,
    createdAt: row.created_at,
  };
}