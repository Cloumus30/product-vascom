import express from 'express'
import { landingPage } from '../controllers/base-controller.js';
import { loginPage, registerPage } from '../controllers/auth-controller.js';
import { dashboardPage } from '../controllers/admin-controller.js';

const router = express.Router();

router.get('/', landingPage);

// Auth Routes
router.get('/auth/login', loginPage)
router.get('/auth/register', registerPage)

// Admin Routes
router.get('/admin/dashboard', dashboardPage)
router.get('/admin/manage-user', dashboardPage)

export default router;