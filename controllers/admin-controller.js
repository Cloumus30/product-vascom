/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const dashboardPage = (req, res)=>{
    res.render('pages/admin/dashboard')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const manageuserPage = (req, res)=>{
    res.render('pages/admin/manage-user')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const manageProductPage = (req, res)=>{
    res.render('pages/admin/manage-user')
}

module.exports= {
    dashboardPage,
    manageuserPage,
    manageProductPage
}