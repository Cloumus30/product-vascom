const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @param {String[]} roles
 */
const checkCurrentLogin = (roles=['user']) =>( async (req, res, next)=>{
        const token = req.cookies.acs;
        if(token){
            // Verify Token
            jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
                if(err){
                    req.flash('failed', 'Silahkan Login Kembali');
                    return res.redirect('/auth/login')            
                }
                const user = await User.findOne({
                    where:{
                        id: decoded.subUsr
                    },
                    attributes:['name', 'email', 'phone', 'role']
                });
                if(user){
                    if(roles.includes(user.role.toLowerCase())){
                        // User Authorized
                        res.locals.userLoggedIn = user
                        return next();
                    }
                    if(user.role == 'USER'){
                        return res.redirect('/')
                    }
                }
            })
        }else{
            req.flash('failed', 'Silahkan Login Untuk Akses');
            return res.redirect('/auth/login') 
        }
})

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @param {String[]} roles
 */
const checkApiToken = (roles=['user']) =>( async (req, res, next)=>{
    let authHead = req.get('Authorization');
    let token = null;
    if(authHead){
        token = authHead.split(' ')[1];
    }
    if(token){
        // Verify Token
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
            if(err){
                return res.status(400).json({
                    code:400,
                    message: err.message
                })          
            }
            const user = await User.findOne({
                where:{
                    id: decoded.subUsr
                },
                attributes:['name', 'email', 'phone', 'role']
            });
            if(user){
                if(roles.includes(user.role.toLowerCase())){
                    // User Authorized
                    res.locals.userLoggedIn = user
                    return next();
                }
            }
            
            return res.status(403).json({
                code:403,
                message: 'Anda Tidak Memiliki Akses'
            }) 
        })
    }else{
        return res.status(403).json({
            code:403,
            message: 'Anda Tidak Memiliki Akses'
        }) 
    }
})

module.exports = {
    checkCurrentLogin,
    checkApiToken
}