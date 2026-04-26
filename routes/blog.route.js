import express from 'express';
import { BlogPage, BlogPostPage } from '../controllers/home.controller.js';
const router = express.Router();


router.get("/blog", BlogPage);

router.get("/blog/:slug", BlogPostPage);


export default router;