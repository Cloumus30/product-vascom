const express = require('express');
const { getListProduct, createProduct, updateProduct, deleteProduct, deleteForceProduct } = require('../controllers/api/product-api-controller');
const multer = require('multer');
const { defaultStorage } = require('../config/multer');
const { getListUser, createUser, updateUser, deleteUser, forceDeleteUser } = require('../controllers/api/user-api-controller');
const { getAccessToken } = require('../controllers/api/auth-api-controller');
const { checkApiToken } = require('../middleware/auth-middleware');

const router = express.Router();
const defaultStorages = defaultStorage('product')
const upload = multer({storage: defaultStorages, limits:{fileSize:5000000}})

router.get('/', (req, res)=>{
    res.status(200).json({
        code: 200,
        message: "Success APi",
        data: "Success Data API"
    })
});

// Auth API
router.post('/auth/get-token', getAccessToken);

// Products API
router.get('/product', checkApiToken(['admin', 'user']),getListProduct)

router.post('/product',checkApiToken(['admin']), upload.single('image'),createProduct)
router.put('/product/:productId', checkApiToken(['admin']),
    upload.single('image'),
    updateProduct)
router.delete('/product/:productId', checkApiToken(['admin']),deleteProduct)
router.delete('/product/force/:productId', checkApiToken(['admin']),deleteForceProduct)


// Users API
router.get('/user', checkApiToken(['admin', 'user']), getListUser)
router.post('/user', checkApiToken(['admin']),createUser)
router.put('/user/:userId', checkApiToken(['admin']),updateUser)
router.delete('/user/:userId', checkApiToken(['admin']),deleteUser)
router.delete('/user/force/:userId', checkApiToken(['admin']),forceDeleteUser)

module.exports = router;