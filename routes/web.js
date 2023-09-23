const express = require( 'express')
const { landingPage } = require( '../controllers/base-controller.js');
const { loginPage, registerPage, loginInView, logout } = require( '../controllers/auth-controller.js');
const { dashboardPage, manageProductPage, manageuserPage } = require( '../controllers/admin-controller.js');
const { checkCurrentLogin } = require('../middleware/auth-middleware.js');

const router = express.Router();

router.get('/', landingPage);

// Auth Routes
router.get('/auth/login', loginPage)
router.post('/auth/login', loginInView)
router.get('/auth/register', registerPage)
router.get('/auth/logout', logout)

// Admin Routes
router.use(checkCurrentLogin(['admin']))
router.get('/admin/dashboard', dashboardPage)
router.get('/admin/manage-user', manageuserPage)
router.get('/admin/manage-product', manageProductPage)

module.exports = router;