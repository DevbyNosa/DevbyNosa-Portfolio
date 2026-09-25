import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./database.js";

const PgSession = connectPgSimple(session);

export const sessionConfig = session({
  store: new PgSession({
    pool,                          
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "sid",
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60 * 1000,
  },
});