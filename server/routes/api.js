import express from 'express';
import { trackHandler } from '../controller/track.js';
const router = express.Router();

router.post("/track", trackHandler)

export default router;