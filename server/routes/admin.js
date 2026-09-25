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
import me from '../controller/Auth/meController.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import logout from '../controller/Auth/logoutContoller.js';
import updatePassword from '../controller/settings/updatePassword.js';
import updateMe from '../controller/settings/editInformation.js';
import { expensiveLimiter, authLimiter } from '../middleware/rateLimiter.js';
import { updateContent } from '../controller/content.js';

const router = express.Router();



router.get("/auth/me", me);
router.post("/auth/login", authLimiter, AdminLogin);
router.use(requireAdmin)
router.post("/auth/logout", logout);
router.get("/projects/stats", getProjectStats);
router.get("/projects", getProjects);
router.post("/projects", uploadSingle("image"), uploadProjects);
router.patch("/projects/:id", uploadSingle("image"),updateProjects);
router.delete("/projects/:id", deleteProjects);
router.post("/messages", expensiveLimiter,  sendMessage);
router.get("/messages", getMessages)
router.patch("/messages/:id/read", toggleRead);
router.patch("/messages/:id/star", toggleStar);
router.patch("/messages/:id/archive", toggleArchive);
router.delete("/messages/:id", deleteMessage);
router.post("/blogs", uploadSingle("cover"), createBlog);
router.get("/blogs", listBlogs);
router.patch("/blogs/:id", uploadSingle("cover"), updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.patch("/update-password", updatePassword)
router.patch("/auth/me", updateMe)

router.get("/live", getLive);
router.get("/stats", getStats);
router.patch("/content/:section", (req, res, next) => {
  req.body.section = req.params.section;
  next();
}, updateContent);

export default router;