const express = require('express');
const { getListProduct } = require('../controllers/api/product-api-controller');

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        code: 200,
        message: "Success APi",
        data: "Success Data API"
    })
});

router.get('/product', getListProduct)

module.exports = router;