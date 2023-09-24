const { User, Product } = require('../models/index')
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const dashboardPage = async (req, res)=>{
    const totalUser = await User.count()
    const totalUserActive = await User.count({
        where:{
            isActive:true
        }
    })
    const totalProduct = await Product.count()
    const totalProductActive = await Product.count({
        where:{
            isActive:true
        }
    })
    const newProducts = await Product.findAll({
        order:[
            ['createdAt', 'DESC']
        ],
        limit:10
    })

    const data = {
        totalUser: totalUser,
        totalUserActives: totalUserActive,
        totalProduct: totalProduct,
        totalProductActive: totalProductActive,
        newProduct: newProducts
    }
    res.render('pages/admin/dashboard', {data: data})
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const manageuserPage = async (req, res)=>{
    const data = await User.findAll();
    res.render('pages/admin/manage-user', {data})
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const manageProductPage = async (req, res)=>{
    const data = await Product.findAll()
    res.render('pages/admin/manage-product', {data})
}

module.exports= {
    dashboardPage,
    manageuserPage,
    manageProductPage
}