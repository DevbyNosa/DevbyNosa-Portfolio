import rateLimit from "express-rate-limit";

const skipInDev = () => process.env.NODE_ENV !== "production";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInDev,
  message: { error: "Too many requests, please try again later." },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInDev,
  message: { error: "Too many authentication attempts. Try again in 15 minutes." },
});

export const expensiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInDev,
  message: { error: "Hourly limit reached for this action." },
});