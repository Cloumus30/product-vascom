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
                console.log('user')
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
            })
        }else{
            req.flash('failed', 'Silahkan Login Untuk Akses');
            return res.redirect('/auth/login') 
        }
})

module.exports = {
    checkCurrentLogin
}