import { pool } from "../config/database.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinary } from "../config/cloudinary.js";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

async function uniqueSlug(base, excludeId = null) {
  let slug = base;
  let n = 0;
  while (true) {
    const query = excludeId
      ? `SELECT 1 FROM blogs WHERE slug = $1 AND id <> $2`
      : `SELECT 1 FROM blogs WHERE slug = $1`;
    const params = excludeId ? [slug, excludeId] : [slug];
    const { rowCount } = await pool.query(query, params);
    if (rowCount === 0) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags || [],
    status: row.status,
    readTime: row.read_time,
    cover: row.cover,
    coverId: row.cover_id,
    views: row.views,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ─────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────
export async function createBlog(req, res) {
  try {
    const { title, excerpt, content, status, read_time, tags, slug } = req.body;

    if (!title?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Title is required"));
    }
    if (!excerpt?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Excerpt is required"));
    }
    if (!content?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Content is required"));
    }

    const finalSlug = await uniqueSlug(slugify(slug || title));
    const cover = req.file?.path ?? null;
    const coverId = req.file?.filename ?? null;

    const { rows } = await pool.query(
      `INSERT INTO blogs
        (title, slug, excerpt, content, tags, status, read_time, cover, cover_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        parseTags(tags),
        (status || "draft").toLowerCase(),
        read_time || null,
        cover,
        coverId,
      ]
    );

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Post created", { post: mapRow(rows[0]) }));
  } catch (error) {
    console.error("[blog] create failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error creating post"));
  }
}

// ─────────────────────────────────────────────
// LIST
// ─────────────────────────────────────────────
export async function listBlogs(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM blogs ORDER BY created_at DESC`
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Posts fetched", {
          blogs: rows.map(mapRow),
        })
      );
  } catch (error) {
    console.error("[blog] list failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error fetching posts"));
  }
}

// ─────────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────────
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, excerpt, content, status, read_time, tags, slug } = req.body;

    const existing = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [id]);
    if (existing.rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Post not found"));
    }
    const old = existing.rows[0];

    if (!title?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Title is required"));
    }
    if (!excerpt?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Excerpt is required"));
    }
    if (!content?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, false, "Content is required"));
    }

    const finalSlug = await uniqueSlug(slugify(slug || title), id);

    let cover = old.cover;
    let coverId = old.cover_id;

    if (req.file) {
      cover = req.file.path;
      coverId = req.file.filename;

      if (old.cover_id) {
        try {
          await cloudinary.uploader.destroy(old.cover_id);
        } catch (err) {
          console.warn("[blog] cloudinary destroy failed:", err.message);
        }
      }
    }

    const { rows } = await pool.query(
      `UPDATE blogs SET
         title      = $1,
         slug       = $2,
         excerpt    = $3,
         content    = $4,
         tags       = $5,
         status     = $6,
         read_time  = $7,
         cover      = $8,
         cover_id   = $9,
         updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        parseTags(tags),
        (status || "draft").toLowerCase(),
        read_time || null,
        cover,
        coverId,
        id,
      ]
    );

    return res
      .status(200)
      .json(new ApiResponse(200, true, "Post updated", { post: mapRow(rows[0]) }));
  } catch (error) {
    console.error("[blog] update failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error updating post"));
  }
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      `SELECT cover_id FROM blogs WHERE id = $1`,
      [id]
    );
    if (existing.rowCount === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Post not found"));
    }

    const { cover_id } = existing.rows[0];

    if (cover_id) {
      try {
        await cloudinary.uploader.destroy(cover_id);
      } catch (err) {
        console.warn("[blog] cloudinary destroy failed:", err.message);
      }
    }

    await pool.query(`DELETE FROM blogs WHERE id = $1`, [id]);

    return res.status(204).end();
  } catch (error) {
    console.error("[blog] delete failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error deleting post"));
  }
}

export async function publicBlogs(req, res) {
  try {
    const limit = Number(req.query.limit) || 6;
    const { rows } = await pool.query(
      `SELECT * FROM blogs
       WHERE status = 'published'
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Posts fetched", {
          blogs: rows.map(mapRow),
        })
      );
  } catch (error) {
    console.error("[public blogs] failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error fetching posts"));
  }
}

export async function publicBlogBySlug(req, res) {
  try {
    const { slug } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM blogs WHERE slug = $1 AND status = 'published'`,
      [slug]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, false, "Post not found"));
    }

    const post = {
      id: rows[0].id,
      title: rows[0].title,
      slug: rows[0].slug,
      excerpt: rows[0].excerpt,
      content: rows[0].content,
      tags: rows[0].tags || [],
      status: rows[0].status,
      readTime: rows[0].read_time,
      cover: rows[0].cover,
      views: rows[0].views,
      createdAt: rows[0].created_at,
      updatedAt: rows[0].updated_at,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, true, "Post fetched", { post }));
  } catch (error) {
    console.error("[public blog] failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error fetching post"));
  }
}