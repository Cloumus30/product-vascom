const express = require( 'express')
const { landingPage } = require( '../controllers/base-controller.js');
const { loginPage, registerPage, loginInView, logout } = require( '../controllers/auth-controller.js');
const { dashboardPage, manageProductPage, manageuserPage } = require( '../controllers/admin-controller.js');
const { checkCurrentLogin } = require('../middleware/auth-middleware.js');
const { addUser, deactivateUser, activateUser, updateUser } = require('../controllers/user-controller.js');
const { activateProduct, deactivateProduct, createProduct, updateProduct } = require('../controllers/product-controller.js');
const multer = require('multer');
const { defaultStorage } = require('../config/multer.js');

const router = express.Router();
const defaultStorages = defaultStorage('product')
const upload = multer({storage: defaultStorages, limits:{fileSize:5000000}})

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
router.post('/admin/user/update/:userId', checkCurrentLogin(['admin']), updateUser)
router.get('/admin/user/activate/:userId', checkCurrentLogin(['admin']), activateUser)
router.get('/admin/user/deactivate/:userId', checkCurrentLogin(['admin']), deactivateUser)

router.get('/admin/manage-product', checkCurrentLogin(['admin']), manageProductPage)
router.get('/admin/product/activate/:productId', checkCurrentLogin(['admin']), activateProduct)
router.get('/admin/product/deactivate/:productId', checkCurrentLogin(['admin']), deactivateProduct)
router.post('/admin/product/add', checkCurrentLogin(['admin']), upload.single('image'), createProduct)
router.post('/admin/product/update/:productId', checkCurrentLogin(['admin']), upload.single('image'), updateProduct)

module.exports = router;