
/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const loginPage = (req, res)=>{
    res.render('pages/auth/login')
}