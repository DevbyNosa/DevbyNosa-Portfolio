import express from 'express';
const router = express.Router();

import { HomePage, sendMessage, termsAndServices } from "../controllers/home.controller.js";

router.get("/", HomePage);


router.post('/message', sendMessage);

router.get("/terms-and-services", termsAndServices)


export default router;