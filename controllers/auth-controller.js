const Joi = require('joi')
const jwt = require('jsonwebtoken')
const {User} = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const loginPage = (req, res)=>{
    try {
        return res.render('pages/auth/login')    
    } catch (error) {
        req.flash('failed', error.message)
        return res.redirect('back')
    }
    
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const registerPage = (req, res)=>{
    res.render('pages/auth/register')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const loginInView = async (req, res)=>{
    const body = req.body;
    const schema = Joi.object({
        emailPhone: Joi.string().required(),
        password: Joi.string().required(),
    })
    const validator = schema.validate(body)
    if(validator.error){
        req.flash('failed', validator.error.message)
        return res.redirect('back');
    }

    const user = await User.findOne({
        where:{
            [Op.or]:[
                {email: body.emailPhone},
                {phone: body.emailPhone}
            ]
        }
    })

    if(user){
        const passMatch = bcrypt.compareSync(body.password, user.password)
        if(passMatch){
            const token = jwt.sign({subUsr: user.id}, process.env.JWT_SECRET)
            req.flash('success', "Success Login")
            res.cookie('acs', token, {maxAge: 1000*60*60}) // One Hour Expired
           return res.redirect('/admin/dashboard');
        }
    }

    req.flash('failed', 'User Atau password salah')
    return res.redirect('back')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const logout = async (req, res)=>{
    res.clearCookie('acs')
    return res.redirect('/auth/login')
}

module.exports = {
    loginPage,
    registerPage,
    loginInView,
    logout
}