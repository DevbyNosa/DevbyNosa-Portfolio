import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { ViewData, TotalViews } from '../controllers/admin.controller.js';

const router = express.Router();

router.get("/view-data", isAuthenticated, ViewData);
router.get("/total-views", isAuthenticated, TotalViews);

export default router;