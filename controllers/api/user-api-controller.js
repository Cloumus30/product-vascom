const Joi = require('joi');
const {User} = require('../../models/index')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

/** 
 * Get List User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getListUser = async (req, res)=>{
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
        const data = await User.scope('withoutPassword').findAll(query)
        
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
 * Create User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createUser = async (req, res)=>{
    try {
        const body = req.body
        const userSchema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        isActive: Joi.boolean().optional(),
        })
        const validator = userSchema.validate(body)
        if(validator.error){
            return res.status(400).json({
                code: 400,
                message: validator.error.message,
            });
        }

        const duplicateUser = await User.findOne({
            where:{
                email: body.email
            }
        })
        if(duplicateUser){
            return res.status(400).json({
                code: 400,
                message: 'User dengan Email Ini sudah Terdaftar',
            });
        }

        const salt = bcrypt.genSaltSync(10)
        const passhashed = bcrypt.hashSync(body.password, salt);

        const payloads = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            isActive: body.isActive || false,
            password: passhashed,
            role:'USER',
        }
        
        const data = await User.create(payloads)

        return res.status(200).json({
            code: 200,
            message: "Success Create User",
            data: null
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

/** 
 * Update User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const updateUser = async (req, res)=>{
    try {
        const body = req.body
        const {userId} = req.params

        const userSchema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string().required(),
        isActive: Joi.boolean().optional(),
        })
        const validator = userSchema.validate(body)
        if(validator.error){
            return res.status(400).json({
                code: 400,
                message: validator.error.message,
            });
        }

        const duplicateUser = await User.findOne({
            where:{
                email: body.email,
                id:{
                    [Op.ne] : userId
                }
                
            }
        })
        if(duplicateUser){
            return res.status(400).json({
                code: 400,
                message: 'User dengan Email Ini sudah Terdaftar',
            });
        }

        const payloads = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            isActive: body.isActive || false,
            // password: passhashed,
            role:'USER',
        }
        
        const data = await User.update(payloads, {
            where:{
                id: userId
            }
        })

        return res.status(200).json({
            code: 200,
            message: "Success Update User",
            data: null
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

/** 
 * Update User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deleteUser = async (req, res)=>{
    try {
        const {userId} = req.params;
        const currentData = await User.findByPk(userId);
        if(currentData == null){
            return res.status(404).json({
                code: 404,
                message: "User Not Found",
                data: null,
            });
        }
        await User.destroy({
            where:{
                id: userId
            }
        })

        return res.json({
            code: 200,
            message:"Success Delete User"
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}


/** 
 * Force Delete User API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const forceDeleteUser = async (req, res)=>{
    try {
        const {userId} = req.params;
        const currentData = await User.findByPk(userId, {paranoid:false});
        if(currentData == null){
            return res.status(404).json({
                code: 404,
                message: "User Not Found",
                data: null,
            });
        }
        await User.destroy({
            where:{
                id: userId
            },
            force:true
        })

        return res.json({
            code: 200,
            message:"Success Force Delete User"
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }
}

module.exports = {
    getListUser,
    createUser,
    updateUser,
    deleteUser,
    forceDeleteUser
}