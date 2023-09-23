
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
const login = (req, res)=>{
    res.render('pages/auth/login')
}

module.exports = {
    loginPage,
    registerPage
}