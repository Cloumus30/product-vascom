const express = require('express');
const { getListProduct, createProduct, updateProduct, deleteProduct, deleteForceProduct } = require('../controllers/api/product-api-controller');
const multer = require('multer');
const { defaultStorage } = require('../config/multer');

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

router.get('/product', getListProduct)

router.post('/product', upload.single('image'),createProduct)
router.put('/product/:productId', 
    upload.single('image'),
    updateProduct)
router.delete('/product/:productId', deleteProduct)
router.delete('/product/force/:productId', deleteForceProduct)

module.exports = router;