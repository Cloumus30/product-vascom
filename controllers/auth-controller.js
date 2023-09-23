
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const loginPage = (req, res)=>{
    res.render('pages/auth/login')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const registerPage = (req, res)=>{
    res.render('pages/auth/register')
}

module.exports = {
    loginPage,
    registerPage
}