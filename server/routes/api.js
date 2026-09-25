import express from 'express';
import { trackHandler } from '../controller/track.js';
import { publicProjects } from '../controller/project.js';
import { publicBlogs, publicBlogBySlug } from '../controller/blog.js';
import { globalLimiter } from '../middleware/rateLimiter.js';
import { getContent } from '../controller/content.js';

const router = express.Router();

router.use(globalLimiter)

router.post("/track", trackHandler);
router.get("/projects", publicProjects);
router.get("/blogs", publicBlogs);
router.get("/blogs/:slug", publicBlogBySlug)
router.get("/content", getContent);

export default router;