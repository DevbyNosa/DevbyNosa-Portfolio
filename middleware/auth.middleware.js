import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import pool from '../database/config/config.js';
import axios from 'axios';


const router = express.Router();

const saltRounds = 10;
const adminPrefix = process.env.ADMIN_PREFIX || "admin";

// Check for Admin Authentication

export function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    return next();
  } else {
    
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    return res.redirect(`/${adminPrefix}`);
  }
}


export function isNotAuthenticated(req, res, next) {
  if (req.session.admin) {
    return res.redirect(`/${adminPrefix}/dashboard`);
  } else {
    return next();
  }
}

router.get("/admin", (req, res) => {
  const userIp = req.ip
  console.log("Failed attempt to access admin dashboard", userIp)
 return  res.redirect("/"); 
});


// Admin Login Route;

router.get(`/${adminPrefix}`, isNotAuthenticated, async(req, res) => {
    
  res.render("backend/login.ejs", {
    adminPrefix: adminPrefix,
  })
})

router.post(`/${adminPrefix}`, async (req, res) => {
  const { username, password } = req.body;
  try {
    const databaseInfo = await pool.query("SELECT * FROM admindetails WHERE username = $1", [username]);

    if (databaseInfo.rows.length === 0) {
      req.session.flash = { error: "Invalid Credentials" };
      return res.redirect(`/${adminPrefix}`);
    }

    
    const admin = databaseInfo.rows[0]; 
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      req.session.flash = { error: "Invalid Credentials" };
      return res.redirect(`/${adminPrefix}`);
    } 

    

    const ip = req.ip === '::1' ? '102.89.33.255' : req.ip; 
     const response = await axios.get(`http://ip-api.com/json/${ip}`);

     const { country, regionName, city } = response.data;
      console.log(`Login attempt from IP: ${ip}, Location: ${city}, ${regionName}, ${country}`);

      // Log IP and location to database
      await pool.query('INSERT INTO ip_logs (ip_address, country, region, city) VALUES ($1, $2, $3, $4)', [ip, country, regionName, city]);
    

    req.session.admin = true;
    req.session.adminUser = admin.username;
    return res.redirect(`/${adminPrefix}/dashboard`);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});



export default router;

