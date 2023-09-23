/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const dashboardPage = (req, res)=>{
    res.render('pages/admin/dashboard')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const manageuserPage = (req, res)=>{
    res.render('pages/admin/manage-user')
}

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const manageProductPage = (req, res)=>{
    res.render('pages/admin/manage-user')
}