const { Op } = require('sequelize');
const {Product} = require('../../models/index');

/** 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getListProduct = async (req, res)=>{
    // Get Query Url
    const {take, skip, search} = req.query;
    const query = {};
    if(take){
        query.limit = take;
    }
    if(skip){
        query.offset = skip
    }
    if(search){
        query.where = {
            name:{
                [Op.iLike] : `%${search}%`
            }
        }
    }
    const data = await Product.findAll(query)
    return res.json({
        code: 200,
        message: 'Success Get',
        data: data,
    })
}

module.exports={
    getListProduct
}