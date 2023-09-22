import express from 'express'
import { landingPage } from '../controllers/base-controller.js';

const router = express.Router();

router.get('/', landingPage);

export default router;