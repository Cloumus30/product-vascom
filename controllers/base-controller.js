const {Product} = require('../models/index')
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const landingPage = async(req, res)=>{
    const newestProduct = await Product.findAll({
        limit:10,
        order:[
            ['createdAt', 'DESC']
        ],
        where:{
            isActive:true
        }
    })

    const products = await Product.findAll({
        where:{
            isActive: true
        },
        order:[
            ['createdAt', 'DESC']
        ]
    })
    const data = {
        newest_product: newestProduct,
        products: products,
    }
    res.render('pages/landing', {data: data})
}

module.exports = {
    landingPage
}