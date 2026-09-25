import express from "express";
import "dotenv/config";
import helmet from 'helmet'
import cors from "cors";
import { pool } from "./config/database.js";
import { sessionConfig } from "./config/session.js";
import cookieParser from "cookie-parser";
import apiRoute from "./routes/api.js";
import adminRoute from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],              // no inline scripts
        styleSrc: ["'self'", "'unsafe-inline'"], // needed for some React/Tailwind setups
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "https://api.example.com"], // if you call external APIs
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],          // modern clickjacking protection
        upgradeInsecureRequests: [],          
      },
    },
    hsts: {
      maxAge: 31536000,       // 1 year in seconds
      includeSubDomains: true,
      //preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    permissionsPolicy: {
      features: {
        geolocation: [],       
        camera: [],
        microphone: [],
        payment: [],
      },
    },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api", apiRoute);
app.use("/api/admin", adminRoute);

// ---------- GLOBAL ERROR HANDLER ----------
// Must be AFTER all routes and BEFORE app.listen.
// Must have 4 arguments (err, req, res, next).
app.use((err, req, res, next) => {
  console.error("=== ERROR ===");
  console.error("name:   ", err?.name);
  console.error("message:", err?.message);
  console.error("code:   ", err?.code);
  console.error("stack:  ", err?.stack?.split("\n").slice(0, 4).join("\n"));

  res.status(err?.status || err?.http_code || 500).json({
    error: err?.message || String(err) || "Unknown error",
    name: err?.name,
    code: err?.code,
  });
});

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();