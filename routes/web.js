const express = require( 'express')
const { landingPage } = require( '../controllers/base-controller.js');
const { loginPage, registerPage, loginInView, logout } = require( '../controllers/auth-controller.js');
const { dashboardPage, manageProductPage, manageuserPage } = require( '../controllers/admin-controller.js');
const { checkCurrentLogin } = require('../middleware/auth-middleware.js');
const { addUser, deactivateUser, activateUser } = require('../controllers/user-controller.js');

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
router.post('/admin/user/add', addUser)
router.get('/admin/user/activate/:userId', activateUser)
router.get('/admin/user/deactivate/:userId', deactivateUser)

router.get('/admin/manage-product', manageProductPage)

module.exports = router;