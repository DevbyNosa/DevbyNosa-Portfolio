import session from "express-session";

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET || 'a_fallback_default_secret_for_dev',
    resave: false,
    saveUninitialized: false,
    name: "sid",
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 * 1000, // 30 minutes
    },
});
