import express from 'express';
import { getStats } from '../controller/trackStats.js';
import { getLive } from '../controller/liveController.js';
import AdminLogin from '../controller/Auth/loginController.js';
import { getProjectStats, getProjects, uploadProjects, updateProjects, deleteProjects } from '../controller/project.js';
import { uploadSingle } from '../config/cloudinary.js';
import { sendMessage, getMessages, toggleRead, toggleStar, toggleArchive, deleteMessage } from '../controller/message.js';
import {
  createBlog,
  listBlogs,
  updateBlog,
  deleteBlog,
} from "../controller/blog.js";
const router = express.Router();

router.post("/auth/login", AdminLogin);
router.get("/projects/stats", getProjectStats);
router.get("/projects", getProjects);
router.post("/projects", uploadSingle("image"), uploadProjects);
router.patch("/projects/:id", uploadSingle("image"),updateProjects);
router.delete("/projects/:id", deleteProjects);
router.post("/messages", sendMessage);
router.get("/messages", getMessages)
router.patch("/messages/:id/read", toggleRead);
router.patch("/messages/:id/star", toggleStar);
router.patch("/messages/:id/archive", toggleArchive);
router.delete("/messages/:id", deleteMessage);
router.post("/blogs", uploadSingle("cover"), createBlog);
router.get("/blogs", listBlogs);
router.patch("/blogs/:id", uploadSingle("cover"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

router.get("/live", getLive);
router.get("/stats", getStats);

export default router;