const Joi = require('joi')
const {Product} = require('../models/index')

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createProduct = async (req, res)=>{
    try {
        const body = req.body
        const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        isActive: Joi.boolean().optional()
        })
        const validator = productSchema.validate(body, {allowUnknown:true})
        if(validator.error){
            req.flash('failed', validator.error.message)
            return res.redirect('back');  
        }
        
        const data = await Product.create({
            ... validator.value,
            image: req.file.path || null,
        })
        
        req.flash('success', 'Success Tambah Produk')
        return res.redirect('/admin/manage-product');
    } catch (error) {
        console.log(error)
        req.flash('failed', error.message)
        return res.redirect('back');  
    }
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const activateProduct = async (req, res)=>{
    try {
        const {productId} = req.params;
        const product = await Product.update({
            isActive:true
        }, {
            where:{
                id:productId
            }
        })

        req.flash('success', 'Success Aktivasi Produk')
        return res.redirect('/admin/manage-product');
    } catch (error) {
        req.flash('failed', error.message)
        return res.redirect('back');
    }
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deactivateProduct = async (req, res)=>{
    try {
        const {productId} = req.params;
        const product = await Product.update({
            isActive:false
        }, {
            where:{
                id:productId
            }
        })

        req.flash('success', 'Success Menonaktifkan Produk')
        return res.redirect('/admin/manage-product');
    } catch (error) {
        req.flash('failed', error.message)
        return res.redirect('back');
    }
}

module.exports = {
    activateProduct,
    deactivateProduct,
    createProduct
}
