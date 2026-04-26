import 'dotenv/config'
import pool from '../../../database/config/config.js';
import sanitizeHtml from 'sanitize-html';
import { upload } from '../../../database/config/multer.js';




// updating homepage header content
export  async function updateCmsHeader(req, res, next) {
  try {
  const {
    heroSubtitle,
    heroTitle,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    contactButtonText,
    contactButtonLink
  } = req.body;

  const cleanTitle = sanitizeHtml(heroTitle);
  const cleanDescription = sanitizeHtml(heroDescription);
  


  const updateQuery = await pool.query(`INSERT INTO header(
    id,   
    hero_subtitle, hero_title, hero_description, hero_button_text, hero_button_link, contact_button_text, contact_button_link
  ) VALUES ( 1, $1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET
    hero_subtitle = EXCLUDED.hero_subtitle,
    hero_title = EXCLUDED.hero_title,
    hero_description = EXCLUDED.hero_description,
    hero_button_text = EXCLUDED.hero_button_text,
    hero_button_link = EXCLUDED.hero_button_link,
    contact_button_text = EXCLUDED.contact_button_text,
    contact_button_link = EXCLUDED.contact_button_link
  WHERE header.id = 1`, [
    heroSubtitle,
    heroTitle,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    contactButtonText,
    contactButtonLink
  ]);

    const result = await pool.query('SELECT * FROM header WHERE id = 1');
    const headerData = result.rows[0] || {};

  res.render("backend/cms/cms-header.ejs", { 
    adminUsername: req.session.adminUser,
    adminLink: process.env.ADMIN_PREFIX || 'admin',
    successMessage: "Content updated successfully!",
    header: headerData
  });
  } catch (error) {
    console.error("Error in updating CMS header:", error);
    next(error);
  }
}

export async function postNewAboutContent(req, res, next) {
  try {
    let aboutImagePath = null;
    const { aboutTitle, aboutDescription, stackInput, aboutAltText } = req.body;

   if (req.file) {
      aboutImagePath = req.file.path; 
    } 
    const cleanAboutDescription = sanitizeHtml(aboutDescription);

    await pool.query(`
      INSERT INTO about (id, title, description, stack, image, image_alt) 
      VALUES (1, $1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET 
        title = COALESCE(NULLIF(EXCLUDED.title, ''), about.title),
        description = COALESCE(NULLIF(EXCLUDED.description, ''), about.description),
        stack = COALESCE(NULLIF(EXCLUDED.stack, ''), about.stack),
        image = COALESCE($4, about.image),
        image_alt = COALESCE(NULLIF(EXCLUDED.image_alt, ''), about.image_alt)
    `, [aboutTitle, cleanAboutDescription, stackInput, aboutImagePath, aboutAltText]);

    const result = await pool.query('SELECT * FROM about WHERE id = 1');
    const aboutData = result.rows[0] || {};

    res.render("backend/cms/cms-about.ejs", { 
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Content updated successfully!",
      about: { 
        title: aboutData.title, 
        description: aboutData.description, 
        stack: aboutData.stack,
        image: aboutData.image,
        image_alt: aboutData.image_alt 
      }
    });

  } catch(error) {
    console.error("Error in updating CMS about section:", error);
    next(error);
  }
}

export async function postNewServicesContent(req, res, next) {
  try {
    const { serviceTitle, serviceDescription, serviceType } = req.body;
    
   
   const cleanServiceDescription = sanitizeHtml(serviceDescription, {
  allowedTags: ['div', 'h4', 'p', 'img', 'strong', 'em'], 
  allowedAttributes: {
    'div': ['class'],    
    'img': ['src', 'alt', 'class'],
    'h4': ['class'],
    'p': ['class']
  }
});

const cleanServiceType = sanitizeHtml(serviceType, {
  allowedTags: ['span', 'div'], 
  allowedAttributes: {
    'div': ['class'],
    'span': ['class'],
    'img': ['src', 'alt', 'class'],
    'h4': ['class'],
    'p': ['class']
  }
});


    
    await pool.query(`
  INSERT INTO services (id, title, description, service_types) 
  VALUES (1, $1, $2, $3)
  ON CONFLICT (id) DO UPDATE SET 
    title = COALESCE(NULLIF(EXCLUDED.title, ''), services.title), 
    description = COALESCE(NULLIF(EXCLUDED.description, ''), services.description),
    service_types = COALESCE(NULLIF(EXCLUDED.service_types, ''), services.service_types)
`, [serviceTitle, cleanServiceDescription, serviceType]);


   
const serviceResult = await pool.query('SELECT * FROM services WHERE id = 1');


req.session.flash = { successMessage: "Content updated successfully!" };
const adminLink = process.env.ADMIN_PREFIX || 'admin';
return res.redirect(`/${adminLink}/cms/services`);

  } catch (error) {
    console.error("Error in updating CMS services section:", error);
    next(error);
  }
}


export async function cmsPostProjects(req, res, next) {
  try {
    const { projectTitle, projectDescription } = req.body;
    
    
    await pool.query(`
      UPDATE project_settings
      SET title = $1, text_paragraph = $2
      WHERE id = 1
    `, [projectTitle, projectDescription]);

   
      const settings = await pool.query("SELECT * FROM project_settings WHERE id = 1");
    const projects = await pool.query("SELECT * FROM project ORDER BY id DESC");

    res.render("backend/cms/cms-project.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Header updated successfully!",
      header: settings.rows[0],
      projects: projects.rows
    });
  } catch(error) {
    console.error("Error in updating Project header:", error);
    next(error);
  }
}


export async function cmsBodyProject (req, res, next) {
  try {
    const {projectUrl, projectName, projectInformation, projectStack, projectAltText } = req.body;
    const projectImagePath = req.file ? req.file.path : null; 

    await pool.query(`
      INSERT INTO project(
      project_url,image,
      project_name, project_information, project_stack, image_alt)
      VALUES($1, $2, $3, $4, $5, $6)
    `, [projectUrl,projectImagePath, projectName, projectInformation, projectStack, projectAltText]);

    
   
    res.render("backend/cms/cms-new-project.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "New project added successfully!",
    });
  } catch(error) {
    console.error("Error creating new Project details: ", error);
    next(error);
  }
}


export async function cmsUpdateProject(req, res, next) {
  try {
    const id = req.params.id;
    const { updateprojectUrl, updateprojectName, updateprojectInformation, updateprojectStack, updateprojectAltText } = req.body;

    
    const currentData = await pool.query("SELECT image FROM project WHERE id = $1", [id]);
    if (currentData.rows.length === 0) return res.status(404).send("Project not found");

    const finalImageUrl = req.file ? req.file.path : currentData.rows[0].image;

    
    await pool.query(`
      UPDATE project 
      SET project_url = $1, image = $2, project_name = $3, project_information = $4, project_stack = $5, image_alt = $6
      WHERE id = $7
    `, [updateprojectUrl, finalImageUrl, updateprojectName, updateprojectInformation, updateprojectStack, updateprojectAltText, id]);

    
    const result = await pool.query(`SELECT * FROM project WHERE id = $1`, [id]);

    
    res.render("backend/cms/cms-slug-project.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Project updated successfully!",
      projects: result.rows[0],
    });
  } catch (error) {
    console.error(`Error updating project id`, error);
    next(error);
  }
}

export async function cmsDeleteProject(req, res, next) {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM project WHERE id = $1`, [id]);

   
    const adminLink = process.env.ADMIN_PREFIX || 'admin';

    
    res.redirect(`/${adminLink}/cms/project`); 
  } catch(error) {
    console.error(`Error deleting projects:`, error);
    next(error);
  }
}


export async function cmsPostContact (req, res, next) {
  try {
     const {
     whatsapp_contact,
     email_contact,
     github_contact,
     linkedin_contact,
     x_contact,
     tiktok_contact
     } = req.body;

     await pool.query(`UPDATE contact SET id = $1, whatsapp_no = $2, email = $3, github = $4, linkedin = $5, x_twitter = $6, tiktok = $7 WHERE id = $1`, [1, whatsapp_contact, email_contact, github_contact, linkedin_contact, x_contact, tiktok_contact]);

     const result = await pool.query("SELECT * FROM contact");

     res.render("backend/cms/cms-settings.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Project updated successfully!",
      contact: result.rows[0],
     })
  } catch(error) {
    console.error(`Error posting contact:`, error);
    next(error);

  }
}

export async function cmsPostExperience(req, res, next) {
  try {
    const { role, company, startDate, endDate, description } = req.body;

    const cleanDescription = sanitizeHtml(description);

    await pool.query(`INSERT INTO experience (role, company, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5)`, [role, company, startDate, endDate, cleanDescription]);

    const experiences = await pool.query(`SELECT * FROM experience ORDER BY id DESC`);

    res.render("backend/cms/cms-exp.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Experience added successfully!",
      experiences: experiences.rows
    });
  } catch (error) {
    console.error("Error in posting new experience:", error);
    next(error);
  }
}

export async function cmsUpdateExperience(req, res, next) {
  try {
    const id = req.params.id;
    const { role, company, startDate, endDate, description } = req.body;

    const cleanDescription = sanitizeHtml(description);

    await pool.query(`UPDATE experience SET role = $1, company = $2, start_date = $3, end_date = $4, description = $5 WHERE id = $6`, [role, company, startDate, endDate, cleanDescription, id]);

    const experiences = await pool.query(`SELECT * FROM experience ORDER BY id DESC`);

    res.render("backend/cms/cms-exp.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Experience updated successfully!",
      experiences: experiences.rows
    });
  } catch (error) {
    console.error("Error in updating experience:", error);
    next(error);
  }
}

export async function cmsDeleteExperience(req, res, next) {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM experience WHERE id = $1`, [id]);

    const adminLink = process.env.ADMIN_PREFIX || 'admin';

    res.redirect(`/${adminLink}/cms/experience`);
  } catch (error) {
    console.error(`Error deleting experience:`, error);
    next(error);
  }
}

export async function cmsPostBlog(req, res, next) {
  try {
    const { title, content, excerpt, imageAlt, published } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let imagePath = null;

    if (req.file) {
      imagePath = req.file.path;
    }

    const publishedAt = published === 'on' ? new Date() : null;

    await pool.query(`INSERT INTO blog_posts (title, slug, content, excerpt, image, image_alt, published, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [title, slug, content, excerpt, imagePath, imageAlt, published === 'on', publishedAt]);

    const posts = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);

    

    res.render("backend/cms/cms-blog.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Blog post created successfully!",
      posts: posts.rows
    });
  } catch (error) {
    console.error("Error in posting new blog:", error);
    next(error);
  }
}

export async function cmsUpdateBlog(req, res, next) {
  try {
    const id = req.params.id;
    const { title, content, excerpt, imageAlt, published } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let imagePath = null;

    if (req.file) {
      imagePath = req.file.path;
    }

    const publishedAt = published === 'on' ? new Date() : null;

    await pool.query(`UPDATE blog_posts SET title = $1, slug = $2, content = $3, excerpt = $4, image = COALESCE($5, image), image_alt = $6, published = $7, published_at = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9`, [title, slug, content, excerpt, imagePath, imageAlt, published === 'on', publishedAt, id]);

    const posts = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);

    res.render("backend/cms/cms-blog.ejs", {
      adminUsername: req.session.adminUser,
      adminLink: process.env.ADMIN_PREFIX || 'admin',
      successMessage: "Blog post updated successfully!",
      posts: posts.rows
    });
  } catch (error) {
    console.error("Error in updating blog:", error);
    next(error);
  }
}

export async function cmsDeleteBlog(req, res, next) {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);

    const adminLink = process.env.ADMIN_PREFIX || 'admin';

    res.redirect(`/${adminLink}/cms/blog`);
  } catch (error) {
    console.error(`Error deleting blog post:`, error);
    next(error);
  }
}

export async function logout(req, res, next)  {
  const adminLink = process.env.ADMIN_PREFIX || 'admin';

    req.session.destroy(error => {
      if(error) {

        res.status(500).redirect(`/${adminLink}/dashboard?status= logout failed`);
      } 
      res.clearCookie('connect.sid');
      return res.redirect(`/${adminLink}?status=logout success`)
    })
}

