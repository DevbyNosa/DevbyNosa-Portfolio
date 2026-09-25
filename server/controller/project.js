import { pool } from "../config/database.js";
import { ApiResponse } from "../utils/ApiResponse.js";

 export async function getProjectStats(req, res)  {
  try {
   const { rows } = await pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE project_status = 'live')::int AS live,
        COUNT(*) FILTER (WHERE project_status = 'archived')::int AS archived,
        COUNT(*) FILTER (WHERE project_status = 'draft')::int AS draft
      FROM projects
  `);

  const stats = rows[0];

  res.status(200).json(
    new ApiResponse(200, true, "Project stats fetched", stats)
  );

  } catch (error) {
    console.error("[projects] stats failed:", error);
      return res.status(500).json(
        new ApiResponse(500, false, "Error fetching project stats")
      );
  }
 }


 export async function getProjects(req, res) {
  try {
    const response = await pool.query(`SELECT * FROM projects`);

    const projectsData = response.rows;

    return res.status(200).json(
      new ApiResponse(200, true, "Login successful", { projects: projectsData })
    );
  } catch (error) {
    console.error("Error getting Project stats", error)
     return res.status(500).json(
        new ApiResponse(500, false, "Error fetching Project data")
      ); 
  }
 }
 

 export async function uploadProjects(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { title, description, stack, status, github, domain } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }

    const imageUrl = req.file.path;      
    const imageId = req.file.filename;   

    
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const slugCheck = await pool.query(
      `SELECT 1 FROM projects WHERE slug = $1`,
      [slug]
    );
    if (slugCheck.rows.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }


    const { rows } = await pool.query(
      `INSERT INTO projects (title, slug, description, image, image_id, stack, project_status, github, domain)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, description, imageUrl, imageId, stack, status, github, domain]
    );

    return res.status(201).json(
      new ApiResponse(201, true, "Project uploaded successfully", {
        project: rows[0],
      })
    );
  } catch (error) {
    console.error("[projects] upload failed:", error);
    return res.status(500).json(
      new ApiResponse(500, false, "Error uploading new Project data")
    );
  }
}

export async function updateProjects(req, res) {
  try {
    const id = req.params.id;
    const { title, description, stack, status, github, domain } = req.body;
    
    
    let imageId = req.file ? req.file.filename : null;

    let query;
    let values;

    if (imageId) {
      query = `
        UPDATE projects 
        SET title = $1, description = $2, image = $3, stack = $4, project_status = $5, github = $6, domain = $7 
        WHERE id = $8 
        RETURNING *;
      `;
      values = [title, description, imageId, stack, status, github, domain, id];
    } else {
      query = `
        UPDATE projects 
        SET title = $1, description = $2, stack = $3, project_status = $4, github = $5, domain = $6 
        WHERE id = $7 
        RETURNING *;
      `;
      values = [title, description, stack, status, github, domain, id];
    }

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json(new ApiResponse(404, false, "Project not found"));
    }

    return res.status(200).json(
      new ApiResponse(200, true, "Project updated successfully", {
        project: rows[0],
      })
    );
  } catch (error) {
    console.error("[projects] update failed: ", error);
    return res.status(500).json(new ApiResponse(500, false, "Error patching project data"));
  }
}

export async function deleteProjects(req, res) {
  try {
    const id = req.params.id;

    const {rows} = await pool.query(`DELETE FROM projects WHERE id = $1 RETURNING *`, [id]);

    if (rows.length === 0) {
      return res.status(404).json(new ApiResponse(404, false, "Project not found"));
    }

    return res.status(200).json(
      new ApiResponse(200, true, "Project deleted successfully", {
        project: rows[0],
      })
    );

  } catch(error) {
    console.error("[projects] delete failed: ", error);
    return res.status(500).json(new ApiResponse(500, false, "Error deleting project data"));
  }
  
}

export async function publicProjects(req, res) {
  try {
    const limit = Number(req.query.limit) || 6;
    const { rows } = await pool.query(
      `SELECT * FROM projects
       WHERE project_status = 'live'
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    const projects = rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      image: row.image,
      tags: row.stack || [],
      repo: row.github,
      link: row.domain,
      status: row.project_status,
      updatedAt: row.updated_at,
      createdAt: row.created_at,
      views: row.views || 0,
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, true, "Projects fetched", { projects }));
  } catch (error) {
    console.error("[public projects] failed:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Error fetching projects"));
  }
}