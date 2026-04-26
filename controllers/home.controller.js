import pool from '../database/config/config.js';
import { transporter } from '../index.js';



// ---------- home page controller ----------


export const HomePage = async (req, res, next) => {
  try {

  const result = await pool.query("SELECT * FROM header WHERE id = 1");

  const aboutResult = await pool.query("SELECT * FROM about WHERE id = 1");

  const serviceResult = await pool.query("SELECT * FROM services WHERE id = 1");

  const projectHeaderResult = await pool.query("SELECT title, text_paragraph FROM project_settings WHERE id = 1");
  const projectResult = await pool.query("SELECT * FROM project");

  const experienceResult = await pool.query("SELECT * FROM experience ORDER BY start_date DESC");

  const contactResult = await pool.query("SELECT * FROM contact");

  const blogResult = await pool.query("SELECT id, title, slug, excerpt, image, image_alt, published_at FROM blog_posts WHERE published = true ORDER BY published_at DESC LIMIT 3");

  const headerData = result.rows[0] || {};
  const aboutData = aboutResult.rows[0] || {};
  const serviceData = serviceResult.rows[0] || {};
  const projectHeaderData = projectHeaderResult.rows[0]

     await pool.query('INSERT INTO page_views (view_date, view_count) VALUES (CURRENT_DATE, 1) ON CONFLICT (view_date) DO UPDATE SET view_count = page_views.view_count + 1');
  res.render("home.ejs", {
    header: headerData,
    about: aboutData,
    service: serviceData,
    projectHeader: projectHeaderData,
    project: projectResult.rows,
    experience: experienceResult.rows,
    contact: contactResult.rows[0],
    blogs: blogResult.rows
  });
  } catch (error) {
      console.error("Error fetching data from database", error);
     next(error);
  }
};

export const BlogPostPage = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM blog_posts WHERE slug = $1 AND published = true", [slug]);

     const contacts = await pool.query(`SELECT * FROM contact`);

    if (result.rows.length === 0) {
      return res.status(404).render("backend/404.ejs");
    }

    const post = result.rows[0];
    res.render("blog-post.ejs", { post, contact: contacts.rows[0] });
  } catch (error) {
      console.error("Error fetching blog post:", error);
      next(error);
  }
};



export const BlogPage = async (req, res, next) => {
  try {
    const posts = await pool.query("SELECT id, title, slug, excerpt, image, image_alt, published_at FROM blog_posts WHERE published = true ORDER BY published_at DESC");

      const contacts = await pool.query(`SELECT * FROM contact`);
    res.render("blog.ejs", { posts: posts.rows,
    contact: contacts.rows[0]
     });
  } catch (error) {
      console.error("Error fetching blog posts:", error);
      next(error);
  }
  
}





export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `New Portfolio Message from ${name}`,
    text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/?status=success');
  } catch (error) {
    console.error(error);
    res.redirect('/?status=error');
  }
};


export const termsAndServices = async (req, res) => {
  const contactResult = await pool.query("SELECT * FROM contact");
  res.render("terms-and-service.ejs", {
    contact: contactResult.rows[0]
  });
}
