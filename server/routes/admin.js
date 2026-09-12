import express from 'express';
import { getStats } from '../controller/trackStats.js';
import { getLive } from '../controller/liveController.js';
const router = express.Router();

router.get("/live", getLive);
router.get("/stats", getStats);

export default router;