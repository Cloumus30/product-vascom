import express from 'express'
import { landingPage } from '../controllers/base-controller.js';
import { loginPage } from '../controllers/auth-controller.js';

const router = express.Router();

router.get('/', landingPage);

// Auth Routes
router.get('/auth/login', loginPage)

export default router;