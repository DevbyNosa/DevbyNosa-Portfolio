import pool from '../database/config/config.js';
import 'dotenv/config';

const adminUrl = process.env.ADMIN_PREFIX || "admin";


function getAdminData(req) {
    return {
        adminUsername: req.session.adminUser,
        adminLink: adminUrl,
    };
}

export async function AdminDashboard(req, res, next) {
    try {
        const selectIp = await pool.query('SELECT country, region, city FROM ip_logs ORDER BY log_date DESC LIMIT 1');
        const ipData = selectIp.rows[0] || {};

   
const countResult = await pool.query('SELECT COUNT(*) FROM blog_posts');
const blogCount = countResult.rows[0].count; 



const dateResult = await pool.query('SELECT title, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 1');
const lastDate = dateResult.rows[0]?.created_at || new Date(); 
const latestBlogEntry = dateResult.rows[0]?.title || "No articles yet"; 


const projectResult = await pool.query('SELECT * FROM project')

res.render("backend/dashboard.ejs", { 
    ...getAdminData(req),
    country: ipData.country, 
    region: ipData.region, 
    city: ipData.city,
    blogTitle: latestBlogEntry, 
    blogLength: blogCount,
    blogDate: lastDate,
    project: projectResult.rows    
});

    } catch (error) {
        console.error("Error in admin dashboard:", error);
        next(error);
    }
}

export async function ViewData(req, res, next) {
    try {
        const result = await pool.query('SELECT view_date, view_count FROM page_views ORDER BY view_date DESC LIMIT 7');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

export async function TotalViews(req, res, next) {
    try {
        const result = await pool.query('SELECT SUM(view_count) as total FROM page_views');
        res.json({ total: result.rows[0].total || 0 });
    } catch (error) {
        next(error);
    }
}

export async function cmsHeader(req, res, next) {
    try {
  
      const result = await pool.query('SELECT * FROM header WHERE id = 1');
       const headerData = result.rows[0] || {};
         res.render("backend/cms/cms-header.ejs", {
            ...getAdminData(req),
            header: headerData 
        });
    } catch(error) {
        console.error("Error in fetching cms data:", error);
        next(error);
    }
}

export async function cmsAbout (req, res, next) {
    try {

        const result = await pool.query('SELECT * FROM about WHERE id = 1');
        const aboutData = result.rows[0] || {};
      res.render("backend/cms/cms-about.ejs", {
            ...getAdminData(req),
            about: aboutData,
        });
    } catch (error) {
        console.error("Error in fetching cms about data:", error);
        next(error);
    }
}

export async function cmsServices (req, res, next) {
    try {
        const result = await pool.query('SELECT * FROM services WHERE id = 1');

        const serviceData = result.rows[0] || {};
      res.render("backend/cms/cms-services.ejs", {
         service: serviceData,
         ...getAdminData(req),
        });
    } catch (error) {
        console.error("Error in fetching cms services data:", error);
        next(error);
    }
}

export async function cmsProjects (req, res, next) {
   try {
     const settings = await pool.query(`SELECT * FROM project_settings WHERE id = 1`);
    const projects = await pool.query(`SELECT * FROM project ORDER BY id DESC`);
    
    

     res.render("backend/cms/cms-project.ejs", {
     header: settings.rows[0],
     projects: projects.rows,
     ...getAdminData(req)
     });
   } catch (error) {
    console.error("Error in fetching cms projects data:", error);
    next(error);
}
}

export async function cmsNewProject (req, res, next) {
    try {
      res.render("backend/cms/cms-new-project.ejs", {
        ...getAdminData(req)
      })
    } catch (error) {
        console.error("Error in fetching cms Edit project data:", error);
        next(error);
    }
}

export async function cmsNewProjectEdit (req, res, next ) {
    try {
      const id = req.params.id
      const result = await pool.query("SELECT * FROM project WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).redirect("/404")
    }
      res.render("backend/cms/cms-slug-project.ejs", {
        ...getAdminData(req),
        projects: result.rows[0]
      })
    } catch (error) {
        console.error("Error in fecthing cms Edit project data:", error);
        next(error);
    }
}

export async function cmsContact (req, res, next) {
    try {
      const result = await pool.query("SELECT * FROM contact");
      res.render("backend/cms/cms-settings.ejs", {
        ...getAdminData(req),
        contact: result.rows[0]
      });
    } catch(error) {
     console.error("Error in fetching cms Contact project data:", error);
     next(error);
    }
}

export async function cmsExperience (req, res, next) {
    try {
      const experiences = await pool.query(`SELECT * FROM experience ORDER BY id DESC`);
      res.render("backend/cms/cms-exp.ejs", {
        experiences: experiences.rows,
        ...getAdminData(req)
      });
    } catch (error) {
      console.error("Error in fetching cms experience data:", error);
      next(error);
    }
}

export async function cmsNewExperience (req, res, next) {
    try {
      res.render("backend/cms/cms-exp-new.ejs", {
        ...getAdminData(req)
      })
    } catch (error) {
        console.error("Error in fetching cms new experience data:", error);
        next(error);
    }
}

export async function cmsEditExperience (req, res, next) {
    try {
      const id = req.params.id
      const result = await pool.query("SELECT * FROM experience WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return res.status(404).redirect("/404")
      }
      res.render("backend/cms/cms-exp-edit.ejs", {
        ...getAdminData(req),
        experience: result.rows[0]
      })
    } catch (error) {
        console.error("Error in fetching cms edit experience data:", error);
        next(error);
    }
}

export async function cmsBlog (req, res, next) {
    try {
      const posts = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);


      res.render("backend/cms/cms-blog.ejs", {
        posts: posts.rows,
        ...getAdminData(req)
      });
    } catch (error) {
      console.error("Error in fetching cms blog data:", error);
      next(error);
    }
}

export async function cmsNewBlog (req, res, next) {
    try {
      res.render("backend/cms/cms-blog-new.ejs", {
        ...getAdminData(req)
      })
    } catch (error) {
        console.error("Error in fetching cms new blog data:", error);
        next(error);
    }
}

export async function cmsEditBlog (req, res, next) {
    try {
      const id = req.params.id
      const result = await pool.query("SELECT * FROM blog_posts WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return res.status(404).redirect("/404")
      }
      res.render("backend/cms/cms-blog-edit.ejs", {
        ...getAdminData(req),
        post: result.rows[0]
      })
    } catch (error) {
        console.error("Error in fetching cms edit blog data:", error);
        next(error);
    }
}

export async function adminSettings(req, res, next) {
    try {
   const adminResult = await pool.query("SELECT * FROM admindetails");
   const contactResult = await pool.query("SELECT * FROM contact")
     res.render("backend/settings.ejs",  {
       ...getAdminData(req),
       admin: adminResult.rows[0],
       contact: contactResult.rows[0]
      })
    } catch (error) {
      console.log("Error Fetching settings page", error);
      next(error);
    }
}
