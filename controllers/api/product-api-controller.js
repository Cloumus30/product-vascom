const { Op } = require('sequelize');
const {Product} = require('../../models/index');
const Joi = require('joi');
const multer = require('multer')
const url = require('url');
const { unlink } = require('fs');
const path = require('path');

/** 
 * Get List Products API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getListProduct = async (req, res)=>{
    try {
         // Get Query Url
        const {take, skip, search} = req.query;
        const query = {};
        if(take){
            query.limit = take;
        }
        if(skip){
            query.offset = skip
        }
        if(search){
            query.where = {
                name:{
                    [Op.iLike] : `%${search}%`
                }
            }
        }
        const data = await Product.findAll(query)
        
        return res.json({
            code: 200,
            message: 'Success Get',
            data: data,
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
   
}

/** 
 * Creeate Product
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
        const validator = productSchema.validate(body,{allowUnknown:true})
        if(validator.error){
            return res.status(400).json({
                code: 400,
                message: validator.error.message,
                data:null,
            });
        }

        const data = await Product.create({
            ... validator.value,
            image: req.file.path || null,
        })
        
        return res.json({
            code: 200,
            message: 'Success Input Data',
            data
        });   
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
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
        isActive: Joi.boolean().required(),
        })
        const validator = productSchema.validate(body, {allowUnknown:true})
        if(validator.error){
            return res.status(400).json({
                code: 400,
                message: validator.error.message,
                data:null,
            });
        }

        const currentData = await Product.findByPk(productId);
        if(currentData == null){
            return res.status(404).json({
                code: 404,
                message: "Product Not Found",
                data: null,
            });
        }
        let payloads = {
            name: body.name,
            price: body.price,
            isActive: body.isActive,
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
        
        return res.json({
            code: 200,
            message: 'Success Update Data',
            // data
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

/** 
 * Soft Delete Product
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deleteProduct = async (req, res)=>{
    try {
        const {productId} = req.params;
        const currentData = await Product.findByPk(productId);
        if(currentData == null){
            return res.status(404).json({
                code: 404,
                message: "Product Not Found",
                data: null,
            });
        }
        await Product.destroy({
            where:{
                id: productId
            }
        })

        return res.json({
            code:200,
            message: "Success Delete Product",
            data: null
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

/** 
 * Force Delete Product
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deleteForceProduct = async (req, res)=>{
    try {
        const {productId} = req.params;
        const currentData = await Product.findByPk(productId, {paranoid:false});
        if(currentData == null){
            return res.status(404).json({
                code: 404,
                message: "Product Not Found",
                data: null,
            });
        }
        await Product.destroy({
            where:{
                id: productId
            },
            force: true,
        })

        if(currentData.image){
            unlink(path.join(__basedir, currentData.image), (err) =>{if (err) throw err})
        }

        return res.json({
            code:200,
            message: "Success Force Delete Product",
            data: null
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

module.exports={
    getListProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteForceProduct
}