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
        req.flash('failed', error.message)
        return res.redirect('back');  
    }
}

/** 
 * Update Product
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const updateProduct = async (req, res)=>{
    try {
        const body = req.body
        const {productId} = req.params
        
        const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        })
        const validator = productSchema.validate(body, {allowUnknown:true})
        if(validator.error){
            req.flash('failed', validator.error.message)
            return res.redirect('back');  
        }

        const currentData = await Product.findByPk(productId);
        if(currentData == null){
            req.flash('failed', 'Product Not Found')
            return res.redirect('back');    
        }
        let payloads = {
            name: body.name,
            price: body.price,
        };
        
        if(req.file){
            payloads = {
                ... body,
                image: req.file.path || null,
            }

            if(currentData.image){
                unlink(path.join(__basedir, currentData.image), (err) =>{if (err) throw err})
            }
        }
        
        const data = await Product.update(payloads, {
            where:{
                id: productId
            }
        })
        
        req.flash('success', 'Success Update Produk')
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
    createProduct,
    updateProduct
}
