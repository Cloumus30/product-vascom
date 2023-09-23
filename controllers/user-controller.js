const Joi = require('joi')
const {User} = require('../models/index')
const bcrypt = require('bcryptjs')
const { generateString } = require('../config/helper')
const { transporter, sendMailPass } = require('../config/nodemailer')
const { render } = require('ejs')

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addUser = async (req, res)=>{
    const body = req.body
    const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required(),
    })
    const validator = userSchema.validate(body)
    if(validator.error){
        req.flash('failed',validator.error.message);
        return res.redirect('back');
    }

    const duplicateUser = await User.findOne({
        where:{
            email: body.email
        }
    })
    if(duplicateUser){
        req.flash('failed', 'User dengan Email Ini sudah terdaftar');
        return res.redirect('back');
    }

    const randomPass = generateString(6);
    const mail = await sendMailPass('Vascomm Shop', body.email, "Pembuatan Akun", randomPass)
    const salt = bcrypt.genSaltSync(10)
    const passhashed = bcrypt.hashSync(randomPass, salt);

    const payloads = {
        name: body.name,
        phone: body.phone,
        email: body.email,
        isActive: body.isActive || false,
        password: passhashed,
        role:'USER',
    }
    
    const data = await User.create(payloads)
    req.flash('success', 'Success Tambah User');
    return res.redirect('/admin/manage-user')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const activateUser = async (req, res)=>{
    try {
        const {userId} = req.params;
        const user = await User.update({
            isActive:true
        }, {
            where:{
                id:userId
            }
        })

        req.flash('success', 'Success Acktivasi User')
        return res.redirect('/admin/manage-user');
    } catch (error) {
        req.flash('failed', error.message)
        return res.redirect('back');
    }
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deactivateUser = async (req, res)=>{
    try {
        const {userId} = req.params;
        const user = await User.update({
            isActive:false
        }, {
            where:{
                id:userId
            }
        })

        req.flash('success', 'Success Acktivasi User')
        return res.redirect('/admin/manage-user');
    } catch (error) {
        req.flash('failed', error.message)
        return res.redirect('back');
    }
}

module.exports = {
    addUser,
    activateUser,
    deactivateUser
}
