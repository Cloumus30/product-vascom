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
router.get('/admin/dashboard', checkCurrentLogin(['admin']), dashboardPage)

router.get('/admin/manage-user', checkCurrentLogin(['admin']), manageuserPage)
router.post('/admin/user/add', checkCurrentLogin(['admin']), addUser)
router.get('/admin/user/activate/:userId', checkCurrentLogin(['admin']), activateUser)
router.get('/admin/user/deactivate/:userId', checkCurrentLogin(['admin']), deactivateUser)

router.get('/admin/manage-product', checkCurrentLogin(['admin']), manageProductPage)

module.exports = router;