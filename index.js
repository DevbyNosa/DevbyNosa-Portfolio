import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import homeRoute from './routes/home.route.js';
import blogRoute from './routes/blog.route.js';
import adminMiddleware from './middleware/auth.middleware.js'
import adminRoute from './routes/admin.route.js';
import helmet from 'helmet';
import apiData from './routes/api.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './database/config/config.js';
import nodemailer from 'nodemailer';









const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'index, follow');
  next();
});

// ---------- security middleware ----------
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/"],
      "script-src-elem": ["'self'", "https://cdn.jsdelivr.net/npm/"],
      "connect-src": ["'self'", "https://cdn.jsdelivr.net"], 
      'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
      'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
      "default-src": ["'self'"],
    },
  })
);


// ---------- bodyParser middleware ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ---------- for public folder middleware ----------
app.use(express.static('public'));



// ---------- view engine ----------
app.set('view engine', 'ejs');



// ---------- session managament ----------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// ---------- Set ip address from Real uer ip  ----------
app.set('trust proxy', true); 

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// For my resume download
app.get('/resume.pdf', (req, res) => {
  const filePath = path.join(__dirname, 'resume.pdf');
  res.download(filePath, 'resume.pdf');
});

app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devbynosa.onrender.com/</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://devbynosa.onrender.com/blog</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://devbynosa.onrender.com/privacy-policy</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://devbynosa.onrender.com/terms-of-service</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`)
});


const adminUrl = process.env.ADMIN_PREFIX


app.use("/", homeRoute);
app.use("/", blogRoute);
app.use("/", adminMiddleware)
app.use(`/${adminUrl}`, adminRoute);

app.use(`/api`, apiData);



app.use(async (req, res) => {
  const id = 1;
  const contactResult = await pool.query("SELECT * FROM contact WHERE id = $1", [id])
  res.status(404).render("backend/404.ejs", { 
    contact: contactResult.rows[0],
    adminUsername: req.session?.adminUser || 'Admin',
    adminLink: process.env.ADMIN_PREFIX || 'admin'
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).render("backend/500.ejs", { 
    adminUsername: req.session?.adminUser || 'Admin',
    adminLink: process.env.ADMIN_PREFIX || 'admin'
  });
});

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`)
})