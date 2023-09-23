const express = require( 'express')
const { landingPage } = require( '../controllers/base-controller.js');
const { loginPage, registerPage } = require( '../controllers/auth-controller.js');
const { dashboardPage, manageProductPage, manageuserPage } = require( '../controllers/admin-controller.js');

const router = express.Router();

router.get('/', landingPage);

// Auth Routes
router.get('/auth/login', loginPage)
router.get('/auth/register', registerPage)

// Admin Routes
router.get('/admin/dashboard', dashboardPage)
router.get('/admin/manage-user', manageuserPage)
router.get('/admin/manage-product', manageProductPage)

module.exports = router;