import express from 'express';
import { trackHandler } from '../controller/track.js';
import { publicProjects } from '../controller/project.js';
import { publicBlogs } from '../controller/blog.js';

const router = express.Router();

router.post("/track", trackHandler);
router.get("/projects", publicProjects);
router.get("/blogs", publicBlogs)

export default router;