
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const landingPage = (req, res)=>{
    res.render('pages/landing')
}

module.exports = {
    landingPage
}